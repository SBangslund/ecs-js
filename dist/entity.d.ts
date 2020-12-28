declare let counter: number;
declare class ECSEntity {
    private _components;
    private _id;
    constructor();
    add(component: ECSComponent): void;
    equals(entity: ECSEntity): boolean;
    get(name: string): ECSComponent;
    get components(): ECSComponent[];
    get id(): number;
}
