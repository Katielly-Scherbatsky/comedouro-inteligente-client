<template>
  <v-app style="background-color: #101113;">
    <v-main>
      <v-container fluid class="pa-0">
        <template v-if="loading">
          <v-row justify="center">
            <v-col cols="12" class="setup-content">
              <v-progress-circular indeterminate color="primary" />
            </v-col>
          </v-row>
        </template>

        <!-- Layout Desktop -->
        <template v-else-if="!isMobile">
          <v-row justify="center">
            <v-col cols="12" class="setup-content">
              <h1 class="setup-title">Bem vindo!</h1>
              <p class="setup-description">
                {{ !possuiPet
                  ? "Parece que você não tem nenhum perfil configurado no momento. Adicione seu pet agora."
                  : "Seus Pets e suas últimas atualizações:" }}
              </p>
              <v-img v-if="!possuiPet" src="/src/assets/petsa.png" width="600" height="300" />
              <v-btn
                v-if="!possuiPet"
                class="primary-action"
                @click="openModal()"
              >
                Clique aqui para adicionar um pet!
              </v-btn>

              <v-row v-if="possuiPet">
                <v-col
                  v-for="pet in pets"
                  :key="pet.id"
                  cols="12"
                  sm="6"
                  md="4"
                  lg="3"
                >
                  <v-card class="mx-auto" max-width="300">
                    <v-avatar size="30" class="mx-auto mt-4">
                      <v-icon x-large>
                        {{ pet.tipo === 1 ? 'mdi-cat' : pet.tipo === 2 ? 'mdi-dog' : 'Desconhecido' }}
                      </v-icon>
                    </v-avatar>
                    <v-card-title>{{ pet.nome }}</v-card-title>
                    <v-card-subtitle>
                      {{ pet.raca || "Raça desconhecida" }}
                    </v-card-subtitle>
                    <v-card-text>
                      <p>
                        <strong>Tipo:</strong>
                        {{ pet.tipo === 1 ? 'Gato' : pet.tipo === 2 ? 'Cachorro' : 'Desconhecido' }}
                      </p>
                      <p><strong>Idade:</strong> {{ pet.idade }} anos</p>
                      <p><strong>Peso:</strong> {{ pet.peso }} kg</p>
                    </v-card-text>
                  </v-card>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </template>

        <!-- Layout Mobile -->
        <template v-else>
          <v-row justify="center">
            <v-col cols="12" class="setup-content-mobile mt-12">
              <h1 class="setup-title-mobile">Bem vindo!</h1>
              <p class="setup-description-mobile">
                {{ !possuiPet
                  ? "Parece que você não tem nenhum perfil configurado no momento. Adicione seu pet agora."
                  : "Seus Pets e suas últimas atualizações:" }}
              </p>
              <v-img
                v-if="!possuiPet"
                src="/src/assets/petsa.png"
                width="100%"
                height="auto"
              />
              <v-btn
                v-if="!possuiPet"
                class="primary-action-mobile"
                height="60"
                width="350"
                @click="openModal()"
              >
                Clique aqui para<br> adicionar um pet!
              </v-btn>

              <v-row v-if="possuiPet">
                <v-col v-for="pet in pets" :key="pet.id" cols="12">
                  <v-card class="mx-auto" max-width="300">
                    <v-avatar size="30" class="mx-auto mt-4">
                      <v-icon x-large>
                        {{ pet.tipo === 1 ? 'mdi-cat' : 'mdi-dog' }}
                      </v-icon>
                    </v-avatar>
                    <v-card-title>{{ pet.nome }}</v-card-title>
                    <v-card-subtitle>
                      {{ pet.raca || "Raça desconhecida" }}
                    </v-card-subtitle>
                    <v-card-text>
                      <p>
                        <strong>Tipo:</strong>
                        {{ pet.tipo === 1 ? 'Gato' : pet.tipo === 2 ? 'Cachorro' : 'Desconhecido' }}
                      </p>
                      <p><strong>Idade:</strong> {{ pet.idade }} anos</p>
                      <p><strong>Peso:</strong> {{ pet.peso }} kg</p>
                    </v-card-text>
                  </v-card>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </template>

        <modal
          :value="modalVisible"
          @input="modalVisible = $event"
          @save="salvarPet()"
          title="Insira os dados do pet"
        >
          <v-form ref="form" v-model="valid">
            <v-row dense class="mt-4">
              <v-col cols="12">
                <v-text-field
                  v-model="nome"
                  label="Nome"
                  required
                  :rules="nomeRules"
                  clearable
                  variant="outlined"
                />
              </v-col>
              <v-col cols="6">
                <v-select
                  v-model="tipo"
                  :items="['Gato', 'Cachorro']"
                  label="Tipo"
                  required
                  clearable
                  variant="outlined"
                />
              </v-col>
              <v-col cols="6">
                <v-text-field
                  v-model="raca"
                  label="Raça"
                  required
                  clearable
                  variant="outlined"
                />
              </v-col>
              <v-col cols="6">
                <v-text-field
                  v-model="idade"
                  label="Idade"
                  required
                  clearable
                  variant="outlined"
                />
              </v-col>
              <v-col cols="6">
                <v-text-field
                  v-model="peso"
                  label="Peso"
                  required
                  clearable
                  variant="outlined"
                  type="number"
                  step="0.01"
                />
              </v-col>
            </v-row>
          </v-form>
        </modal>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import modal from '@/components/modal.vue';
import { cadastrarPet, listarPet, obterUsuario } from "./store/index.js";

export default {
  name: 'PaginaPrincipal',
  components: {
    modal,
  },
  data() {
    return {
      nome: null,
      raca: null,
      idade: null,
      peso: null,
      tipo: null,
      usuarioId: obterUsuario(),
      modalVisible: false,
      possuiPet: false,
      pets: [],
      isMobile: false,
      loading: true,
      nomeRules: [(v) => !!v || 'Nome é obrigatório'],
      valid: false,
    };
  },
  async created() {
    this.checkMobile();
    window.addEventListener('resize', this.checkMobile);
    const petsUsuario = await listarPet();
    if (petsUsuario.length) {
      this.possuiPet = true;
      this.pets = petsUsuario;
    }
    this.loading = false;
  },
  methods: {
    openModal() {
      this.modalVisible = true;
    },
    async salvarPet() {
      const form = this.$refs.form;
      console.log("Validando formulário...");
      const isValid = form.validate();
      console.log("Resultado da validação:", isValid);
      if (!isValid.errors) {
        try {
          const tipoPet =
            this.tipo === 'Gato'
              ? 1
              : this.tipo === 'Cachorro'
              ? 2
              : null;
          const result = await cadastrarPet(
            this.nome,
            this.raca,
            Number(this.idade),
            Number(this.peso),
            tipoPet,
            this.usuarioId.id
          );
          if (result) {
            this.$router.push("/pets");
          } else {
            console.error("Erro ao realizar cadastro no backend.");
          }
        } catch (error) {
          console.error("Erro ao realizar cadastro:", error);
        }
      }
    },
    checkMobile() {
      this.isMobile = window.innerWidth <= 768;
    },
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.checkMobile);
  },
};
</script>

<style scoped>
/* Estilos para Desktop */
.setup-content {
  background: #39434f;
  position: absolute;
  inset: 0;
  height: 95%;
  width: 77%;
  margin-top: 15px;
  margin-left: 280px;
  object-fit: cover;
  object-position: center;
  border-radius: 10px;
  text-align: center;
}

.setup-title {
  color: #fff;
  font-weight: 500;
  font-size: 27px;
  margin-bottom: 20px;
  margin-top: 40px;
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
  background-color: #1885F3;
  width: 50%;
  padding: 5px;
  border-radius: 10px;
  margin-top: 20px;
}

/* Estilos para Mobile */
.setup-content-mobile {
  background: #39434f;
  padding: 20px;
  text-align: center;
  width: 100%;
  margin: 0;
  height: 100vh;
}

.setup-title-mobile {
  color: #fff;
  font-weight: 500;
  font-size: 24px;
  margin: 20px 0 20px;
}

.setup-description-mobile {
  color: #d9dfe6;
  font-size: 14px;
  line-height: 1.5;
  margin-bottom: 20px;
  font-weight: 100;
}

.primary-action-mobile {
  margin-bottom: 10px;
  color: #fff;
  background-color: #1885F3;
  width: 100%;
  padding: 10px;
  border-radius: 10px;
  margin-top: 20px;
}

.v-img {
  display: block;
  margin: 20px auto;
}
</style>
