<template>
  <v-img
    src="/src/assets/bg.png"
    alt=""
    class="background-image"
    cover
  ></v-img>
  <v-app>
    <v-main>
      <v-container>
        <img
          src="../assets/logo.png"
          alt="Pet Profile Logo"
          class="brand-logo"
          :class="{ 'brand-logo-mobile': isMobile }"
          max-height="200"
        />

        <v-row justify="center">
          <v-col cols="12" :md="isMobile ? 12 : 6" class="setup-content" :class="{ 'setup-content-mobile': isMobile }">
            <div>
              <h1 id="setup-title" class="setup-title" :class="{ 'setup-title-mobile': isMobile }">
                Realizar Login
              </h1>
              <p class="setup-description" :class="{ 'setup-description-mobile': isMobile }">
                Bem-vindo de volta! Por favor, insira suas informações abaixo para logar na sua conta.
              </p>
              <v-form ref="form" v-model="valid">
                <v-text-field
                  v-model="email"
                  label="E-mail"
                  placeholder="Digite seu e-mail"
                  :rules="emailRules"
                  required
                  clearable
                  color="white"
                  variant="outlined"
                />
                <v-text-field
                  v-model="senha"
                  label="Senha"
                  placeholder="Digite sua senha"
                  :type="showPassword ? 'text' : 'password'"
                  :rules="passwordRules"
                  variant="outlined"
                  clearable
                  required
                  color="white"
                  :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                  @click:append="togglePasswordVisibility"
                  class="text-field-password"
                />
                <v-btn class="primary-action" :class="{ 'primary-action-mobile': isMobile }" @click="realizarLogin()">Logar!</v-btn>
              </v-form>
              <div class="login-link mt-4">
                <span style="color: white;">Não possui conta? </span>
                <v-btn
                  variant="text"
                  style="font-size: 13px; text-transform: none; color: white; padding: 0; min-width: 0;"
                  to="/cadastrar"
                >
                  Clique aqui para se registrar!
                </v-btn>
              </div>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { autenticarUsuario } from "./store/index.js";

export default {
  name: 'PaginaLogin',
  data() {
    return {
      email: null,
      senha: null,
      valid: false,
      showPassword: false,
      isMobile: false,
      passwordRules: [
        (v) => !!v || "O campo senha é obrigatório.",
      ],
      emailRules: [
        (v) => !!v || "O campo e-mail é obrigatório.",
      ],
    };
  },
  methods: {
    togglePasswordVisibility() {
      this.showPassword = !this.showPassword;
    },
    async realizarLogin() {
      const isValid = this.$refs.form.validate();
      if (isValid) {
        const result = await autenticarUsuario(this.email, this.senha);
        if (result) {
          this.$router.push("/pagina-principal");
        } else {
          window.console.error("Erro ao realizar login");
        }
      }
    },
    checkMobile() {
      this.isMobile = window.innerWidth <= 768;
    },
  },
  created() {
    this.checkMobile();
    window.addEventListener('resize', this.checkMobile);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.checkMobile);
  },
};
</script>

<style scoped>
::placeholder {
  color: rgba(255, 255, 255, 0.5) !important;
}

.background-image {
  position: absolute;
  inset: 0;
  height: 100%;
  width: 100%;
  object-fit: cover;
  object-position: center;
  background-color: #272F3C;
}

.brand-logo {
  max-width: 200px;
}

.brand-logo-mobile {
  max-width: 150px;
}

.setup-content {
  background: #39434f;
  margin-left: 650px;
  margin-top: 30px;
  padding: 40px;
  border-radius: 20px;
  text-align: center;
  box-shadow: 0 0 5px rgba(12, 26, 75, 0.08), 0 4px 20px -2px rgba(50, 50, 71, 0.04);
}

.setup-content-mobile {
  margin-left: 0;
  padding: 60px;
  margin: 80px;
  max-width: 350px;
}

.setup-title {
  color: #fff;
  font-weight: medium;
  font-size: 27px;
  margin-bottom: 20px;
}

.setup-title-mobile {
  font-size: 24px;
}

.setup-description {
  color: #d9dfe6;
  font-size: 15px;
  line-height: 1.5;
  margin-bottom: 30px;
  font-weight: 100;
}

.setup-description-mobile {
  font-size: 14px;
}

.primary-action {
  margin-bottom: 10px;
  color: #fff;
  background-color: #1885F3;
  width: 100%;
  padding: 5px;
  border-radius: 10px;
  margin-top: 20px;
}

.primary-action-mobile {
  padding: 10px;
}

.text-field-password .v-input__control {
  color: white;
}

.text-field-password .v-label {
  color: white;
}

.text-field-password .v-input__control::placeholder {
  color: rgba(255, 255, 255, 0.6);
}

.text-field-password .v-input.v-input--is-focused .v-label {
  color: white !important;
}
</style>