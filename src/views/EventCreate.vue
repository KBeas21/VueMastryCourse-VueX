<template>
    <div>
      <h1>Create Event {{ user.name }} / {{ user.id }} </h1>
      <!--
        @submit (when form is submitted) '.prevent' (prevents the default behavior of the form)
          Below calls the below method that commits the action
      -->
      <form @submit.prevent="createEvent">
        <label>Select a category</label>
        <select v-model="event.category">
          <option v-for="cat in categories" :key="cat">{{ cat }}</option>
        </select>

        <h3>Name & describe your event</h3>
        <div class="field">
          <label>Title</label>
          <input v-model="event.title" type="text" placeholder="Add an event title"/>
        </div>

        <div class="field">
          <label>Description</label>
          <input v-model="event.description" type="text" placeholder="Add a description"/>
        </div>

        <h3>Where is your event?</h3>
        <div class="field">
          <label>Location</label>
          <input v-model="event.location" type="text" placeholder="Add a location"/>
        </div>

        <h3>When is your event?</h3>
        <div class="field">
          <label>Date</label>
          <datepicker v-model="event.date" placeholder="Select a date"/>
        </div>

        <div class="field">
          <label>Select a time</label>
          <select v-model="event.time">
            <option v-for="time in times" :key="time">{{ time }}</option>
          </select>
        </div>

        <input type="submit" class="button -fill-gradient" value="Submit"/>
    </form>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Datepicker from 'vuejs-datepicker';

export default {
  components: {
    Datepicker
  },
  computed: {
    ...mapState(['user'])
  },
  data() {
    const times = [];
    for (let i = 1; i <= 24; i++) {
      times.push(i + ':00');
    }

    return {
      times,
      categories: this.$store.state.categories,
      event: this.createFreshEventObject()
    }
  },
  methods: {
    createEvent() {
      /* 
      // This calls our action createEvent inside of the store 
      this.$store.dispatch('createEvent', this.event);

      // The above doesn't clear our form to clear our form we can do the below, thought we want 
      // to make sure that we successfully added it do the DB before we clear so we go to the store
      this.event = this.createFreshEventObject()
      */
     this.$store.dispatch('createEvent', this.event)
       .then(() => {
       // Once we have successfully created an event, we can redirect the user to that view by using
       // Vue router's method push method. (https://router.vuejs.org/guide/essentials/navigation.html#router-push-location-oncomplete-onabort)
        this.$router.push({
          name: 'event-show',
          params: { id: this.event.id } // see @/router.js file for path we are hitting
        });
        // NOTE: we have to clear it afterwards so that we can use the event.id for the router
        this.event = this.createFreshEventObject();
        })
        .catch(() => {
          // error handling. Normally we would set an error state here and show some error component or banner for this
          console.log('there was a problem creating your event')
        });
    },
    createFreshEventObject() {
      const user = this.$store.state.user;
      const id = Math.floor(Math.random() * 1000)

      /*
      You might be wondering why we have this method. Why not just have all these properties on our data itself?
      Well, when we submit an event, we want to reset this component’s event data, and this method is a handy way
      for us to do that. You’ll see us using it later.
      
      If we did not reset our local event object, we could be retaining unnecessary connections between this
      object and the one we push into our State.
      */
      return {
        id: id,
        user: user,
        category: '',
        organizer: user,
        title: '',
        description: '',
        location: '',
        date: '',
        time: '',
        attendees: []
      }
    }
  }
}
</script>

<style scoped>
.field {
  margin-bottom: 4rem;
}
</style>
