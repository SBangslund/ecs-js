let counter = 0;
class ECSEntity {
    constructor() {
        this._components = [];
        this._id = counter++;
    }
    add(component) {
        this._components.push(component);
    }
    equals(entity) {
        return this._id == entity._id;
    }
    get(name) {
        return this._components.find(c => c.name == name);
    }
    get components() {
        return this._components;
    }
    get id() {
        return this._id;
    }
}
