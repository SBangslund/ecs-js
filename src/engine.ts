import { ECSNode } from "./node";
import { ECSWorld } from "./world";

const fs = require('fs');

/**
 * The ECSEngine is resposible for controlling the state of the ECS {@linkplain ECSSystem}s and {@link ECSPlugin}s. While allowing
 * the implementors to control flow of update, render and post iterations. As each system requires {@link ECSNode}s to run, an
 * {@link ECSWorld} instance needs to be provided - as well as the location of the system and plugin JSON configurations.
 * 
 * @example
 * ```ts
 *  let engine: ECSEngine = new ECSEngine(world, 'systems.json', 'plugins.json');
 *  
 *  engine.init();  // loads json files
 *  engine.start(); // enables systems
 *  
 *  while(engine.isRunning) {
 *      engine.update();
 *      engine.render();
 *      engine.post();
 *      // ... engine.stop() should be possible to reach within the loop
 *  }
 * ```
 * @see {@link ECSWorld}
 */
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

    /**
     * Create and instance of the ECSEngine - no static methods.
     * 
     * @example
     * ```ts
     * let engine: ECSEngine = new ECSEngine(world, 'conf/systems.json', 'conf/nodes.json');
     * ```
     * 
     * @param world The associated world for the engine to manage
     * @param systemPath The path to the 'systems.json' configuration file
     * @param pluginPath The path to the 'plugins.json' configuration file
     */
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

    private _loadSystems(err, data): void {
        if (err) console.error(err);
        this._systemData = JSON.parse(data);
    }

    private _loadPlugins(err, data): void {
        if (err) console.error(err);
        this._pluginData = JSON.parse(data);
    }

    /**
     * Read and initialize the {@link ECSSystem}s and {@link ECSPlugin}s defined in the JSON configuration files.
     */
    public init(): void {
        fs.readFile(this._systemPath, this._loadSystems);
        fs.readFile(this._pluginPath, this._loadPlugins);
        this._initializeSystems(this._systemData);
        this._initializePlugins(this._pluginData);
    }

    /**
     * Enables {@link ECSSystem}s - sets {@link :_isRunning} to true.
     */
    public start(): void {
        this._isRunning = true;
    }

    /**
     * Disables {@link ECSSystem}s - sets {@link :_isRunning} to false.
     */
    public stop(): void {
        this._isRunning = false;
    }

    /**
     * Update all the {@link ECSSystem}s with the UPDATE type set.
     */
    public update(): void {
        this._runSystems(this._updateSystems);
    }

    /**
     * Update all the {@link ECSSystem}s with the RENDER type set.
     */
    public render(): void {
        this._runSystems(this._renderSystems);
    }

    /**
     * Update all the {@link ECSSystem}s with the POST type set.
     */
    public post(): void {
        this._runSystems(this._postSystems);
    }

    public get isRunning() {
        return this._isRunning;
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