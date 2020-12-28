class ECSComponent {
    constructor(name) {
        this._name = name;
    }
    get name() {
        return this._name;
    }
    get parentEntity() {
        return this._parentEntity;
    }
    set parentEntity(entity) {
        this._parentEntity = entity;
    }
}
