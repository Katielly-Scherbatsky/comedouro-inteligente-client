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
          <v-row justify="center">
          <v-col cols="12" md="6" class="setup-content">
            <div>
              <h1 id="setup-title" class="setup-title">
                Página Não Encontrada
              </h1>
              <v-btn class="primary-action" to="/logar">Logar!</v-btn>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'PaginaNaoEncontrada',
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

.setup-content {
  background: #39434f;
  margin-left: 650px;
  margin-top: 90px;
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

.primary-action {
  margin-bottom: 10px;
  color: #fff;
  background-color:  #1885F3;
  width: 100%;
  padding: 5px;
  border-radius: 10px;
  margin-top: 20px;
}
</style>
