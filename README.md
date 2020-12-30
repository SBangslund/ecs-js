# ecs-ts - wip
This project seeks to aid me in further developing some ECS dependent applications. These are mostly for frontend usage and is, for my case, used in conjunction with the p5 library. If you are familiar with the ECS design, then you would know that it allows for tremendous flexibility.

I have chosen to make the library in Typescript, partly because of my other applications use Angular, but also for easier readability for any consumers. 

## WIP
For the time being, this library will not prove to be very useful. There is still a lot of internal logic missing, as well as QoL features. Because of my previous experience with the ECS implementation was limited to Java, the adjustments take a little bit longer than what might be expected. 

## Features
The following is a broad overview of the different features to expect from the library.

### Engine (ECSEngine)
The Engine is responsible for updating the different systems as well as accomodating different plugins. Its API includes:
- __init__ (run when ready)
- __start__ (start all the systems)
- __stop__ (stop all the systems)
- __update__ (run the UPDATE systems)
- __render__ (run the RENDER systems)
- __post__ (run the POST systems)

At a later stage, the commandline will have access to some QoL methods (pause, resume, list systems etc.). 

### World (ECSWorld)
The World is responsible for storing the state of the ECS system. It withholds all Nodes and Entities. This is also the gateway, to add and remove entities (which extracts Nodes based on their components). 
- __addEntity__ (add an ECSEntity to the World)
- __removeEntity__ (remove and ECSEntity from the world - including all its Nodes)

### Defining Nodes
Nodes are to be defined in JSON format and referenced to the ECSWorld object upon instansiation. The following is a snippet of my last ECS project's 'nodes.json' file:
```json
{
    "nodes": [
        {
            "name" : "VelocityNode",
            "components":[
                "Position",
                "Velocity"
            ]
        },
        {
            "name": "RenderNode",
            "components": [
                "Position",
                "Render"
            ]
        },
        {
            "name" : "MouseColliderNode",
            "components":[
                "MouseCollider",
                "Position"
            ]
        },
        {
            "name" : "MovableNode",
            "components" : [
                "Position",
                "Movable"
            ]
        },
    ]
}
```
Now, as this only creates relations and references, the actual Components themselves needs to exist. For this, simply extend the ECSComponent like so:
```typescript
class Position extends ECSComponent {
    public x: number;
    public y: number;

    constructor(x: number, y: number) {
        super();
        this.x = x;
        this.y = y;
    }
}
```
The ECSWorld will find the correct components and relate them to your defined Nodes. It is important to note, that the naming in the JSON, must conform to the name of your ECSComponent implementation. 

### Defining Systems
Much like Nodes, Systems are also defined in a JSON format. This can look like so:
```json
{
    "systems": [
        {
            "name": "VelocitySystem",
            "type": "UPDATE",
            "template": [
                "VelocityNode"
            ]
        },
        {
            "name": "MovableSystem",
            "type": "UPDATE",
            "template": [
                "MovableNode"
            ]
        },
        {
            "name": "MouseColliderSystem",
            "type": "POST",
            "template": [
                "MouseColliderNode",
                "PassiveColliderNode"
            ]
        },
        {
            "name": "RenderSystem",
            "type": "RENDER",
            "template": [
                "RenderNode"
            ]
        }
    ]
}
```
The systems are a little bit more tricky to include, but can be done very similar to the Nodes:
```ts
window.VelocitySystem = class VelocitySystem extends NodeSystem {
    constructor(world: ECSWorld, template: ECSNode) {
        super(world, template);
    }

    run() {
        nodes.forEach((velocityNode: ECSNode) => {
            let position: Position = velocityNode.get("Position");
            let velocity: Velocity = velocityNode.get("Velocity");

            // logic ...
        });
    }
}
```
The ECSEngine will find and run the system accordingly - based on your JSON configurations.

## Defining Plugins
Same as Nodes and Systems - defined in JSON format:
```json
{
    "plugins" : [
        {
            "name" : "UIPlugin",
            "type" : "INIT"
        }
    ]
}
```
Plugins are very similar to how Systems are included:
```ts
window.UIPlugin = class UIPlugin extends ECSPlugin {
    constructor(world: ECSWorld) {
        super(world);
    }

    public start(): void {
        // What should happen on start...
    }
    
    public stop(): void {
        // What should happen on stop...
    }
}
```
Plugins are mostly used for adding Entities or setting up some eventhandling. Also this, is picked up by the ECSEngine and handled in accordance with the JSON configurations.
