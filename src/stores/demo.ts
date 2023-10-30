import { defineStore } from 'pinia'

const useDemoStore = defineStore('Demo', {
  state: () => ({
    counter: 1
  }),
  getters: {
    doubleCounter(state) {
      return state.counter * 2
    }
  },
  actions: {
    incrementCounter(payload: number) {
      this.counter += payload
    }
  }
})

export default useDemoStore
