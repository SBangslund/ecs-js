let counter = 0;
class ECSEntity {
    constructor() {
        this._components = [];
        this._id = counter++;
    }
    add(component) {
        this._components.push(component);
    }
    get(name) {
        return this._components.find(c => c.name == name);
    }
}
