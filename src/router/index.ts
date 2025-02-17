import PaginaCadastro from "@/views/PaginaCadastro.vue";
import PaginaInicial from "@/views/PaginaInicial.vue";
import PaginaLogin from "@/views/PaginaLogin.vue";
import PaginaPrincipal from "@/views/PaginaPrincipal.vue";
import { createRouter, createWebHistory } from "vue-router";
import PaginaConfiguracoes from "../views/PaginaConfiguracoes.vue";
import PaginaFornecedores from "../views/PaginaFornecedores.vue";
import PaginaHorarios from "../views/PaginaHorarios.vue";
import PaginaNaoEncontrada from "../views/PaginaNaoEncontrada.vue";
import PaginaPedidos from "../views/PaginaPedidos.vue";
import PaginaPerfil from "../views/PaginaPerfil.vue";
import PaginaPets from "../views/PaginaPets.vue";
import PaginaComedouro from "../views/PaginaComedouro.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "PaginaInicial",
      component: PaginaInicial,
    },
    {
      path: "/cadastrar",
      name: "PaginaCadastro",
      component: PaginaCadastro,
    },
    {
      path: "/logar",
      name: "PaginaLogin",
      component: PaginaLogin,
    },
    {
      path: "/pagina-principal",
      name: "PaginaPrincipal",
      component: PaginaPrincipal,
      meta: { requiresAuth: true },
    },
    {
      path: "/404",
      name: "PaginaNaoEncontrada",
      component: PaginaNaoEncontrada,
    },
    {
      path: "/horarios",
      name: "Horarios",
      component: PaginaHorarios,
    },
    {
      path: "/pedidos",
      name: "Pedidos",
      component: PaginaPedidos,
    },
    {
      path: "/fornecedores",
      name: "Fornecedores",
      component: PaginaFornecedores,
    },
    {
      path: "/perfil",
      name: "Perfil",
      component: PaginaPerfil,
    },
    {
      path: "/configucacoes",
      name: "Configurações",
      component: PaginaConfiguracoes,
    },
    {
      path: "/pets",
      name: "Pets",
      component: PaginaPets,
    },
    {
      path: "/comedouro",
      name: "Comedouro",
      component: PaginaComedouro,
    },
  ],
});

// router.beforeEach((to, from, next) => {
//   const token = localStorage.getItem("token");

//   if (to.matched.some((record) => record.meta.requiresAuth)) {
//     if (!token) {
//       next({ name: "PaginaNaoEncontrada" });
//     } else {
//       next();
//     }
//   } else {
//     next();
//   }
// });

export default router;
