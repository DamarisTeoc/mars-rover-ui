// Cardinal directions for the rover
export type Direction = "N" | "E" | "S" | "W";

// Valid movement commands
export type Command    = "F" | "L" | "R";

// Position on the grid
export interface Position { x: number; y: number; }

// Full rover state (position + direction)
export interface RoverState {
  position: Position;
  direction: Direction;
}

// Obstacles are just positions
export interface Obstacle extends Position {}

// Final result after executing commands
export interface RoverResult {
  finalPosition: Position;
  finalDirection: Direction;
  encounteredObstacle?: Position;
}

// Order of directions used to rotate
export const directions: Direction[] = ["N", "E", "S", "W"];

// Movement vectors per direction
export const moveVectors: Record<Direction, { dx: number; dy: number }> = {
  N: { dx: 0, dy: -1 },
  E: { dx: 1, dy: 0 },
  S: { dx: 0, dy: 1 },
  W: { dx: -1, dy: 0 }
};