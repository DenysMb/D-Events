<template>
  <nav>
    <!-- <router-link to="/about">About Us</router-link> | -->
    <router-link to="/">Event List</router-link>
    <span v-if="isInCreatePage">
      > <router-link to="/event/create">Create</router-link>
    </span>
    <span v-if="isInEventDetailsPage">
      >
      <router-link :to="`/event/${eventStore.event?.id}`">{{
        eventStore.event!.id
      }}</router-link>
    </span>
  </nav>
  <router-view />
</template>

<script setup lang="ts">
import { onMounted, ref, watchEffect } from "vue";
import { useRoute } from "vue-router";
import { useEventStore } from "./store/EventStore";

const eventStore = useEventStore();
const route = useRoute();
/*  */
const isInCreatePage = ref(false);
const isInEventDetailsPage = ref(false);

onMounted(() => {
  updateMenu();
});

watchEffect(() => {
  updateMenu();
});

function updateMenu(): void {
  isInCreatePage.value = route.fullPath === "/event/create";
  isInEventDetailsPage.value =
    route.fullPath === `/event/${eventStore.event?.id}`;
}
</script>

<style lang="scss">
html,
body {
  margin: 0;
  background-color: #fafafa;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 16px;
  background-color: #2c3e50;
  margin-bottom: 16px;
  color: #fff;

  a {
    font-weight: bold;
    color: #fff;
    text-decoration: none;

    &.router-link-exact-active {
      color: #42b983;
    }

    &.disabled {
      color: #999;
      cursor: default;
    }
  }
}
</style>
