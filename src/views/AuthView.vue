<template>
  <div class="form-container">
    <h1 class="login-title">{{ formTitle }}</h1>
      <LoginForm v-if="isLogin" />
      <SignUpForm v-else />
    <div class="toggle-button-container">
      <v-btn
        color="#F29F05"
        class="toggle-button"
        @click="toggleForm"
      >
        {{ toggleFormButtonText }}
      </v-btn>
    </div>
  </div>
</template>

<script>
  import LoginForm from '../components/LoginForm.vue'
  import SignUpForm from '../components/SignUpForm.vue'

  export default {
    components: {
      LoginForm,
      SignUpForm,
    },
    data: () => ({
      isLogin: true,
    }),
    computed: {
      formTitle () {
        return this.isLogin ? 'Login' : 'Cadastro'
      },
      toggleFormButtonText () {
        return this.isLogin ? 'Novo aqui? Cadastre-se' : 'Já tem conta? Faça seu Login'
      },
    },
    methods: {
      toggleForm () {
        this.isLogin = !this.isLogin
      },
    },
  }
</script>

<style scoped>
.form-container {
  padding-block: 4rem;
  max-width: 37.5rem;
  margin-inline: auto;
}

.login-title {
  font-size: 2.5rem;
  margin-bottom: 1rem;
  text-align: center;
  color: #401580;
}

.toggle-button-container {
  display: flex;
  margin-top: 2rem;
  width: 100%;
  justify-content: center;
}
</style>
