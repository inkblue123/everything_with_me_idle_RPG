class Type {
    constructor() {}
}
//创建新的Type数组，如果已经创建过就不创建
function add_Type_Array(types, newid) {
    if (types[newid] === undefined) {
        types[newid] = new Array();
    } else {
        console.log(`types[${newid}] is no undefined`);
    }
}
export { add_Type_Array };
