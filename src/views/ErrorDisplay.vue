<template>
  <div class="error-display">
    <h4>Oops! There was an error:</h4>
    <p>{{ props.error }}</p>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from "vue";

const props = defineProps<{ error: string }>();
</script>

<style scoped></style>
