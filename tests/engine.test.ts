import { ECSEngine } from "../src/engine";
import { ECSWorld } from "../src/world";

let world: ECSWorld;
let engine: ECSEngine;

let sum = (a, b) => {
    return a + b;
}

beforeAll(() => {
    world = new ECSWorld('tests/files/nodes.json');
    engine = new ECSEngine(world, 'tests/files/systems.json', 'tests/files/plugins');
});

test('Help me!', () => {
    expect(sum(1, 2)).toBe(3);
});