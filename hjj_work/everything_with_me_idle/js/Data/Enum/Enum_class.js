//创建新的枚举数组，如果已经创建过就不创建
function add_Enum_Array(enums, newid) {
    if (enums[newid] === undefined) {
        enums[newid] = new Array();
    } else {
        console.log(`enums[${newid}] is no undefined`);
    }
}
//创建新的枚举对象，如果已经创建过就不创建
function add_Enum_Object(enums, newid) {
    if (enums[newid] === undefined) {
        enums[newid] = new Object();
    } else {
        console.log(`enums[${newid}] is no undefined`);
    }
}
export { add_Enum_Array, add_Enum_Object };
