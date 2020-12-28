declare class ECSComponent {
    private _parentEntity;
    private _name;
    constructor(name: string);
    get name(): string;
    get parentEntity(): ECSEntity;
    set parentEntity(entity: ECSEntity);
}
