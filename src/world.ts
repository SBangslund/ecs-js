import { ECSComponent } from "./component";
import { ECSEntity } from "./entity";
import { ECSNode } from "./node";

const fs = require('fs');

/**
 * The ECS World is responsible for keeping track of the current state of the system. It stores all the nodes
 * and provides the systems with access to whichever node they need - and its associated entity and component.
 */
export class ECSWorld {
    /**
     * All the different Nodes available to be extracted from Entites.
     */
    private _nodeTemplates: ECSNode[] = [];

    /**
     * All the nodes with the key being the name of the Node, and the value the corresponding list of Nodes.
     */
    private _nodeMap: Map<string, ECSNode[]> = new Map<string, ECSNode[]>();

    /**
     * Keeps track of which nodes are owned by which Entity - makes for faster deletion.
     */
    private _nodeEntites: Map<number, ECSNode[]> = new Map<number, ECSNode[]>();

    /**
     * Defines where the World should look for the Nodes' json file.
     */
    private _nodePath: string;

    constructor(nodePath: string) {
        this._nodePath = nodePath;
        this._readNodes();
    }

    /**
     * Adds an Entity to the World, by extracting its corresponding nodes (based on components), and saving
     * them for further processing (from the systems).
     * @param entity The Entity to be added.
     */
    public addEntity(entity: ECSEntity): void {
        this._registerNodes(this._extractNodes(entity));
    }

    /**
     * Remove and Entity from the World. This deletes every remnance of it, including its nodes.
     * @param entity The Entity to be removed.
     */
    public removeEntity(entity: ECSEntity): void {
        this._nodeEntites.get(entity.id).forEach(node => {
            let nodeList = this._nodeMap.get(node.name);
            nodeList.splice(nodeList.indexOf(node), 1);
        })
        this._nodeEntites.delete(entity.id);
    }

    public get nodeTemplates(): ECSNode[] {
        return this._nodeTemplates;
    }

    public get nodeMap(): Map<string, ECSNode[]> {
        return this._nodeMap;
    }

    /**
     * Extracts nodes based on the entities current components, as well as, the stored template in the 
     * world's _nodeTemplates - which is read from the nodes.json file.
     * 
     * Example:
     *  Say the Entity contains the components: Position, Render and Collision. Meanwhile, the following nodes 
     *  were defined: RenderNode(Render, Position) and CollisionNode(Collision, Position).
     * 
     *  The methods then looks for these matches (does it match any of the nodes). In this case, both nodes would
     *  be added, as each of their components were available. 
     * 
     * @param entity The entity to extract nodes from. 
     */
    private _extractNodes(entity: ECSEntity): ECSNode[] {
        let extractedNodes = [];
        for (let i = 0; i < this._nodeTemplates.length; i++) {
            let counter = 0;
            let nodeComponents = [];
            for (let j = 0; j < entity.components.length; j++) {
                let component: ECSComponent = this._nodeTemplates[i].components.find(c => c.name == entity.components[i].name);
                if (component != null) {
                    nodeComponents.push(component);
                    component.parentEntity = entity;
                    counter++;
                }
                if (counter == this._nodeTemplates[i].components.length) {
                    let newNode = new ECSNode(this._nodeTemplates[i].name, nodeComponents);
                    newNode.parentEntity = entity;
                    extractedNodes.push(newNode);
                    break;
                }
            }
        }
        this._nodeEntites.set(entity.id, extractedNodes);
        return extractedNodes;
    }

    /**
     * The nodes to be registed into the local node map. These are put in a key-value pair with the name of each node
     * as the key, and a list of all the nodes corresponding to that node (primarily used in unison with addEntity()).
     * @param nodes The nodes to register.
     */
    private _registerNodes(nodes: ECSNode[]): void {
        nodes.forEach(node => {
            let localNodeList = this._nodeMap.get(node.name);
            if (typeof localNodeList != 'undefined') {
                localNodeList.push(node);
            } else {
                this._nodeMap.set(node.name, [node]);
            }
        })
    }

    /**
     * Reads nodes from a json file. Path must be set locally in world before calling (done through constructor).
     * After loading json file, the _readSuccess(data: any) is called. 
     */
    private _readNodes() {
        fs.readFile(this._nodePath, (err, data) => {
            data = JSON.parse(data);
            if(err || typeof data == 'undefined') console.error(err);
            data.nodes.forEach(node => {
                let components: ECSComponent[] = [];
                node.components.forEach((name: string) => {
                    components.push(new ECSComponent(name));
                });
                this._nodeTemplates.push(new ECSNode(node.name, components));
            });
        });
    }
}