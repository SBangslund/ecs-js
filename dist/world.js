"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ECSWorld = void 0;
class ECSWorld {
    constructor() {
    }
    /*private extractNodes(entity: ECSEntity): ECSNode[] {
        let extractedNodes = [];
        for (let i = 0; i < this._nodeTemplates.length; i++) {
            let counter = 0;
            let nodeComponents = [];
            for (let j = 0; j < entity.components.length; j++) {
                if(this._nodeTemplates[i].components.includes(entity.components[k].name)) {
                    
                }
            }
        }
        return null;
    }*/
    _readNodes() {
        fetch("nodes.json")
            .then(response => { return response.json; })
            .then(data => { this._readSuccess(data); })
            .catch(reason => console.log(reason));
    }
    _readSuccess(data) {
        console.log(data);
    }
    addEntity(entity) {
    }
    removeEntity(entity) {
        this._nodeEntites.get(entity.id).forEach(node => {
            let nodeList = this._nodeMap.get(node.name);
            nodeList.splice(nodeList.indexOf(node), 1);
        });
        this._nodeEntites.delete(entity.id);
    }
}
exports.ECSWorld = ECSWorld;
