import { ECSEngine } from "../src/engine";
import { ECSWorld } from "../src/world";

let world: ECSWorld;

let sum = (a, b) => {
    return a + b;
}

beforeAll(() => {
    world = new ECSWorld('nodes.json');
});

test('Help me!', () => {
    expect(sum(1, 2)).toBe(3);
});