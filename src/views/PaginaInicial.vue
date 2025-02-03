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
        <img src="../assets//logo.svg"
          alt="Pet Profile Logo"
          class="brand-logo"
          max-height="200"
        />

        <v-row justify="center">
          <v-col cols="12" md="6" class="setup-content">
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
              <v-btn class="primary-action" to="/cadastrar" @click="registrar()">Registrar!</v-btn>
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
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'PaginaInicial',
  methods: {
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
  margin-top: 150px;
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
}

</style>
