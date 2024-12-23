import { get_EQP_switch } from './Get_func.js';
//���������չʾ����ť֮����ʾ��������������չʾ����
function change_PA() {
    const attribute_show = document.getElementById('attribute_show');
    const equipment_show = document.getElementById('equipment_show');

    if (attribute_show.style.display == '') {
        //�����ʾ�����Խ��棬���л���װ����
        attribute_show.style.display = 'none';
        equipment_show.style.display = '';
        show_active_EQP();
    } else {
        attribute_show.style.display = '';
        equipment_show.style.display = 'none';
    }
}
//��ʾ��ǰ�����װ����
function show_active_EQP() {
    const attribute_show = document.getElementById('attribute_show');
    const equipment_show = document.getElementById('equipment_show');
    //�����ǰ��ʾ�����Խ��棬���л���װ����
    if (attribute_show.style.display == '') {
        attribute_show.style.display = 'none';
        equipment_show.style.display = '';
    }
    //�л�����ǰ����ĵ�װ������
    for (let EQP_column of equipment_show.children) {
        EQP_column.style.display = 'none';
    }
    let EQP_value = get_EQP_switch();
    document.getElementById(EQP_value).style.display = '';
}
//�л����������ܡ�ͼ���İ�ť
function change_BP_SK_IB(button_id) {
    const BP_div = document.getElementById('BP_div');
    const SK_div = document.getElementById('SK_div');
    const IB_div = document.getElementById('IB_div');
    if (button_id == 'BP_switch_button') {
        BP_div.style.display = '';
        SK_div.style.display = 'none';
        IB_div.style.display = 'none';
    }
    if (button_id == 'SK_switch_button') {
        BP_div.style.display = 'none';
        SK_div.style.display = '';
        IB_div.style.display = 'none';
    }
    if (button_id == 'IB_switch_button') {
        BP_div.style.display = 'none';
        SK_div.style.display = 'none';
        IB_div.style.display = '';
    }
}
//���������������İ�ť֮��չʾ��ǰ��ť��ص���������������������
function show_dropdown_table(classification_div, table_id) {
    const dropdownTable = document.getElementById(table_id);
    const Class_div = document.getElementById(classification_div);

    // �л�Ŀ�����������ʾ/����״̬
    if (dropdownTable.style.display === 'block') {
        // �������Ѿ���ʾ�����۵���
        dropdownTable.style.maxHeight = '0';
        setTimeout(() => {
            dropdownTable.style.display = 'none';
        }, 500); // �ȴ�������ɺ�����
    } else {
        // ������û����ʾ����չ����
        dropdownTable.style.display = 'block';
        setTimeout(() => {
            dropdownTable.style.maxHeight = '300px'; // ���߶���Ҫ�������ݵ���
        }, 10); // ����ʾ״̬�ȸ��£��ٴ�������
    }
    //���������ҹر�����������
    let tables = Class_div.querySelectorAll('.dropdown_table');
    for (let table of tables) {
        if (table.id !== table_id) {
            // �л�������ʾ/����״̬
            if (table.style.display === 'block') {
                // �������Ѿ���ʾ�����۵���
                table.style.maxHeight = '0';
                setTimeout(() => {
                    table.style.display = 'none';
                }, 500); // �ȴ�������ɺ�����
            }
        }
    }
}
export { change_PA, show_active_EQP, change_BP_SK_IB, show_dropdown_table };
