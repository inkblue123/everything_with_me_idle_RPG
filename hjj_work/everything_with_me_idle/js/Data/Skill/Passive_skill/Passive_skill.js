import { Skill } from '..Skill_class.js';

//��������ͨ������
class Passive_skill extends Skill {
    constructor(id) {
        super(id);
        //��������
        this.rewards; //��̬�ȼ��ӳ�
        this.milepost; // �ؼ��ȼ��ڵ�
    }
}

//��ʼ���������ݿ����뱻��������ص�����
function init_Passive_skill(skills) {
    //��ͨ����
    skills['normal_sword'] = new Passive_skill('normal_sword');
}

export { init_Passive_skill };
