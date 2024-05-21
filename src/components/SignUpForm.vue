<template>
    <v-form
      ref="form"
      v-model="valid"
      lazy-validation
    >
      <v-alert v-if="!!errorMessage"
          color="red"
          text
          type="error"
          class="text-center"
        >
          {{ errorMessage }}
      </v-alert>

      <v-text-field
        v-model="email"
        :rules="emailRules"
        label="E-mail"
        required
      />

      <v-text-field
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="passwordRules"
            :type="showPassword ? 'text' : 'password'"
            name="input-10-2"
            label="Senha"
            v-model="password"
            class="input-group--focused"
            @click:append="showPassword = !showPassword"
      />
      <v-btn
        :disabled="!valid"
        color="#401580"
        class="mr-4 w-full"
        @click="signUp"
      >
        Cadastrar
      </v-btn>
    </v-form>
</template>

<script>
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../config'

export default {
  data: () => ({
    valid: true,
    errorMessage: '',
    email: '',
    emailRules: [
      v => !!v || 'E-mail é necessário',
      v => /.+@.+\..+/.test(v) || 'E-mail deve ser válido',
    ],
    showPassword: false,
    password: '',
    passwordRules: [
      value => !!value || 'Senha é necessária.',
      v => v.length >= 8 || 'Mínimo de 8 caracteres',
    ]
  }),
  methods: {
    validate () {
      this.$refs.form.validate()
    },
    async signUp () {
        try {
          this.errorMessage = ''
          await this.validate()

          const isValid = this.valid
          if(!isValid) {
            return
          }

          await createUserWithEmailAndPassword(auth, this.email, this.password)
        } catch (error) {
          if (error.code === 'auth/email-already-in-use') {
            this.errorMessage = 'Erro ao cadastrar: Email já em uso'
          }
          this.errorMessage = 'Ocorreu um erro ao cadastrar, por favor tente novamente mais tarde'
        }        
      }
  },
}
</script>

<style scoped>
.w-full {
  color: #fff;
  width: 100%;
}
</style>
