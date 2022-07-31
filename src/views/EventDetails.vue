<template>
  <div class="event-details">
    <p>{{ props.id }}</p>
  </div>
</template>

<script setup lang="ts">
import { useEventStore } from "../store/EventStore";
import { defineProps, onMounted } from "vue";

const props = defineProps<{ id: string }>();
const eventStore = useEventStore();

onMounted(() => {
  if (!eventStore.event) {
    eventStore.fetchEvent(parseInt(props.id));
  }
});
</script>

<style scoped></style>
