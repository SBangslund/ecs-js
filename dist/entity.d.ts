declare let counter: number;
declare class ECSEntity {
    private _components;
    private _id;
    constructor();
    add(component: ECSComponent): void;
    get(name: string): ECSComponent;
}
