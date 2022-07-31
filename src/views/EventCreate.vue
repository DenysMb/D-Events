<template>
  <div class="event-create">
    <div class="event-create__row">
      <div class="event-create__row-title">
        <span>Title:</span>
      </div>
      <div class="event-create__row-input">
        <input type="text" v-model="form.title" />
      </div>
    </div>

    <div class="event-create__row">
      <div class="event-create__row-title">
        <span>Description:</span>
      </div>
      <div class="event-create__row-input">
        <input type="text" v-model="form.description" />
      </div>
    </div>

    <div class="event-create__row">
      <div class="event-create__row-title">
        <span>Date:</span>
      </div>
      <div class="event-create__row-input">
        <Datepicker v-model="form.date" />
      </div>
    </div>

    <div class="divider">
      <p>Optional</p>
    </div>

    <div class="event-create__row">
      <div class="event-create__row-title">
        <span>Organizer:</span>
      </div>
      <div class="event-create__row-input">
        <input type="text" v-model="form.organizer" />
      </div>
    </div>

    <div class="event-create__row">
      <div class="event-create__row-title">
        <span>Location:</span>
      </div>
      <div class="event-create__row-input">
        <input type="text" v-model="form.location" />
      </div>
    </div>

    <d-button @click="saveEvent" :disabled="!buttonEnabled">Save</d-button>
  </div>
</template>

<script setup lang="ts">
import DButton from "../components/DButton.vue";
import { useEventStore } from "../store/EventStore";
import { AxiosError } from "axios";
import { reactive, defineProps, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import Datepicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";

const { id } = defineProps<{ id: string }>();

const form = reactive({
  title: "",
  description: "",
  organizer: "",
  location: "",
  date: new Date(),
});

const buttonEnabled = computed(
  () => form.title && form.description && form.date
);
const eventStore = useEventStore();
const router = useRouter();

onMounted(async () => {
  if (id) {
    await eventStore.fetchEvent(id);

    form.title = eventStore.event.title;
    form.description = eventStore.event.description;
    form.organizer = eventStore.event.organizer;
    form.location = eventStore.event.location;
    form.date = eventStore.event.date;
  }
});

function saveEvent() {
  const formDate = new Date(form.date);

  const successCB = () => {
    router.push("/");
  };

  const errorCB = (error: AxiosError) => {
    router.push({
      name: "ErrorDisplay",
      params: {
        error: error?.response?.status,
      },
    });
  };

  const event = {
    id: new Date().getTime(),
    title: form.title,
    description: form.description,
    organizer: form.organizer,
    location: form.location,
    date: formDate,
  };

  if (id) {
    eventStore.editEvent(id, form).then(successCB).catch(errorCB);
  } else {
    eventStore.createEvent(event).then(successCB).catch(errorCB);
  }
}
</script>

<style scoped lang="scss">
.event-create {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 16px;

  &__row {
    display: flex;
    align-items: center;
    border-radius: 4px;
    border: 1px solid #2c3e50;

    &-title {
      width: 100px;
      display: flex;
      background-color: #2c3e50;
      color: #fff;
      padding: 10px;
    }

    &-input {
      display: flex;
      flex: 1;

      & > div {
        flex: 1;
      }

      input {
        flex: 1;
        padding: 8px;
        border-radius: 4px;
        border: none;
        outline: none;
      }

      .dp__input {
        border-radius: 0;
        border: none;
      }
    }

    button {
      flex: 1;
      padding: 8px;
    }
  }

  .divider {
    position: relative;
    display: flex;
    justify-content: center;

    p {
      margin: 0;
      background-color: #fafafa;
      padding: 0 8px;
      z-index: 5;
      color: #757575;
    }

    &::before {
      position: absolute;
      content: "";
      background-color: #757575;
      width: 100%;
      height: 1px;
      top: 50%;
      left: 0;
    }
  }
}
</style>
