import { ref, computed } from 'vue'
import { Rover } from '../lib/Rover'
import type { RoverState, Command, Obstacle, RoverResult, Position } from '../lib/types'

// Initial rover state (position and direction)
const initial: RoverState = {
    position: { x: 0, y: 0 },
    direction: 'N'
}

// Static obstacles placed on the planet
const obstacles: Obstacle[] = [
    { x: 2, y: 2 },
    { x: 5, y: 5 },
    { x: 1, y: 0 }
]

// Composable that handles rover state and UI logic
export function useRover() {
    // Input command string (e.g. "FFRFFL")
    const commandInput = ref('')

    // Result after executing commands
    const result = ref<RoverResult | null>(null)

    // Execute the command string and store the result
    function sendCommands() {
        const commands = commandInput.value.toUpperCase().split('') as Command[]
        const rover = new Rover(initial, 200, obstacles)
        result.value = rover.execute(commands)
    }

    const visibleSize = 10

    // Computed grid centered around the rover's current position
    const grid = computed(() => {
        const center = result.value?.finalPosition || initial.position
        const half = Math.floor(visibleSize / 2)
        const rows: Position[][] = []

        for (let y = center.y + half; y >= center.y - half; y--) {
            const row: Position[] = []
            for (let x = center.x - half; x <= center.x + half; x++) {
                // Use wrap-around logic to handle planet edges
                row.push({
                    x: (x + 200) % 200,
                    y: (y + 200) % 200
                })
            }
            rows.push(row)
        }

        return rows
    })

    // Determines the content of a cell: obstacle, rover, or empty
    function cellContent(cell: Position): string {
        const { x, y } = cell

        const isObstacle = obstacles.some(o => o.x === x && o.y === y)
        if (isObstacle) return 'X'

        if (result.value?.finalPosition.x === x && result.value?.finalPosition.y === y) {
            return result.value.finalDirection
        }

        return ''
    }

    // Return everything needed for the component to work
    return {
        commandInput,
        result,
        sendCommands,
        grid,
        cellContent
    }
}

