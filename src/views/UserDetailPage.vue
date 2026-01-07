<template>
<user-info-component user="user" @updateUser="updateUser"></user-info-component>
</template>


<script>
import UserInfoComponent from '@/components/UserInfoComponent.vue'

export default {
  name: 'UserDetailPage',
  components: { UserInfoComponent },
  data() {
    return {
      user: {
        name: 'blue',
        email: ' dd',
        birthdate: '2000-01-01',
        password: 'password123',
        numberofreviews: 10,
        gamesliked: 5,
        gamesdilsiked: 2
      }
    }
  },
  methods: {
    updateUser(updatedUser) {
      // Here you would typically commit a Vuex mutation or make an API call to update the user
      this.user = updatedUser;
    }
  }
}
</script>


<style scoped>

</style>
