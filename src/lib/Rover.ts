// Importing types and direction helpers
import type { Direction, Command, Position, RoverState, Obstacle, RoverResult } from "./types";
import { directions, moveVectors } from "./types";

// Main class that controls the rover's movement and state
export class Rover {
    private position: Position;
    private direction: Direction;
    private readonly gridSize: number;
    private readonly obstacles: Obstacle[];

     // Constructor initializes position, direction, grid size and obstacle list
    constructor(
        initial: RoverState,
        gridSize: 200,
        obstacles: Obstacle[] = []
    ) {
        this.position = { ...initial.position };
        this.direction = initial.direction;
        this.gridSize = gridSize;
        this.obstacles = obstacles;
    }
    // Executes a sequence of movement/rotation commands
    execute(commands: Command[]): RoverResult {
        for (const c of commands) {
            console.log(`Comando: ${c}`);

            if (c === "L" || c === "R") {
                this.turn(c);
                console.log(`Gira a ${this.direction}`);
            } else if (c === "F") {
                const nextPos = this.nextPosition();
                console.log(`Avanza hacia ${nextPos.x},${nextPos.y}`);
                if (this.hasObstacle(nextPos)) {
                    console.log(`Obstáculo en ${nextPos.x},${nextPos.y}! Abortando.`);
                    return {
                        finalPosition: this.position,
                        finalDirection: this.direction,
                        encounteredObstacle: nextPos
                    };
                }
                this.position = nextPos;
            }
        }
        // Return final state if no obstacles encountered
        return {
            finalPosition: this.position,
            finalDirection: this.direction
        };


    }

    /** Helpers */
    // Helper: Handles turning logic (left or right)
    private turn(turn: "L" | "R") {
        let idx = directions.indexOf(this.direction);
        idx = (turn === "L") ? (idx + 3) % 4   // -1 mod 4
            : (idx + 1) % 4;  // +1 mod 4
        this.direction = directions[idx];
    }
     // Helper: Calculates next position based on current direction
    private nextPosition(): Position {
    const { x, y } = this.position;
    const { dx, dy } = moveVectors[this.direction];
    
     // Wrap-around logic
    const step = (value: number) => (value + this.gridSize) % this.gridSize;
    
    return {
        x: step(x + dx),
        y: step(y + dy)
    };
    }

    // Helper: Checks if the next position contains an obstacle
    private hasObstacle(p: Position): boolean {
        return this.obstacles.some(o => o.x === p.x && o.y === p.y);
    }

}