export class Place {
    constructor(id) {
        this.id = id; //唯一id
    }
}

function add_Place_object(places, newid) {
    if (places[newid] === undefined) {
        places[newid] = new Place(newid);
    } else {
        console.log(`创建places[${newid}]时已有同名对象，需要确认是否会清空原有内容`);
    }
}

export { add_Place_object };
