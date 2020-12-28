export declare class ECSWorld {
    private _nodeTemplates;
    private _nodeMap;
    private _nodeEntites;
    private nodePath;
    constructor();
    private _readNodes;
    private _readSuccess;
    addEntity(entity: ECSEntity): void;
    removeEntity(entity: ECSEntity): void;
}
