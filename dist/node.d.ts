declare class ECSNode {
    private _components;
    private _name;
    private _parentEntity;
    constructor(name: string, components: ECSComponent[]);
    set parentEntity(entity: ECSEntity);
    get parentEntity(): ECSEntity;
    get name(): string;
    get components(): ECSComponent[];
    get(name: string): ECSComponent;
}
