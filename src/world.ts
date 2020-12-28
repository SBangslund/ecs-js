import { readJsonConfigFile } from "typescript";

export class ECSWorld {
    private _nodeTemplates: ECSNode[];
    private _nodeMap: Map<string, ECSNode[]>;
    private _nodeEntites: Map<number, ECSNode[]>;

    private nodePath: string;

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

    private _readNodes() {
        fetch("nodes.json")
            .then(response => { return response.json })
            .then(data => { this._readSuccess(data) })
            .catch(reason => console.log(reason));
    }

    private _readSuccess(data: any) {
        console.log(data);
    }

    public addEntity(entity: ECSEntity): void {

    }

    public removeEntity(entity: ECSEntity): void {
        this._nodeEntites.get(entity.id).forEach(node => {
            let nodeList = this._nodeMap.get(node.name);
            nodeList.splice(nodeList.indexOf(node), 1);
        })
        this._nodeEntites.delete(entity.id);
    }
}