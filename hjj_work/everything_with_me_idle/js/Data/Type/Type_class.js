class Type {
    constructor() {}
}
//�����µ�Type���飬����Ѿ��������Ͳ�����
function add_Type_Array(types, newid) {
    if (types[newid] === undefined) {
        types[newid] = new Array();
    } else {
        console.log(`types[${newid}] is no undefined`);
    }
}
export { add_Type_Array };
