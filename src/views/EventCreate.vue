<template>
<!--
  This document will so us how to use basic state and getters:
    * (1) - (6) are basic state usage
    * (7) - (10) getters will take you back to the store where the state is being held
    * (11) mapGetters, just like we use mapState in (3) we can do the samething for getters
-->

  <!-- (1) - just pulling from store 
    <h1>Create Event {{ $store.state.user.name }}</h1> this does the same thing as below BUT the COMPUTED VALUE is better for reuseibility.
  -->
  <!-- (2) use computed to pull from store
    <div>
      <h1>Create Event {{ userName }}</h1>
      <p>This event was created by {{ userName }}</p>
    </div>
  -->
  <!-- (3) 
    <div>
    <h1>Create Event {{ userName }}</h1>
    <p>This event was created by {{ userName }} - {{ userID }}</p>
  </div>
  -->
  <!-- (4) and (5) -->
    <div>
    <h1>Create Event {{ user.name }}</h1>
    <p>This event was created by {{ user.name }} - {{ user.id }}</p>
    <p>There are {{ catLength }} categories</p>
    <ul>
      <li v-for="cat in categories" :key="cat">{{ cat }}</li> <!-- (8) & (9) -->
    </ul>
    <p><b>Get all todos:</b></p> 
    <p>{{ getTodos }}</p>
    <p><b>Get done todos:</b></p> <!-- (7) -->
    <p>{{ getDoneTodos }}</p>
    <!-- <p>{{ doneTodos }}</p> See (11) comment below -->
    <p><b>Get 1 todo with id -- dynamic:</b></p> <!-- (10) -->
    <p>{{ getTodo(1) }}</p>
    <!-- <p>{{ getTodoById(1) }}</p> (11) would change this to the getter in state, getTodoById() over getTodo(1) -->
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'; // This allows us to mapState/mapGetters to computed properties

export default {
  // (2) below is not using MapState 
  // computed: {
  //   userName() {
  //     return this.$store.state.user.name;
  //   },
  //   userID() {
  //     return this.$store.state.user.id;
  //   }
  // },

  // (3) below is using mapState with functions but we can do it a little more simplistically (see (4)) 
  // computed: mapState({
  //   userName: state => state.user.name,
  //   userID: state => state.user.id,
  //   categories: state => state.categories
  // }),

  // (4) below is a simplier state pulling from strings
  // computed: mapState({
  //   user: 'user',
  //   categories: 'categories'
  // }),

  // (5) 
  // computed: mapState([ 'user', 'categories']),

  // NOTE: Computed properties are only for transforming data for our presentation layer.
  // It shouldn't change the data given in any way. If it changes the data it will more than
  // likely result in headaches and bugs later
  // NOTE 2: When determining when to use a computed property or method think about it like:
  // When you need to change data you will use *methods*. 
  // When you need to change the presentation of EXISTING DATA you will use computed properties.
  /*
    Additional INFO:
      The difference between a computed property and a method is that computed properties are cached and
      change only when their dependencies change. A method will evaluate every time it's called.
  */
  computed: {
    // (6) if we wanted to have localComputed properties with mapState we would use the spread oprator and it would look like:
    someLocalComputed() {
      return this.someLocalComputed;
    },
    catLength() {
      // return this.$store.state.categories.length
      // this would work but if we wanted to use this in multiple components we would have a lot of duplicate code -- INSERT GETTERS!!! (7)
      return this.$store.getters.catLength
    },
    getTodo() {
      return this.$store.getters.getTodoById
    },
    getTodos() {
      return this.$store.getters.getTodos
    },
    getDoneTodos() {
      return this.$store.getters.doneTodos
    },
    // (11) We can take all the above and use mapGetters like we do mapState
    //       NOTE: this maps to the getters name not the computed functions name
    // ...mapGetters(['catLength','getTodoById','getTodos','doneTodos']),
    ...mapState(['user', 'categories'])
  }
}
</script>

<style scoped>

</style>
