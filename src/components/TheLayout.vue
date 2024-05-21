<template>
  <div>
    <TheHeader :is-authorized="isAuthorized" />
    <div class="content-container">
      <LoadingView v-if="!isAuthReady" />
      <AuthView v-else-if="!isAuthorized" />
      <HomeView v-else />
    </div>
  </div>
</template>

<script>
  import TheHeader from './TheHeader.vue'
  import AuthView from '../views/AuthView.vue'
  import HomeView from '../views/HomeView.vue'
  import LoadingView from '../views/LoadingView.vue'
  import { onAuthStateChanged } from 'firebase/auth'
  import { auth } from '../config'

  export default {
    data: () => ({
      isAuthReady: false,
      isAuthorized: false,
    }),
    components: {
      TheHeader,
      AuthView,
      HomeView,
      LoadingView
    },
    created () {
      onAuthStateChanged(auth, async (authUser) => {
        try {
          if (!authUser) {
            this.isAuthorized = false
            return
          }
          this.isAuthReady = false
          this.isAuthorized = true
        } catch(error) {
          console.error(error)
        } finally {
          this.isAuthReady = true
        }
      })
    },
  }
</script>

<style scoped>
.content-container {
  padding-inline: 2rem;
}
</style>
