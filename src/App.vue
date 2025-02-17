<script setup lang="ts">
import PaginaInicial from '@/views/PaginaInicial.vue';
import { onMounted, onUpdated, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useDisplay } from "vuetify";
import PaginaCadastro from './views/PaginaCadastro.vue';
import PaginaComedouro from './views/PaginaComedouro.vue';
import PaginaConfiguracoes from './views/PaginaConfiguracoes.vue';
import PaginaFornecedores from './views/PaginaFornecedores.vue';
import PaginaHorarios from './views/PaginaHorarios.vue';
import PaginaLogin from './views/PaginaLogin.vue';
import PaginaPedidos from './views/PaginaPedidos.vue';
import PaginaPerfil from './views/PaginaPerfil.vue';
import PaginaPets from './views/PaginaPets.vue';
import PaginaPrincipal from './views/PaginaPrincipal.vue';

const route = useRoute()
const router = useRouter();
const { mobile } = useDisplay(); 
const isMobile = mobile;

const usuario = ref<string | null>(null);
const drawer = ref(!isMobile.value);

function getIniciais(nome: string): string {
  const nomes = nome.split(" ");
  const primeiraLetra = nomes[0] ? nomes[0][0] : "";
  const segundaLetra = nomes[1] ? nomes[1][0] : "";
  return (primeiraLetra + segundaLetra).toUpperCase();
}

function usuarioLogado() {
  const userData = localStorage.getItem("usuario");
  if (userData) {
    window.console.log(userData)
    usuario.value = JSON.parse(userData);
  } else {
    usuario.value = null;
  }
}

function deslogar() {
  localStorage.removeItem("usuario");
  localStorage.removeItem("token");
  usuario.value = null;
  router.push("/logar");
}

onMounted(() => {
  usuarioLogado();
});

onUpdated(() => {
  usuarioLogado();
});
</script>

<template>
  <PaginaInicial v-if="route.path === '/'" />
  <PaginaCadastro v-if="route.path === '/cadastrar'" />
  <PaginaLogin v-if="route.path === '/logar'" />

  <v-card v-if="route.path !== '/' && route.path !== '/cadastrar' && route.path !== '/logar'">
    <v-layout>
      <v-app-bar v-if="isMobile" style="background-color: #101113;">
        <v-app-bar-nav-icon style="color: white;" @click="drawer = !drawer"></v-app-bar-nav-icon>
        <v-toolbar-title style="color: white;">Menu</v-toolbar-title>
      </v-app-bar>

      <v-navigation-drawer
        v-model="drawer"
        style="background-color: #101113;"
        class="black"
        theme="dark"
        :permanent="!isMobile"
        :temporary="isMobile"
      >
        <v-list color="transparent">
          <v-btn height="45" width="100%" class="justify-start mb-2 elevation-0" style="background-color: #101113;" to="/pagina-principal">
            <v-list-item><img src="./assets//logo.png" height="30" alt=""></v-list-item>
          </v-btn>
        </v-list>
        <v-divider class="pt-2"></v-divider>

        <v-list color="transparent">
          <v-btn height="45" width="100%" class="justify-start mb-2 elevation-0" style="background-color: #101113;" to="/pets">
            <v-list-item prepend-icon="mdi-paw" title="Pets"></v-list-item>
          </v-btn>
          <v-btn height="45" width="100%" class="justify-start mb-2 elevation-0" style="background-color: #101113;" to="/comedouro">
            <v-list-item prepend-icon="mdi-food-takeout-box-outline" title="Comedouro"></v-list-item>
          </v-btn>
          <v-btn height="45" width="100%" class="justify-start mb-2 elevation-0" style="background-color: #101113;" to="/horarios">
            <v-list-item prepend-icon="mdi-alarm" title="Horários"></v-list-item>
          </v-btn>
          <!-- <v-btn height="45" width="100%" class="justify-start mb-2 elevation-0" style="background-color: #101113;" to="/pedidos">
            <v-list-item prepend-icon="mdi-cart-variant" title="Pedidos"></v-list-item>
          </v-btn> -->
          <v-btn height="45" width="100%" class="justify-start mb-2 elevation-0" style="background-color: #101113;" to="/fornecedores">
            <v-list-item prepend-icon="mdi-truck-fast-outline" title="Fornecedores"></v-list-item>
          </v-btn>
        </v-list>

        <v-divider class="py-2"></v-divider>

        <v-list color="transparent">
          <v-btn height="45" width="100%" class="justify-start mb-2 elevation-0" style="background-color: #101113;" to="/perfil">
            <v-list-item prepend-icon="mdi-account" title="Perfil"></v-list-item>
          </v-btn>
          <!-- <v-btn height="45" width="100%" class="justify-start mb-2 elevation-0" style="background-color: #101113;" to="/configuracoes">
            <v-list-item prepend-icon="mdi-cog" title="Configurações"></v-list-item>
          </v-btn> -->
        </v-list>

        <v-divider class="py-2"></v-divider>

        <template v-slot:append>
          <div class="text-center user-info">
            <v-avatar class="mr-2" color="primary">
              {{ usuario ? getIniciais(usuario.nome) : "U" }}
            </v-avatar>
            {{ usuario ? usuario.nome : 'Nome' }}
            <v-btn variant="text" icon="mdi-logout" @click="deslogar()"></v-btn>
          </div>
        </template>
      </v-navigation-drawer>
    </v-layout>

    <PaginaPrincipal v-if="route.path === '/pagina-principal'" />
    <PaginaPets v-if="route.path === '/pets'" />
    <PaginaHorarios v-if="route.path === '/horarios'" />
    <PaginaPedidos v-if="route.path === '/pedidos'" />
    <PaginaFornecedores v-if="route.path === '/fornecedores'" />
    <PaginaPerfil v-if="route.path === '/perfil'" />
    <PaginaConfiguracoes v-if="route.path === '/configuracoes'" />
    <PaginaComedouro v-if="route.path === '/comedouro'" />
  </v-card>
</template>

<style scoped>
.user-info {
  background-color: #606873;
  height: 60px;
  margin: 0 10px 15px 10px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
