<template>
  <div>
    Nested view {{ depth }}
    <router-view />
  </div>
</template>

<script>
import { inject, provide } from 'vue'

export default {
  setup () {
    const depth = inject('depth', 0)
    provide('depth', depth + 1)

    return { depth }
  }
}
</script>
