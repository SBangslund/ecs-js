class ECSNode {
    constructor(name, components) {
        this._components = components;
        this._name = name;
    }
    set parentEntity(entity) {
        this._parentEntity = entity;
    }
    get parentEntity() {
        return this._parentEntity;
    }
    get name() {
        return this._name;
    }
    get(name) {
        return this._components.find(c => c.name == name);
    }
}
