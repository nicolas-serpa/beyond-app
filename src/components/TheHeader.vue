<template>
    <v-app-bar
    app
    color="#F3F2F2"
    dark
    class="header"
    >
    <div class="d-flex align-center">

    <v-btn
    color="#F3F2F2"
    depressed
    >
      <v-img
      src="https://beyondcompany.com.br/img/menu-icon.fb416226.svg"
      width="24"
      />
    </v-btn>
      <v-img
        alt="Beyond logo"
        class="shrink mt-1 hidden-sm-and-down"
        contain
        min-width="100"
        src="https://beyondcompany.com.br/img/logo.62069458.svg"
        width="170"
      />
    </div>

    <v-spacer />

    <v-btn
        v-if="isAuthorized"
        color="#401580"
        class="mr-4 w-full"
        @click="logOut"
      >
        Logout
    </v-btn>
  </v-app-bar>
</template>

<script>
import { signOut } from 'firebase/auth'
import { auth } from '../config'

    export default {
      props: {
        isAuthorized: {
          type: Boolean,
          required: true,
        }
      },
      methods: {
        async logOut () {
          await signOut(auth)
        }
      }
    }
</script>

<style scoped>
.header {
  position: sticky;
}
</style>
