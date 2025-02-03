<template>
  <v-img
    src="/src/assets//bg.png"
    alt=""
    class="background-image"
    cover
  ></v-img>
  <v-app>
    <v-main>
      <v-container>
        <v-row justify="center" class="brand-section">
          <img src="../assets//logo.svg"
            alt="Pet Profile Logo"
            class="brand-logo"
            max-height="200"
          />
        </v-row>

        <v-row justify="center">
          <v-col cols="12" md="6" class="setup-content">
            <div>
              <h1 id="setup-title" class="setup-title">
                Criar Conta
              </h1>
              <p class="setup-description">
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
                />
                <v-text-field
                  v-model="email"
                  label="E-mail"
                  placeholder="Digite seu e-mail"
                  :rules="emailRules"
                  required
                  clearable
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
                  :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                  @click:append="togglePasswordVisibility"
                  class="text-field-password"
                />
                <v-btn class="primary-action" @click="realizarCadastro()">Criar Conta!</v-btn>
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
      passwordRules: [
        (v) => !!v || "O campo senha é obrigatório.",
        (v) =>
          v.length >= 6 || "A senha deve ter pelo menos 6 caracteres.",
      ],
      emailRules: [
        (v) => !!v || "O campo e-mail é obrigatório.",
        (v) =>
          /.+@.+\..+/.test(v) || "Por favor, insira um endereço de e-mail válido.",
      ],
      nomeRules: [
        (v) => !!v || "O campo nome é obrigatório.",
        (v) =>
          v.length >= 6 || "O nome deve ter pelo menos 4 caracteres.",
      ],
    };
  },
  methods: {
    togglePasswordVisibility() {
      this.showPassword = !this.showPassword;
    },
    async realizarCadastro() {
      const form = this.$refs.form;

      console.log("Validando formulário...");
      const isValid = form.validate();
      console.log("Resultado da validação:", isValid);

      if (!isValid.errors) {
        try {
          const result = await cadastrarUsuario(this.nome, this.email, this.senha);
          if (result) {
            const result = await autenticarUsuario(this.email, this.senha);
            if (result) {
              this.$router.push("/pagina-principal");
            }
          } else {
            console.error("Erro ao realizar cadastro no backend.");
          }
        } catch (error) {
          console.error("Erro ao realizar cadastro:", error);
        }
      }
    },
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
}

.brand-logo {
  max-width: 200px;
}

.setup-content {
  background: #39434f;
  margin-left: 650px;
  margin-top: 25px;
  padding: 40px;
  border-radius: 20px;
  text-align: center;
  box-shadow: 0 0 5px rgba(12, 26, 75, 0.08), 0 4px 20px -2px rgba(50, 50, 71, 0.04);
}

.setup-title {
  color: #fff;
  font-weight: medium;
  font-size: 27px;
  margin-bottom: 20px;
}

.setup-description {
  color: #d9dfe6;
  font-size: 15px;
  line-height: 1.5;
  margin-bottom: 30px;
  font-weight: 100;
}

.primary-action {
  margin-bottom: 10px;
  color: #fff;
  background-color:  #1885F3;
  width: 100%;
  padding: 5px;
  border-radius: 10px;
  margin-top: 20px;
}

.text-field-password .v-input__control {
  color: white; /* Cor do texto */
}

.text-field-password .v-label {
  color: white; /* Cor do label */
}

.text-field-password .v-input__control::placeholder {
  color: rgba(255, 255, 255, 0.6); /* Cor do placeholder */
}

/* Cor da label quando o campo está ativo (focado ou preenchido) */
.text-field-password .v-input.v-input--is-focused .v-label {
  color: white !important;
}
</style>
