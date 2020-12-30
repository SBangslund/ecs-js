import { ECSEntity } from "./entity";

export class ECSComponent {
    private _parentEntity: ECSEntity;
    private _name: string;

    constructor(name?: string) {
        if (typeof name != 'undefined') {
            this._name = name;
        }
    }

    public get name(): string {
        return typeof this._name != 'undefined' ? this._name : this.constructor.name;
    }

    public get parentEntity(): ECSEntity {
        return this._parentEntity;
    }

    public set parentEntity(entity: ECSEntity) {
        this._parentEntity = entity;
    }
}