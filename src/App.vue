<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Table</router-link>
      <router-link to="/table-fc">Table FC</router-link>
    </div>
    <div class="container">
      <router-view />
    </div>
  </div>
</template>

<style>
body {
  --main-grat-color: #2c3e50;
}
#app {
  font-family: Roboto, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: var(--main-grat-color);
}

#nav {
  padding-top: 10px;
  width: 100%;
  border-bottom: 2px solid var(--main-grat-color);
}

#nav a {
  padding: 4px 4px 0 4px;
  font-size: 1.5rem;
  font-weight: bold;
  color: slategray;
  border-top: 2px solid lightslategray;
  border-left: 2px solid lightslategray;
  border-right: 2px solid lightslategray;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
  -moz-border-radius-topleft: 12px;
  -moz-border-radius-topright: 12px;
  text-decoration: none;
}

#nav a.router-link-exact-active {
  color: var(--main-grat-color);
  border-color: var(--main-grat-color);
  border-bottom: 2px solid white;
}

.container {
  display: flex;
  justify-content: center;
  align-items: flex-start;
}
</style>
