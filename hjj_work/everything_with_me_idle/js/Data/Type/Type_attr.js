import { add_Type_Array } from './Type_class.js';
//��ʼ��ö�ٿ�������Ʒ��ص�����
function init_Type_attr(types) {
    //ս��-�����������
    add_Type_Array(types, 'combat_attack_attr');
    types['combat_attack_attr'] = [
        'attack', //������
        'precision', //��׼
        'critical_chance', //�����ʣ��ٷ��ƣ��������ʱ�����100
        'critical_damage', //�����˺����ٷ��ƣ��������ʱ�����100
        'attack_speed', //�����ٶ�
    ];
    //ս��-�����������
    add_Type_Array(types, 'combat_defense_attr');
    types['combat_defense_attr'] = [
        'defense', //����
        'evade', //����
        'resistance_point', //�ֿ���
        'move_speed', //�ƶ��ٶ�
    ];
    //ս��-�����������
    add_Type_Array(types, 'combat_survival_attr');
    types['combat_survival_attr'] = [
        'health_max', //���Ѫ������
        'magic_max', //���ħ������
        'energy_max', //���������
    ];
    //��һ�������
    add_Type_Array(types, 'player_base_attr');
    types['player_base_attr'] = [
        'physique', //���
        'Meridians', //����
        'soul', //����
        'power', //����
        'agile', //����
        'intelligence', //����
        'technique', //����
    ];
    //��Ҫʹ�ðٷֺű�ʾ������
    add_Type_Array(types, 'need_per_cent_attr');
    types['need_per_cent_attr'] = [
        'critical_chance', //������
        'critical_damage', //�����˺�
    ];
}

export { init_Type_attr };
