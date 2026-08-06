import { b64_to_utf8 } from './load.js';

// ==================== 存档到save_file目录功能 ====================
// 使用 File System Access API 的目录句柄，存储在内存中
var save_file_dir_handle = null;
// 缓存的版本号
var cached_game_version = null;

/**
 * 从 Version.txt 获取当前程序版本号
 * @returns {Promise<string>} 版本号字符串，如 'v0.2.33'
 */
async function get_game_version() {
    if (cached_game_version) {
        return cached_game_version;
    }
    try {
        let response = await fetch('../Version.txt');
        let text = await response.text();
        // 从 Version.txt 中解析最新的版本号，格式: YYYY.MM.DD VX.X.X
        let match = text.match(/V(\d+\.\d+\.\d+)/);
        if (match) {
            cached_game_version = 'v' + match[1];
            return cached_game_version;
        }
    } catch (e) {
        console.log('[save_to_file] 无法读取Version.txt，使用默认版本号');
    }
    cached_game_version = 'v0.0.0';
    return cached_game_version;
}

/**
 * 初始化存档目录 - 让用户选择 save_file 目录
 * 需要在用户点击事件中调用（浏览器要求用户手势）
 * @returns {Promise<boolean>} 是否成功选择目录
 */
async function init_save_file_directory() {
    try {
        save_file_dir_handle = await window.showDirectoryPicker({
            id: 'everything_with_me_save',
            mode: 'readwrite',
            startIn: 'documents',
        });
        console.log('[save_to_file] 已设置存档目录');
        return true;
    } catch (e) {
        if (e.name !== 'AbortError') {
            console.log('[save_to_file] 设置存档目录失败:', e);
        }
        return false;
    }
}

/**
 * 获取或创建子目录
 * @param {FileSystemDirectoryHandle} parent_handle 父目录句柄
 * @param {string} dir_name 子目录名
 * @returns {Promise<FileSystemDirectoryHandle|null>}
 */
async function get_or_create_subdir(parent_handle, dir_name) {
    try {
        return await parent_handle.getDirectoryHandle(dir_name, { create: true });
    } catch (e) {
        console.log('[save_to_file] 创建目录失败: ' + dir_name, e);
        return null;
    }
}

/**
 * 在指定目录写入文件
 * @param {FileSystemDirectoryHandle} dir_handle 目录句柄
 * @param {string} file_name 文件名
 * @param {string} content 文件内容
 * @returns {Promise<boolean>}
 */
async function write_file_in_dir(dir_handle, file_name, content) {
    try {
        let file_handle = await dir_handle.getFileHandle(file_name, { create: true });
        let writable = await file_handle.createWritable();
        await writable.write(content);
        await writable.close();
        return true;
    } catch (e) {
        console.log('[save_to_file] 写入文件失败: ' + file_name, e);
        return false;
    }
}

/**
 * 触发浏览器下载文件（降级方案）
 * @param {string} content 文件内容
 * @param {string} filename 下载文件名
 */
function download_as_file(content, filename) {
    let blob = new Blob([content], { type: 'application/octet-stream' });
    let url = URL.createObjectURL(blob);
    let a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

/**
 * 将存档保存到 save_file 目录
 * 目录结构: save_file/v{版本号}/{时间精确到秒的目录}/{时间戳}.txt + {时间戳}.json
 *
 * 优先使用 File System Access API 直接写入磁盘
 * 如果未设置存档目录，则降级为浏览器下载
 *
 * @returns {Promise<void>}
 */
async function save_game_to_file() {
    // 获取当前加密存档字符串
    let save_str = window.localStorage.getItem('v0.1');
    if (!save_str) {
        console.log('[save_to_file] 没有存档数据，跳过保存');
        return;
    }

    // 获取明文存档对象
    let save_obj_str = b64_to_utf8(save_str);

    // 获取版本号
    let version = await get_game_version();

    // 生成精确到秒的时间戳
    let now = new Date();
    let timestamp =
        now.getFullYear().toString() +
        String(now.getMonth() + 1).padStart(2, '0') +
        String(now.getDate()).padStart(2, '0') +
        '_' +
        String(now.getHours()).padStart(2, '0') +
        String(now.getMinutes()).padStart(2, '0') +
        String(now.getSeconds()).padStart(2, '0');

    // 优先尝试 File System Access API 直接写入磁盘
    if (save_file_dir_handle) {
        try {
            // 验证目录句柄权限是否仍然有效
            let permission = await save_file_dir_handle.queryPermission({ mode: 'readwrite' });
            if (permission !== 'granted') {
                permission = await save_file_dir_handle.requestPermission({ mode: 'readwrite' });
            }
            if (permission === 'granted') {
                // 1. 获取或创建版本号目录 save_file/v{version}/
                let version_dir = await get_or_create_subdir(save_file_dir_handle, version);
                if (version_dir) {
                    // 2. 创建时间戳目录 save_file/v{version}/{timestamp}/
                    let time_dir = await get_or_create_subdir(version_dir, timestamp);
                    if (time_dir) {
                        // 3. 写入 .txt (加密存档) 和 .json (存档对象)
                        let txt_ok = await write_file_in_dir(time_dir, timestamp + '.txt', save_str);
                        let json_ok = await write_file_in_dir(time_dir, timestamp + '.json', save_obj_str);
                        if (txt_ok && json_ok) {
                            console.log('[save_to_file] 存档已保存到: ' + version + '/' + timestamp + '/');
                            return; // 成功，不需要降级下载
                        }
                    }
                }
            }
        } catch (e) {
            console.log('[save_to_file] File System API 写入失败，降级为浏览器下载:', e);
        }
    }

    // 降级方案：触发浏览器下载（先 .json 后 .txt）
    console.log('[save_to_file] 使用浏览器下载方式保存存档');
    download_as_file(save_obj_str, timestamp + '.json');
    download_as_file(save_str, timestamp + '.txt');
}

/**
 * 检查浏览器是否支持 File System Access API
 * @returns {boolean}
 */
function is_file_system_api_supported() {
    return typeof window.showDirectoryPicker === 'function';
}

export { save_game_to_file, init_save_file_directory, is_file_system_api_supported };
