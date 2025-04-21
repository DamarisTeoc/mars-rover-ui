<script setup lang="ts">
import type { Position } from '../lib/types'

// Props received from parent component:
// - grid: 2D array of positions representing the visible area
// - cellContent: function to determine what to render in each cell
defineProps<{
  grid: Position[][]
  cellContent: (cell: Position) => string
}>()
</script>

<template>
<!-- Grid rendering: each row contains multiple cells -->
  <div class="grid-visual">
    <div
      v-for="row in grid"
      :key="row[0].y"
      class="row"
    >
      <div
        v-for="cell in row"
        :key="`${cell.x}-${cell.y}`"
        class="cell"
      >
        {{ cellContent(cell) }}
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Container for the full grid */
.grid-visual {
  display: flex;
  flex-direction: column;
  gap: 2px;
  border: 2px solid #fff;
  margin-top: 1rem;
}
/* Each row of the grid */
.row {
  display: flex;
  gap: 2px;
}

/* Each cell inside a row */
.cell {
  width: 32px;
  height: 32px;
  background-color: #222;
  border: 1px solid #555;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: bold;
}
</style>
