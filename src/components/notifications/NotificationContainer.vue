<template>
  <div class="notification-container">
    <!--
      v-for - to loop over array
      :key - unique id when in loop
      :notification - NotificationBar's notification prop
    -->
    <NotificationBar
      v-for="notification in notifications"
      :key="notification.id"
      :notification="notification"
    />
  </div>
</template>

<script>
import NotificationBar from '@/components/notifications/NotificationBar.vue';
import { mapState } from 'vuex';

export default {
  components: {
    NotificationBar,
  },
  computed: {
    // mapState('moduleName', [stateInThatModuleToMap])
    ...mapState('notification', ['notifications'])
  }
}
</script>

<style scoped>
.notification-container {
  position: fixed;
  bottom: 0;
  right: 0;
  padding-right: 40px
}
</style>
