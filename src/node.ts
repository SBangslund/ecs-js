class ECSNode {
    private _components: ECSComponent[];
    private _name: string;
    private _parentEntity: ECSEntity;

    constructor(name: string, components: ECSComponent[]) {
        this._components = components;
        this._name = name;
    }

    public set parentEntity(entity: ECSEntity) {
        this._parentEntity = entity;
    }

    public get parentEntity(): ECSEntity {
        return this._parentEntity;
    }

    public get name(): string {
        return this._name;
    }

    public get(name: string): ECSComponent {
        return this._components.find(c => c.name == name);
    }
}