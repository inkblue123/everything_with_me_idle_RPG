import { add_Type_Array } from './Type_class.js';
//��ʼ��ö�ٿ�������Ʒ��ص�����
function init_Type_item(types) {
    //��Ʒ���ܵĴ�����
    add_Type_Array(types, 'Item_type');
    types['Item_type'] = [
        //װ��
        'equipment', //����װ������
        'weapon', //����
        'armor', //����
        'deputy', //����
        'ornament', //��Ʒ
        //��ʹ����Ʒ
        'consumable', //��ʹ����Ʒ����
        'food_CSB', //ʳƷ
        'ammo_CSB', //��ҩ
        'life_CSB', //��������Ʒ
        //����
        'material', //���ϴ���
        'raw_MTR', //��Ȼ����
        'process_MTR', //�˹�����
        'finish_MTR', //��Ʒ
        'other_MTR', //������Ʒ
    ];
    //��Ʒ�����������
    add_Type_Array(types, 'Item_base_type');
    types['Item_base_type'] = [
        //װ��
        'equipment', //����װ��
        //��ʹ����Ʒ
        'consumable', //��ʹ����Ʒ
        //����
        'material', //����
    ];
}

export { init_Type_item };
