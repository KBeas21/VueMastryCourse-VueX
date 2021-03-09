<template>
  <!-- The different between "class" and ":class" is that the latter one is attached
   to vue (binding our computed value) the former is just a normal css class -->
  <div class="notification-bar" :class="notificationTypeClass">
    <p>{{ notification.message }}</p>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  props: {
    notification: {
      type: Object,
      required: true
    },
  },
  data() {
    return {
      timeout: null
    }
  },
  mounted() {
    // lifecycle when the component is mounted we will show it for 5 seconds and then it will go away
    this.timeout = setTimeout(() => this.remove(this.notification), 5000)
  },
  beforeDestroy() {
    // lifecycle method just incase the component trys to removed itself from the DOM after a user
    // already navigated away
    clearTimeout(this.timeout)
  },
  computed: {
    notificationTypeClass() {
      // so this will return either "-text-error" or "text-success" because of our
      // notification type property in our notification object text-error
      return `-text-${this.notification.type}`
    }
  },
  methods: {
    ...mapActions('notification', ['remove'])
  }
}
</script>

<style scoped>
.notification-bar {
  margin: 1em 0 1em;
}
</style>
