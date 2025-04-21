# Mars Rover - Vue UI

This is a simple Vue 3 frontend that visualizes the Mars Rover Kata in a grid-based UI.  
It connects to the logic implemented in the [mars-rover-ts](https://github.com/DamarisTeoc/MarsRoverMission/tree/master) project.

## Features

- Command input: Type sequences like `FFRFFL`
- Rover movement and direction display
- Obstacle detection and alert
- 10x10 visual grid centered on the rover’s position
- Grid uses wrap-around logic (planet is toroidal)

## Commands

- `F` — Move forward
- `L` — Turn left
- `R` — Turn right

## Project Setup

```bash
npm install
npm run dev
npm run test