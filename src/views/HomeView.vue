<template>
  <div class="home">
    <h1>Hello!</h1>
    <h2>You have {{ eventsStore.numberOfEvents }} events to be done.</h2>

    <event-list />

    <div class="event-create-button__wrapper">
      <d-button to="/event/create">Create new event</d-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import EventList from "../components/EventList.vue";
import { useEventStore } from "../store/EventStore";
import DButton from "../components/DButton.vue";

const eventsStore = useEventStore();
</script>

<style lang="scss">
h1,
h2 {
  margin: 0;
}

h2 {
  font-weight: 500;
}

.event-create-button__wrapper {
  position: sticky;
  bottom: 0;

  button.button {
    border-radius: 0;
  }
}
</style>
