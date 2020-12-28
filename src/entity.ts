import { ECSComponent } from "./component";

let counter: number = 0;
export class ECSEntity {
    private _components: ECSComponent[] = [];
    private _id: number;

    constructor() {
        this._id = counter++;
    }

    public add(component: ECSComponent): void {
        this._components.push(component);
    }

    public equals(entity: ECSEntity): boolean {
        return this._id == entity._id;
    }

    public get(name: string): ECSComponent {
        return this._components.find(c => c.name == name);
    }

    public get components(): ECSComponent[] {
        return this._components;
    }

    public get id(): number {
        return this._id;
    }
}