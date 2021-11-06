<template>
  <table>
    <tr v-for="(column, x) in matrix">
      <td :class="row" v-for="(row, y) in column" @click="toggleCell(x, y)"></td>
    </tr>
  </table>
  <button @click="tick">Tick</button>
  <button @click="clear">Clear</button>
</template>
<style>
  table {
    margin: 20px auto;
    border-collapse: collapse;
  }
  td {
    border: 1px solid #585;
    cursor: pointer;
    padding: 5px;
    font-size: .7em;
    background-color: #565;
  }
  td.died {
    background-color: #020;
    border-color: #030;
  }
</style>
<script>
  import { generateMatrix, kill, resurrect, tick, toggle } from '../lib/matrix'
  import runEvery from '../lib/runEvery'

  let stop;

  export default {
    data() {
      return {
        matrix: generateMatrix(this.size)
      }
    },
    methods: {
      resurrect(x, y) {
        this.matrix = resurrect(this.matrix, { x, y })
      },
      kill(x, y) {
        this.matrix = kill(this.matrix, { x, y })
      },
      tick() {
        this.matrix = tick(this.matrix)
      },
      toggleCell(x, y) {
        this.matrix = toggle(this.matrix, { x, y })
      },
      clear() {
        this.matrix = generateMatrix(this.size)
      },
      restart() {
        if (stop) {
          stop()
        }
        if (this.run) {
          stop = runEvery(this.tick, this.speed)
        }
      }
    },
    props: {
      run: Boolean,
      size: Object,
      speed: Number,
    },
    watch: {
      size(oldSize, newSize) {
        if (oldSize.rows !== newSize.rows || oldSize.columns !== newSize.columns) {
          this.clear()
        }
      },
      run: "restart",
      speed: "restart"
    }
  }
</script>