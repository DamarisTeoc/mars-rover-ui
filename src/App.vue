<script setup lang="ts">
// Main app imports the grid component and the rover logic
import GridView from './components/GridView.vue'
import { useRover } from './composables/useRover'

// Destructure reactive variables and methods from the composable
const {
  commandInput,
  result,
  sendCommands,
  grid,
  cellContent
} = useRover()
</script>

<template>
  <main class="p-6 font-mono max-w-xl mx-auto text-white">
    <h1 class="text-3xl mb-4 text-center">Mars Rover UI</h1>

    <!-- Input form for commands -->
    <div class="flex gap-2 mb-6 justify-center">
      <input
        v-model="commandInput"
        placeholder="Commands (e.g. FFRFFL)"
        class="border p-2 text-black"
      />
      <button
        @click="sendCommands"
        class="px-4 py-2 bg-white text-black border"
      >
        Execute
      </button>
    </div>

    <!-- Rover's final result -->
    <div v-if="result" class="mb-6 text-center">
      <p>Final Position: ({{ result.finalPosition.x }}, {{ result.finalPosition.y }})</p>
      <p>Final Direction: {{ result.finalDirection }}</p>
      <p v-if="result.encounteredObstacle" class="text-red-400 font-bold">
        Obstacle at: ({{ result.encounteredObstacle.x }}, {{ result.encounteredObstacle.y }})
      </p>
    </div>

    <!-- Render grid using the visual component -->
    <GridView :grid="grid" :cellContent="cellContent" />
  </main>
</template>