export class Skill {
    constructor(id) {
        this.id = id; //Ψһid
        this.name = 'δ���弼��'; // ��������
        this.description; // ��������
        this.max_level; // ���ȼ�����
        this.exp_need_level; // �����������ȼ�
        this.type = new Array(); //����
        this.leveling_behavior = new Array(); //������Ϊ

        //��������
        // this.active_type; //����֮������ͣ����繥��/����
        // this.base_attr; //������Щ���Խ��м���
        // this.active_effect; //����֮���Ч��
        // this.active_condition; //�������������Ҫ���������
    }
}
