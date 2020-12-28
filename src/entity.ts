let counter: number = 0;
class ECSEntity {
    private _components: ECSComponent[] = [];
    private _id: number;

    constructor() {
        this._id = counter++;
    }

    public add(component: ECSComponent): void {
        this._components.push(component);
    }

    public get(name: string): ECSComponent {
        return this._components.find(c => c.name == name);
    }
}