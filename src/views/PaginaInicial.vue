<template>
  <v-img
    src="/src/assets/bg.png"
    alt="Background"
    class="background-image"
    cover
  ></v-img>
  <v-app>
    <v-main>
      <v-container fluid>
        <img
          src="../assets/logo.png"
          alt="Pet Profile Logo"
          class="brand-logo"
        />

        <v-row justify="center">
          <!-- Layout Desktop -->
          <v-col
            v-if="!isMobile"
            cols="12"
            md="6"
            class="setup-content"
          >
            <div>
              <h1 id="setup-title" class="setup-title">
                Perfil Personalizado de Pets
              </h1>
              <p class="setup-description">
                Organize e personalize o gerenciamento dos comedouros inteligentes dos seus pets no
                seu aplicativo. Crie perfis personalizados para cada animal, registrando informações
                como nome, raça e idade. Acompanhe a alimentação e o bem-estar dos seus amigos de
                forma prática e centralizada!
              </p>
              <v-btn class="primary-action" to="/cadastrar" @click="registrar()">
                Registrar!
              </v-btn>
              <div class="login-link mt-4">
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

          <!-- Layout Mobile -->
          <v-col
            v-else
            cols="12"
            class="setup-content-mobile"
          >
            <div>
              <h1 id="setup-title" class="setup-title-mobile">
                Perfil Personalizado de Pets
              </h1>
              <p class="setup-description-mobile">
                Organize e personalize o gerenciamento dos comedouros inteligentes dos seus pets no seu
                aplicativo. Crie perfis personalizados para cada animal, registrando informações como nome,
                raça e idade. Acompanhe a alimentação e o bem-estar dos seus amigos de forma prática e centralizada!
              </p>
              <v-btn class="primary-action-mobile" to="/cadastrar" @click="registrar()">
                Registrar!
              </v-btn>
              <div class="login-link-mobile mt-4">
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
export default {
  name: 'PaginaInicial',
  data() {
    return {
      isMobile: false,
    };
  },
  mounted() {
    this.checkMobile();
    window.addEventListener('resize', this.checkMobile);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.checkMobile);
  },
  methods: {
    checkMobile() {
      // Define o breakpoint para mobile (exemplo: 768px)
      this.isMobile = window.innerWidth <= 768;
    },
    registrar() {
      // Sua lógica para registro
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
  background-color: #272F3C;
}

.brand-logo {
  max-width: 200px;
  display: block;
  margin: 20px auto;
}

/* Estilo Desktop */
.setup-content {
  background: #39434f;
  margin-left: 650px;
  margin-top: 80px;
  padding: 40px;
  border-radius: 20px;
  text-align: center;
  box-shadow: 0 0 5px rgba(12, 26, 75, 0.08), 0 4px 20px -2px rgba(50, 50, 71, 0.04);
}

.setup-title {
  color: #fff;
  font-weight: 500;
  font-size: 27px;
  margin-bottom: 20px;
}

.setup-description {
  color: #d9dfe6;
  font-size: 15px;
  line-height: 1.5;
  margin-bottom: 30px;
  font-weight: 300;
}

.primary-action {
  margin-bottom: 10px;
  color: #fff;
  background-color: #1885F3;
  width: 100%;
  padding: 5px;
  border-radius: 10px;
}

/* Estilo Mobile */
.setup-content-mobile {
  background: #39434f;
  padding: 60px; /* Padding menor para mobile */
  margin: 80px;
  max-width: 350px;
  text-align: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.setup-title-mobile {
  color: #fff;
  font-weight: 500;
  font-size: 22px;
  margin-bottom: 15px;
}

.setup-description-mobile {
  color: #d9dfe6;
  font-size: 14px;
  line-height: 1.4;
  margin-bottom: 20px;
}

.primary-action-mobile {
  margin-bottom: 10px;
  color: #fff;
  background-color: #1885F3;
  width: 100%;
  padding: 8px;
  border-radius: 8px;
}

.login-link-mobile {
  margin-top: 10px;
}
</style>
