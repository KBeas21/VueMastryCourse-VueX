<template>
  <div>
    <h1>Events Listing</h1>
    <EventCard v-for="event in events" :key="event.id" :event="event"/>
    
    <template v-if="page != 1"> <!-- Only show Previos link if not on first page -->
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
// import EventService from '@/services/EventService.js' This goes to ...mapState now
import { mapState } from 'vuex';

export default {
  components: {
    EventCard
  },
  // Vue lifycycle method -- We are moving this into Vuex see our store
  created() {
    // Without Vuex
    // EventService.getEvents()
    //   .then(response => {
    //     this.events = response.data
    //   })
    //   .catch(error => {
    //     console.log('There was an error:', error.response)
    //   })

    // With Vuex
    this.$store.dispatch('fetchEvents', {
      perPage: 3, // <-- how many items per page
      page: this.page // <-- what page we're on -- see computed page()
    });
  },
  computed: {
    page() {
      // How do we send in a URL query parameter to know what page we're on?
      // this is either the routes query page value OR if no query parameters, assume we are on the first page
      return parseInt(this.$route.query.page) || 1;
    },
    hasNextPage() {
      return this.eventsTotal > this.page * this.page
    },
    ...mapState(['events', 'eventsTotal'])
  },
  // Data hee is no longer needed since we are pulling the information from our store
  // data() {
  //   return {
  //     events: []
  //   }
  // },
}
</script>
