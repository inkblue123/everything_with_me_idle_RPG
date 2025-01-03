import { add_Type_Array } from './Type_class.js';
//��ʼ��ö�ٿ�������Ʒ��ص�����
function init_Type_material(types) {
    //�������ڲ��ϵ�С����
    add_Type_Array(types, 'material_type');
    types.material_type = [
        // ��Ȼ���� raw_MTR
        'for_logging', //���Է�ľ����Ʒ
        'for_fishing', //���Ե������Ʒ
        'for_mining', //�����ڿ����Ʒ
        'for_harvest', //���Բɼ�����Ʒ
        //�˹����� process_MTR
        'for_cooking', //������⿵���Ʒ
        'for_making', //�����������Ʒ
        'for_forging', //���Զ������Ʒ
        'for_alchemy', //�����������Ʒ
        //��Ʒ finish_MTR �Ѿ����ٲ���ϳ�,�������õ���Ʒ
        'key', //Կ��
        'money', //����
        //������Ʒ other_MTR
        'other',
    ];
    // types.material_type = [
    //     'raw_MTR', //��Ȼ����
    //     'process_MTR', //�˹�����
    //     'finish_MTR', //��Ʒ
    //     'other_MTR', //������Ʒ
    // ];
}

export { init_Type_material };
