<template>
  <v-app style="background-color: #101113;">
    <v-main>
      <v-container fluid class="pa-0">
        <!-- Versão Desktop -->
        <template v-if="!isMobile">
          <v-row justify="center">
            <v-col cols="12" class="setup-content">
              <v-avatar class="avatar" size="100">
                <span>{{ avatarInitials }}</span>
              </v-avatar>
              <h1 id="setup-title" class="setup-title">Perfil do Usuário</h1>
              <p class="setup-description">Veja suas informações abaixo</p>
              <v-card class="profile-card">
                <v-card-text>
                  <p><strong>Nome:</strong> {{ usuario.nome }}</p>
                  <p><strong>Email:</strong> {{ usuario.email }}</p>
                </v-card-text>
              </v-card>
              <v-btn class="primary-action" @click="openModal">Editar Perfil</v-btn>
            </v-col>
          </v-row>
        </template>

        <!-- Versão Mobile -->
        <template v-else>
          <v-row justify="center">
            <v-col cols="12" class="setup-content-mobile">
              <v-avatar class="avatar mt-12" size="80">
                <span>{{ avatarInitials }}</span>
              </v-avatar>
              <h1 id="setup-title" class="setup-title-mobile">Perfil do Usuário</h1>
              <p class="setup-description-mobile">Veja suas informações abaixo</p>
              <v-card class="profile-card-mobile">
                <v-card-text>
                  <p><strong>Nome:</strong> {{ usuario.nome }}</p>
                  <p><strong>Email:</strong> {{ usuario.email }}</p>
                </v-card-text>
              </v-card>
              <v-btn class="primary-action-mobile"  width="300" @click="openModal">Editar Perfil</v-btn>
            </v-col>
          </v-row>
        </template>
      </v-container>

      <!-- Modal para editar o perfil -->
      <modal :value="modalVisible" @input="modalVisible = $event" @save="salvarPerfil()" title="Editar Perfil">
        <v-form ref="form" v-model="valid">
          <v-text-field v-model="usuario.nome" label="Nome" required clearable variant="outlined" />
          <v-text-field v-model="usuario.email" label="E-mail" required clearable variant="outlined" />
        </v-form>
      </modal>
    </v-main>
  </v-app>
</template>

<script>
import modal from '@/components/modal.vue';
import { obterUsuario, atualizarUsuario } from "./store/index.js";

export default {
  name: 'PaginaPerfil',
  components: { modal },
  data() {
    return {
      usuario: {
        nome: '',
        email: '',
      },
      modalVisible: false,
      valid: false,
      isMobile: window.innerWidth <= 768,
    };
  },
  async created() {
    this.usuario = await obterUsuario();
  },
  mounted() {
    window.addEventListener('resize', this.checkMobile);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.checkMobile);
  },
  methods: {
    openModal() {
      this.modalVisible = true;
    },
    async salvarPerfil() {
      const form = this.$refs.form;
      const isValid = form.validate();

      if (!isValid.errors) {
        try {
          await atualizarUsuario(this.usuario.id, this.usuario.nome, this.usuario.email);
          this.modalVisible = false;
        } catch (error) {
          console.error("Erro ao atualizar perfil:", error);
        }
      }
    },
    checkMobile() {
      this.isMobile = window.innerWidth <= 768;
    },
  },
  computed: {
    avatarInitials() {
      if (!this.usuario.nome) return '';
      const nomes = this.usuario.nome.split(' ');
      const iniciais = nomes.map(n => n.charAt(0)).join('');
      return iniciais.toUpperCase();
    },
  },
};
</script>

<style scoped>
/* Versão Desktop */
.setup-content {
  background: #39434f;
  position: absolute;
  inset: 0;
  height: 95%;
  width: 77%;
  margin-top: 15px;
  margin-left: 280px;
  border-radius: 10px;
  text-align: center;
  padding: 40px;
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
  font-weight: 100;
}

.profile-card {
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
  padding: 15px;
  border-radius: 10px;
  text-align: left;
  width: 80%;
  margin: 20px auto;
}

.primary-action {
  margin-top: 20px;
  background-color: #1885F3;
  color: #fff;
  width: 50%;
  padding: 10px;
  border-radius: 10px;
}

/* Avatar (pode ser usado em ambas as versões) */
.avatar {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #1885F3;
  color: #fff;
  border-radius: 50%;
  margin: 0 auto 20px;
  font-size: 1.5rem;
  font-weight: bold;
}

/* Versão Mobile */
.setup-content-mobile {
  background: #39434f;
  padding: 20px;
  text-align: center;
  width: 95%;
  margin: 20px auto;
  border-radius: 10px;
  height: 100vh;
}

.setup-title-mobile {
  color: #fff;
  font-weight: 500;
  font-size: 24px;
  margin-bottom: 15px;
}

.setup-description-mobile {
  color: #d9dfe6;
  font-size: 14px;
  line-height: 1.5;
  margin-bottom: 20px;
  font-weight: 100;
}

.profile-card-mobile {
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
  padding: 10px;
  border-radius: 10px;
  text-align: left;
  width: 80%;
  margin: 15px auto;
}

.primary-action-mobile {
  margin-top: 15px;
  background-color: #1885F3;
  color: #fff;
  width: 100%;
  padding: 10px;
  border-radius: 10px;
}
</style>
