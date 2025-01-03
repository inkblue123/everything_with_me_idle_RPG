import { add_Type_Array } from './Type_class.js';
//��ʼ��ö�ٿ�����װ����ص�����
function init_Type_equipment(types) {
    //�����µ�����֮ǰ��������add_Type_Array,�����������console.log���
    //����Ѿ��й�������Ӧ�ÿ��ǻ�������

    //��Щ������������˫������
    add_Type_Array(types, 'both_hand');
    types.both_hand = ['battle_axe', 'long_handled', 'hammers', 'gloves', 'bow', 'crossbow', 'spray_gun'];
    //��Щ�����������ڵ�������
    add_Type_Array(types, 'single_hand');
    types.single_hand = [
        'dagger',
        'sword',
        'sticks',
        'whips',
        'hand_gun',
        'throw',
        'boomerang',
        'putmagic_core',
        'zhenfa_core',
        'magic_core',
        'spread_core',
        'summon_core',
    ];
    //�����������ܵ�ϡ�ж�
    add_Type_Array(types, 'special_rarity');
    types.special_rarity = [
        'damaged', //����
        'ordinary', //��ͨ
        'excellent', //����
        'rare', //ϡ��
        'epic', //ʷʫ
        'legendary', //��˵
    ];
    //��ʽ�������ܵ�ϡ�ж�
    //������ͨ��������ϡ�У�ʷʫ
    add_Type_Array(types, 'no_special_rarity');
    types.no_special_rarity = ['damaged', 'ordinary', 'excellent', 'rare', 'epic'];
    //װ�����ܷ��õ�λ��
    add_Type_Array(types, 'wearing_position');
    types.wearing_position = ['main_hand', 'head', 'chest', 'legs', 'feet', 'deputy', 'ornament'];
    //װ�����ܵ�С����
    add_Type_Array(types, 'equipment_type');
    types.equipment_type = [
        'empty_hands', //����
        // ��ս����
        'dagger', //ذ��
        'sword', //��
        'battle_axe', //ս��
        'long_handled', //��������
        'gloves', //ȭ��
        'sticks', //����
        'hammers', //��
        'whips', //����
        //Զ������
        'bow', //��
        'crossbow', //��
        'hand_gun', //����
        'spray_gun', //��ǹ
        'boomerang', //��������
        'throw', //Ͷ������
        //ħ������
        'putmagic_core', //ʩ������
        'zhenfa_core', //�󷨺���
        'magic_core', //��������
        'spread_core', //��ɢ����
        'summon_core', //�ٻ�����
        //����
        'helmet', //ͷ��
        'chest_armor', //�ؼ�
        'leg_armor', //�ȼ�
        'shoes', //Ь��
        'deputy', //����װ��
        'ornament', //��Ʒ
    ];
}

export { init_Type_equipment };
