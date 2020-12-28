"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ECSEngine = void 0;
class ECSEngine {
    constructor() {
    }
}
exports.ECSEngine = ECSEngine;
/**
 * An ECS System is responsible for doing the logic of the data-oriented framwork.
 * It does so using the its provided Nodes (based on a template). Each node is iterated through
 * its run method (where the logic happens).
 */
class ECSSystem {
    constructor(world, template) {
        this._world = world;
        this._template = template;
    }
    get template() {
        return this._template;
    }
}
class ECSPlugin {
    constructor(world) {
        this._world = world;
    }
}
