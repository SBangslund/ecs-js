import { ECSEntity } from "./entity";

export class ECSComponent {
    private _parentEntity: ECSEntity;
    private _name: string;

    constructor(name: string){
        this._name = name;
    }

    public get name(): string {
        return this._name;
    }

    public get parentEntity(): ECSEntity {
        return this._parentEntity;
    }

    public set parentEntity(entity: ECSEntity) {
        this._parentEntity = entity;
    }
}