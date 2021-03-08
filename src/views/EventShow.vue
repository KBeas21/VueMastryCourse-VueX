<template>
  <div>
    <div class="event-header">
      <span class="eyebrow">@{{ event.time }} on {{ event.date }}</span>
      <h1 class="title">{{ event.title }}</h1>
      <h5>Organized by {{ event.organizer ? event.organizer.name : '' }}</h5>
      <h5>Category: {{ event.category }}</h5>
    </div>

    <BaseIcon name="map"><h2>Location</h2></BaseIcon>

    <address>{{ event.location }}</address>

    <h2>Event details</h2>
    <p>{{ event.description }}</p>

    <h2>Attendees
      <span class="badge -fill-gradient">{{ event.attendees ? event.attendees.length : 0 }}</span>
    </h2>
    <ul class="list-group">
      <li v-for="(attendee, index) in event.attendees" :key="index" class="list-item">
        <b>{{ attendee.name }}</b>
      </li>
    </ul>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'

export default {
  props: ['id'],
  created() {
    // using namespacing you have to dipatch 'module/action'
    // this.$store.dispatch('eventMod/fetchEvent', this.id);
    
    // using the mapActions helper it would look like:
    this.fetchEvent(this.id)
  },
  computed: {
    /**
     * An other way to update everything instead of having `eventMod.event` or `eventMod.events`
     * is to map the word event to `eventMod.event`
     * 
     * This way we don't have to update all the dot calls
     */
    ...mapState({
      event: state => state.eventMod.event
    }),
  },
  methods: mapActions('eventMod', ['fetchEvent']) // could also be mapActions([eventMod/fetchEvent])
}
</script>
<style scoped>
.location {
  margin-bottom: 0;
}
.location > .icon {
  margin-left: 10px;
}
.event-header > .title {
  margin: 0;
}
.list-group {
  margin: 0;
  padding: 0;
  list-style: none;
}
.list-group > .list-item {
  padding: 1em 0;
  border-bottom: solid 1px #e5e5e5;
}
</style>
