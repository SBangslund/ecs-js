import { ECSEngine } from "../src/engine";
import { ECSWorld } from "../src/world";

let world: ECSWorld;
let engine: ECSEngine;

beforeAll(() => {
    world = new ECSWorld('tests/files/nodes.json');
    engine = new ECSEngine(world, 'tests/files/systems.json', 'tests/files/plugins');
});

describe('Successfully sets up initial framework', () => {
    test('World is created..', () => {
        expect.any(world);
    });
    test('Engine is created..', () => {
        expect.any(engine);
    });
});