<template>
  <div class="event-list">
    <div class="event-note" v-for="event in eventStore.events" :key="event.id">
      <div class="event-note__delete-button" @click="deleteNote(event.id)">
        {{ willDelete === event.id ? "Click again to delete" : "Delete" }}
      </div>

      <div class="event-note__edit-button" @click="editNote(event.id)">
        Edit
      </div>

      <div class="event-note-body">
        <h3 class="event-note-body__title">{{ event.title }}</h3>
        <p class="event-note-body__description">{{ event.description }}</p>
        <p class="event-note-body__author" v-if="event.organizer">
          - by <span>{{ event.organizer }}</span>
        </p>
      </div>
      <div class="event-note-footer">
        <p :class="{ none: !event.location }">
          <strong>{{ event.location }}</strong>
        </p>
        <p>
          {{ formatDate(event.date) }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useEventStore } from "../store/EventStore";
import { AxiosError } from "axios";
import { onMounted, ref, computed } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const eventStore = useEventStore();
const willDelete = ref<number | null>(null);

onMounted(async () => {
  await eventStore.fetchEvents().catch((error: AxiosError) => {
    router.push({
      name: "ErrorDisplay",
      params: {
        error: error?.response?.status,
      },
    });
  });
});

async function deleteNote(id: number): Promise<void> {
  if (willDelete.value === id) {
    await eventStore.deleteEvent(id).catch((error: AxiosError) => {
      router.push({
        name: "ErrorDisplay",
        params: {
          error: error?.response?.status,
        },
      });
    });
  } else {
    willDelete.value = id;

    setTimeout(() => {
      willDelete.value = null;
    }, 3000);
  }
}

async function editNote(id: number): Promise<void> {
  await eventStore
    .fetchEvent(id)
    .then(() => {
      router.push({
        name: "EventDetails",
        params: {
          id,
        },
      });
    })
    .catch((error: AxiosError) => {
      router.push({
        name: "ErrorDisplay",
        params: {
          error: error?.response?.status,
        },
      });
    });
}

function formatDate(date: number): string {
  return new Date(date).toLocaleString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  });
}
</script>

<style scoped lang="scss">
.event-list {
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;

  .event-note {
    border: 1px solid #2c3e50;
    border-radius: 4px;
    position: relative;
    background-color: #fff;
    overflow: hidden;

    &-body {
      padding: 16px;

      &__title {
        margin-bottom: 16px;
      }

      &__description {
        margin-bottom: 8px;
      }

      &__author {
        color: #23c985;

        span {
          font-weight: 600;
        }
      }
    }

    &-footer {
      display: flex;

      & > p {
        color: #fff;
        padding: 8px;
        flex: 1;
        background-color: #2c3e50;
        border-right: 1px solid #fff;

        &:last-child {
          border-right: none;
        }

        &.none {
          background-color: transparent;
          border-top: none;
        }
      }
    }

    &__delete-button {
      display: none;
      position: absolute;
      top: 0;
      right: 0;
      background-color: #f44336;
      color: #fff;
      padding: 8px 16px;
      cursor: pointer;
      border-left: 1px solid #2c3e50;
      border-bottom: 1px solid #2c3e50;
      border-bottom-left-radius: 4px;
    }

    &__edit-button {
      display: none;
      position: absolute;
      top: 0;
      left: 0;
      background-color: #ffc107;
      color: #fff;
      padding: 8px 16px;
      cursor: pointer;
      border-right: 1px solid #2c3e50;
      border-bottom: 1px solid #2c3e50;
      border-bottom-right-radius: 4px;
    }

    &:hover {
      .event-note__delete-button,
      .event-note__edit-button {
        display: block;
      }
    }
  }

  h3,
  p {
    margin: 0;
  }
}
</style>
