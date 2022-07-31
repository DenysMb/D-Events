<template>
  <router-link v-if="props.to" :to="props.to || ''">
    <button :disabled="disabled" class="button">
      <slot></slot>
    </button>
  </router-link>

  <button :disabled="disabled" v-else class="button" @click="emit('click')">
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from "vue";

const emit = defineEmits(["click"]);

const props = defineProps<{
  to?: string;
  disabled?: boolean;
}>();
</script>

<style scoped lang="scss">
.button {
  padding: 16px;
  width: 100%;
  background-color: #23c985;
  border: none;
  border-radius: 4px;
  color: #fff;
  text-transform: uppercase;
  font-weight: 600;
  cursor: pointer;

  &:disabled {
    cursor: default;
    background-color: #BDBDBD;
  }
}
</style>
