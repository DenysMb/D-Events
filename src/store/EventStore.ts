import { defineStore } from "pinia";
import EventService from "../services/EventService";

export interface EventNote {
  id: number;
  category?: string;
  title: string;
  description: string;
  location: string;
  date: string;
  time: string;
  organizer?: string;
}

interface EventStore {
  user: string;
  events: EventNote[];
  event?: EventNote | null;
}

export const useEventStore = defineStore("EventStore", {
  state: (): EventStore => ({
    user: "Denys Madureira",
    events: [],
    event: null,
  }),
  getters: {
    numberOfEvents: (state): number => state.events.length,
  },
  actions: {
    fetchEvents() {
      return EventService.getEvents()
        .then((res) => {
          this.events = res.data;
        })
        .catch((err) => {
          throw err;
        });
    },
    fetchEvent(id: number) {
      return EventService.getEvent(id)
        .then((res) => {
          this.event = res.data;
        })
        .catch((err) => {
          throw err;
        });
    },
    createEvent(event: EventNote) {
      return EventService.postEvent(event)
        .then(() => {
          this.events.push(event);
        })
        .catch((error) => {
          throw error;
        });
    },
    editEvent(id: number, event: EventNote) {
      return EventService.patchEvent(id, event)
        .then(() => {
          console.log("Editado");
          this.event = null;
        })
        .catch((error) => {
          throw error;
        });
    },
    deleteEvent(id: number) {
      return EventService.deleteEvent(id)
        .then(() => {
          this.events = this.events.filter((ev) => ev.id !== id);
        })
        .catch((err) => {
          throw err;
        });
    },
  },
});
