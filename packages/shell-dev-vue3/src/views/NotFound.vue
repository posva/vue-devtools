<template>
  <div>
    <h3>Page not found</h3>
    <p>{{ $route.fullPath }}</p>
    <router-link to="/">
      Go Home
    </router-link>
  </div>
</template>
