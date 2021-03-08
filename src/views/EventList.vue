<template>
  <div>
    <h1>Events Listing for {{ userMod.user.name }}</h1> <!-- userMod -> module name | user -> state -->
    <EventCard v-for="event in eventMod.events" :key="event.id" :event="event"/>
    
    <template v-if="page != 1">
      <router-link :to="{ name: 'event-list', query: { page: page - 1 } }" rel="prev">
        Previous page
      </router-link>
       <template v-if="hasNextPage"> | </template> 
    </template>
    <router-link v-if="hasNextPage" :to="{ name: 'event-list', query: { page: page + 1 } }" rel="prev">
      Next page
    </router-link>
  </div>
</template>

<script>
import EventCard from '@/components/EventCard.vue'
import { mapState } from 'vuex';

export default {
  components: {
    EventCard
  },
  created() {
    // using namespacing you have to dipatch 'module/action'
    this.$store.dispatch('eventMod/fetchEvents', {
      perPage: 3, // <-- how many items per page
      page: this.page // <-- what page we're on -- see computed page()
    });
  },
  computed: {
    page() {
      return parseInt(this.$route.query.page) || 1;
    },
    hasNextPage() {
      return this.eventMod.eventsTotal > this.page * this.page
    },
    // Downside HERE, events, eventsTotal, & userMod are all in global state
    // but how do we tell them apart?? We don't :) so userMod.....hints the name
    ...mapState(['eventMod', 'eventsTotal', 'userMod'])
    /*
    `$store.state.event` is refering to the module name so it looks like:
        $store.state.eventMod = { events: [], eventsTotal: 0 }
    */
  },
}
</script>
