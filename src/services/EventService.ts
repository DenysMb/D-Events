import { EventNote } from '../store/EventStore'
import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'http://localhost:3000',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

export default {
  getEvents() {
    return apiClient.get('/events')
  },
  getEvent(id: string | number) {
    return apiClient.get('/events/' + id)
  },
  postEvent(event: EventNote) {
    return apiClient.post('/events', event)
  },
  patchEvent(id: string | number, event: EventNote) {
    return apiClient.patch('/events/' + id, event)
  },
  deleteEvent(id: string | number) {
    return apiClient.delete('/events/' + id)
  },
}