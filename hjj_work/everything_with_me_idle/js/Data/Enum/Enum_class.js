//创建新的枚举数组，如果已经创建过就不创建
function add_Enum_Array(enums, newid) {
    if (enums[newid] === undefined) {
        enums[newid] = new Array();
    } else {
        console.log(`创建enums[%s]时已有同名对象，需要确认是否会清空原有内容`, newid);
    }
}
//创建新的枚举对象，如果已经创建过就不创建
function add_Enum_Object(enums, newid) {
    if (enums[newid] === undefined) {
        enums[newid] = new Object();
    } else {
        console.log(`创建enums[%s]时已有同名对象，需要确认是否会清空原有内容`, newid);
    }
}
export { add_Enum_Array, add_Enum_Object };
