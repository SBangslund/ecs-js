import { ECSNode } from "./node";
import { ECSWorld } from "./world";

export class ECSEngine {

    private _world: ECSWorld;

    private _systemData: any;
    private _pluginData: any;
    private _systemPath: string;
    private _pluginPath: string;

    private _postSystems: ECSSystem[] = [];
    private _renderSystems: ECSSystem[] = [];
    private _updateSystems: ECSSystem[] = [];
    private _pausedSystems: ECSSystem[] = [];

    private _initPlugins: ECSPlugin[] = [];
    private _callPlugins: ECSPlugin[] = [];

    private _isRunning: boolean;

    constructor(world: ECSWorld, systemPath: string, pluginPath: string) {
        this._world = world;
        this._systemPath = systemPath;
        this._pluginPath = pluginPath;
    }

    private _initializeSystems(data: any): void {
        for (let i = 0; i < data.systems.length; i++) {
            let system: ECSSystem = new Window[data.systems[i]['name']](this._world, data.systems[i]['template']);
            switch (data.systems[i]['type']) {
                case "RENDER":
                    this._renderSystems.push(system);
                    break;
                case "POST":
                    this._postSystems.push(system);
                    break;
                default:
                    this._updateSystems.push(system);
            }
        }
    }

    private _initializePlugins(data: any): void {
        for (let i = 0; i < data.plugins.length; i++) {
            let plugin: ECSPlugin = new Window[data.plugins[i]['name']](this._world);
            switch (data.plugin[i]['type']) {
                case "CALL":
                    this._callPlugins.push(plugin);
                    break;
                default:
                    this._initPlugins.push(plugin);
                    plugin.start();
            }
        }
    }

    private _runSystems(systems: ECSSystem[]) {
        if (this._isRunning) {
            systems.forEach(system => {
                if (!this._pausedSystems.includes(system)) {
                    system.run();
                }
            });
        }
    }

    private _loadJson(path: string): any {
        let _jsonData: Promise<any>;
        fetch(path)
            .then(response => { return response.json() })
            .then(data => { _jsonData = data; })
            .catch(reason => console.error(reason));
        return _jsonData;
    }

    public init(): void {
        this._systemData = this._loadJson(this._systemPath);
        this._pluginData = this._loadJson(this._pluginPath);
    }

    public start(): void {
        this._isRunning = true;
        this._initializeSystems(this._systemData);
        this._initializePlugins(this._pluginData);
    }

    public stop(): void {
        this._isRunning = false;
    }

    public update(): void {
        this._runSystems(this._updateSystems);
    }

    public render(): void {
        this._runSystems(this._renderSystems);
    }

    public post(): void {
        this._runSystems(this._postSystems);
    }
}

/**
 * An ECS System is responsible for doing the logic of the data-oriented framwork.
 * It does so using the its provided Nodes (based on a template). Each node is iterated through
 * its run method (where the logic happens). 
 */
abstract class ECSSystem {
    protected world: ECSWorld;
    private _template: ECSNode;
    private _nodes: ECSNode[];

    constructor(world: ECSWorld, template: ECSNode) {
        this.world = world;
        this._template = template;
    }

    public abstract run();

    public get template() {
        return this._template;
    }
}

abstract class ECSPlugin {
    protected world: ECSWorld;

    constructor(world: ECSWorld) {
        this.world = world;
    }

    public abstract start();

    public abstract stop();
}