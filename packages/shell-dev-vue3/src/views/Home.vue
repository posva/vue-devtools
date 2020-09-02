<template>
  <div>
    <h3>Home</h3>
    <ul>
      <li>
        <router-link to="/users/5">
          Go to User 5
        </router-link>
      </li>
      <li>
        <router-link to="/users/5?delay=1000">
          Wait 1s
        </router-link>
      </li>
      <li>
        <router-link to="/fail-before-enter">
          Fail at <code>beforeEnter</code>
        </router-link>
      </li>
      <li>
        <router-link to="/cant-come">
          Forbidden
        </router-link>
      </li>
      <li>
        <router-link to="/not-found">
          Not found
        </router-link>
      </li>
    </ul>
  </div>
</template>
