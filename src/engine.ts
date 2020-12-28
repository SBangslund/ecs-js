import { ECSWorld } from "./world";

export class ECSEngine {

    constructor() {

    }
}

/**
 * An ECS System is responsible for doing the logic of the data-oriented framwork.
 * It does so using the its provided Nodes (based on a template). Each node is iterated through
 * its run method (where the logic happens). 
 */
abstract class ECSSystem {
    private _world: ECSWorld;
    private _template: ECSNode;
    private _nodes: ECSNode[];

    constructor(world: ECSWorld, template: ECSNode) {
        this._world = world;
        this._template = template;
    }

    public abstract run();

    public get template() {
        return this._template;
    }
}

abstract class ECSPlugin {
    private _world: ECSWorld;

    constructor(world: ECSWorld) {
        this._world = world;
    }

    public abstract start();

    public abstract stop();
}