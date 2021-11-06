<template>
  <h1>GoL</h1>
  <fieldset>
    <legend>Configuration</legend>
    <label><span>columns:</span> <input type="number" v-model="columns" /></label>
    <label><span>rows:</span> <input type="number" v-model="rows" /></label>
    <label><span>speed:</span> <input type="number" v-model="speed" /></label>
  </fieldset>
  <Matrix :run="run" :size="size" :speed="speed" />
  <button @click="toggleRun">{{this.run ? 'Stop' : 'Go'}}!</button>
</template>
<style>
  fieldset {
    width: 10em;
    text-align: left;
    padding-left: 20px;
    display: flex;
    flex-direction: column;
    margin: 0 auto;
  }
  label {
    display: flex;
  }
  label > span {
    min-width: 5em;
  }
  input {
    width: 3em;
  }
</style>
<script>
  import Matrix from './Matrix.vue'
  export default {
    data() {
      return {
        run: false,
        rows: 50,
        columns: 50,
        speed: 500
      }
    },
    components: {
      Matrix
    },
    computed: {
      size() {
        return {
          rows: Number.parseInt(this.rows),
          columns: Number.parseInt(this.columns)
        }
      }
    },
    methods: {
      toggleRun() {
        this.run = !this.run
      }
    }
  }
</script>