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
                Criar Conta
              </h1>
              <p class="setup-description" :class="{ 'setup-description-mobile': isMobile }">
                Bem-vindo! Por favor, insira suas informações abaixo para começar.
              </p>
              <v-form ref="form" v-model="valid">
                <v-text-field
                  v-model="nome"
                  label="Nome"
                  placeholder="Digite seu nome"
                  required
                  :rules="nomeRules"
                  clearable
                  variant="outlined"
                  color="white"
                />
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
                  color="white"
                  required
                  :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                  @click:append="togglePasswordVisibility"
                  class="text-field-password"
                />
                <v-btn class="primary-action" :class="{ 'primary-action-mobile': isMobile }" @click="realizarCadastro()">Criar Conta!</v-btn>
              </v-form>
              <div class="mt-4">
                <span style="color: white;">Já possui conta? </span>
                <v-btn
                  variant="text"
                  style="font-size: 13px; text-transform: none; color: white; padding: 0; min-width: 0;"
                  to="/logar"
                >
                  Clique aqui para logar!
                </v-btn>
              </div>
            </div>
          </v-col>
        </v-row>

        <!-- Snackbar para mostrar mensagens -->
        <v-snackbar v-model="snackbar" :color="snackbarColor" timeout="3000">
          {{ snackbarMessage }}
          <template v-slot:actions>
            <v-btn color="white" text @click="snackbar = false">Fechar</v-btn>
          </template>
        </v-snackbar>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { cadastrarUsuario } from "./store/index.js";

export default {
  name: 'PaginaCadastro',
  data() {
    return {
      nome: null,
      email: null,
      senha: null,
      valid: false,
      showPassword: false,
      snackbar: false,
      snackbarMessage: "",
      snackbarColor: "success",
      isMobile: false, // Flag para verificar se é mobile
      passwordRules: [
        (v) => !!v || "O campo senha é obrigatório.",
        (v) => v.length >= 6 || "A senha deve ter pelo menos 6 caracteres.",
      ],
      emailRules: [
        (v) => !!v || "O campo e-mail é obrigatório.",
        (v) => /.+@.+\..+/.test(v) || "Por favor, insira um endereço de e-mail válido.",
      ],
      nomeRules: [
        (v) => !!v || "O campo nome é obrigatório.",
        (v) => v.length >= 4 || "O nome deve ter pelo menos 4 caracteres.",
      ],
    };
  },
  methods: {
    togglePasswordVisibility() {
      this.showPassword = !this.showPassword;
    },
    async realizarCadastro() {
      const form = this.$refs.form;
      const isValid = form.validate();

      if (!isValid.errors) {
        try {
          const result = await cadastrarUsuario(this.nome, this.email, this.senha);
          if (result) {
            this.snackbarMessage = "Cadastro realizado com sucesso! Faça o login.";
            this.snackbarColor = "success";
            this.snackbar = true;
            this.nome = null;
            this.email = null;
            this.senha = null;
          } else {
            this.snackbarMessage = "Erro ao realizar cadastro. Tente novamente.";
            this.snackbarColor = "error";
            this.snackbar = true;
          }
        } catch (error) {
          this.snackbarMessage = "Erro ao conectar com o servidor.";
          this.snackbarColor = "error";
          this.snackbar = true;
          console.error("Erro ao realizar cadastro:", error);
        }
      }
    },
    checkMobile() {
      this.isMobile = window.innerWidth <= 768; // Define 768px como o breakpoint para mobile
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
  max-width: 150px; /* Tamanho menor para mobile */
}

.setup-content {
  background: #39434f;
  margin-left: 650px;
  margin-top: -15px;
  padding: 40px;
  border-radius: 20px;
  text-align: center;
  box-shadow: 0 0 5px rgba(12, 26, 75, 0.08), 0 4px 20px -2px rgba(50, 50, 71, 0.04);
}

.setup-content-mobile {
  margin-left: 0; /* Remove a margem para mobile */
  padding: 60px; /* Padding menor para mobile */
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
  font-size: 24px; /* Tamanho menor para mobile */
}

.setup-description {
  color: #d9dfe6;
  font-size: 15px;
  line-height: 1.5;
  margin-bottom: 30px;
  font-weight: 100;
}

.setup-description-mobile {
  font-size: 14px; /* Tamanho menor para mobile */
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
  padding: 10px; /* Padding maior para mobile */
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