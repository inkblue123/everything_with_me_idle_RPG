class BaseModal {
    constructor(id) {
        this.id = id; //Ψһid
    }
    close() {
        console.log('close');
    }
}

let DragModalMixin = (extendsClass) =>
    class extends extendsClass {
        hasLayer = true;
        drag() {
            console.log('drag');
        }
    };
let ScaleModalMixin = (extendsClass) =>
    class extends extendsClass {
        scale() {
            console.log('scale');
        }
        close() {
            console.log('scale-close');
            if (super.close) super.close();
        }
    };

class CustomModal extends ScaleModalMixin(DragModalMixin(BaseModal)) {
    close() {
        console.log('custom-close');
        if (super.close) super.close();
    }
    do() {
        console.log('do');
    }
}

let c = new CustomModal();

c.close(); // custom-close   ->   scale-close   ->   close
