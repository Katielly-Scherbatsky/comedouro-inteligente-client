<template>
  <v-app style="background-color: #101113;">
    <v-main>
      <v-container fluid>
        <template v-if="loading">
          <v-row justify="center">
            <v-col cols="12" class="setup-content">
              <v-progress-circular indeterminate color="primary"></v-progress-circular>
            </v-col>
          </v-row>
        </template>

        <template v-else>
          <!-- Layout Desktop -->
          <template v-if="!isMobile">
            <v-container v-if="!possuiPet">
              <v-row justify="center">
                <v-col cols="12" class="setup-content">
                  <h1 id="setup-title" class="setup-title">Pets</h1>
                  <p class="setup-description">
                    Parece que você não tem nenhum pet cadastrado no momento. Cadastre um pet agora.
                  </p>
                  <v-img src="/src/assets/petsa.png" width="600" height="300" />
                  <v-btn class="primary-action" @click="openModal()">
                    Clique aqui para cadastrar um pet!
                  </v-btn>
                </v-col>
              </v-row>
            </v-container>

            <v-container v-else class="pa-0">
              <v-row justify="center">
                <v-col cols="12" class="setup-content">
                  <h1 id="setup-title" class="setup-title">Pets</h1>

                  <!-- Slider Desktop -->
                  <div class="slider-container">
                    <v-row align="center" justify="center">
                      <v-col cols="1" class="arrow-col">
                        <v-btn icon @click="prev" :disabled="currentIndex === 0">
                          <v-icon>mdi-chevron-left</v-icon>
                        </v-btn>
                      </v-col>
                      <v-col cols="10">
                        <v-row>
                          <v-col
                            v-for="pet in visiblePets"
                            :key="pet.id"
                            cols="12"
                            sm="6"
                            md="3"
                          >
                            <v-card class="mx-auto" max-width="300">
                              <v-avatar size="30" class="mx-auto mt-4">
                                <v-icon x-large>
                                  {{ pet.tipo === 1 ? 'mdi-cat' : pet.tipo === 2 ? 'mdi-dog' : 'mdi-help' }}
                                </v-icon>
                              </v-avatar>
                              <v-card-title>{{ pet.nome }}</v-card-title>
                              <v-card-subtitle>
                                {{ pet.raca || "Raça desconhecida" }}
                              </v-card-subtitle>
                              <v-card-text>
                                <p>
                                  <strong>Tipo:</strong>
                                  {{ pet.tipo === 1 ? 'Gato' : 'Cachorro' }}
                                </p>
                                <p>
                                  <strong>Idade:</strong>
                                  {{ pet.idade }} {{ pet.idade === 1 ? 'ano' : 'anos' }}
                                </p>
                                <p><strong>Peso:</strong> {{ pet.peso }} kg</p>
                              </v-card-text>
                              <v-card-actions>
                                <v-btn color="primary" @click="editarPet(pet)" class="mx-auto">
                                  Ver detalhes
                                </v-btn>
                              </v-card-actions>
                            </v-card>
                          </v-col>
                        </v-row>
                      </v-col>
                      <v-col cols="1" class="arrow-col">
                        <v-btn
                          icon
                          @click="next"
                          :disabled="currentIndex + visibleCountDesktop >= pets.length"
                        >
                          <v-icon>mdi-chevron-right</v-icon>
                        </v-btn>
                      </v-col>
                    </v-row>
                  </div>

                  <v-btn class="primary-action" @click="openModal()">
                    Adicionar novo pet
                  </v-btn>
                </v-col>
              </v-row>
            </v-container>
          </template>

          <!-- Layout Mobile (mantém o que já existia) -->
          <template v-else>
            <v-container v-if="!possuiPet" style="padding: 0px !important; background: #39434f;">
              <v-row justify="center">
                <v-col cols="12" class="setup-content-mobile mt-12" style="padding-top: 60px;">
                  <h1 id="setup-title" class="setup-title-mobile">Pets</h1>
                  <p class="setup-description-mobile">
                    Parece que você não tem nenhum pet cadastrado no momento. Cadastre um pet agora.
                  </p>
                  <v-img src="/src/assets/petsa.png" width="100%" height="auto" />
                  <v-btn class="primary-action-mobile" height="60" width="350" @click="openModal()">
                    Clique aqui para<br> cadastrar um pet!
                  </v-btn>
                </v-col>
              </v-row>
            </v-container>

            <v-container v-else class="pa-0">
              <v-row justify="center">
                <v-col cols="12" class="setup-content-mobile mt-12" style="padding-top: 20px;">
                  <h1 id="setup-title" class="setup-title-mobile">Pets</h1>                  
                  <v-row>
                    <v-col v-for="pet in pets" :key="pet.id" cols="12">
                      <v-card class="mx-auto" max-width="300">
                        <v-avatar size="30" class="mx-auto mt-4">
                          <v-icon x-large>{{ pet.tipo === 1 ? 'mdi-cat' : 'mdi-dog' }}</v-icon>
                        </v-avatar>
                        <v-card-title>{{ pet.nome }}</v-card-title>
                        <v-card-subtitle>{{ pet.raca || "Raça desconhecida" }}</v-card-subtitle>
                        <v-card-text>
                          <p><strong>Tipo:</strong> {{ pet.tipo === 1 ? 'Gato' : 'Cachorro' }}</p>
                          <p>
                            <strong>Idade:</strong>
                            {{ pet.idade }} {{ pet.idade === 1 ? 'ano' : 'anos' }}
                          </p>
                          <p><strong>Peso:</strong> {{ pet.peso }} kg</p>
                        </v-card-text>
                        <v-card-actions>
                          <v-btn color="primary" @click="editarPet(pet)" class="mx-auto">
                            Ver detalhes
                          </v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-col>
                  </v-row>
                  
                  <v-btn class="primary-action-mobile" width="300" @click="openModal()">
                    Adicionar novo pet
                  </v-btn>
                </v-col>
              </v-row>
            </v-container>
          </template>
        </template>

        <modal
          :value="modalVisible"
          @input="modalVisible = $event"
          @save="salvarPet()"
          :title="editando ? 'Editar Pet' : 'Insira os dados do pet'"
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
                <v-text-field v-model="raca" label="Raça" required clearable variant="outlined" />
              </v-col>
              <v-col cols="6">
                <v-text-field v-model="idade" label="Idade" required clearable variant="outlined" />
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
            <v-btn v-if="editando" color="red" class="mt-4" @click="excluirPet()">
              Excluir Pet
            </v-btn>
          </v-form>
        </modal>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import modal from '@/components/modal.vue';
import { atualizarPet, cadastrarPet, excluirPet, listarPet, obterUsuario } from "./store/index.js";

export default {
  name: 'PaginaPets',
  components: { modal },
  data() {
    return {
      usuarioId: obterUsuario(),
      modalVisible: false,
      possuiPet: false,
      pets: [],
      nome: '',
      raca: '',
      idade: '',
      peso: '',
      tipo: '',
      editando: false,
      petAtual: null,
      nomeRules: [(v) => !!v || 'Nome é obrigatório'],
      loading: true,
      valid: false,
      currentIndex: 0,
      visibleCountDesktop: 4,
      visibleCountMobile: 1,
      isMobile: window.innerWidth <= 768
    };
  },
  computed: {
    visiblePets() {
      return this.pets.slice(this.currentIndex, this.currentIndex + this.visibleCountDesktop);
    },
    currentPet() {
      return this.pets[this.currentIndex] || {};
    }
  },
  created() {
    this.loadPets();
  },
  mounted() {
    window.addEventListener("resize", this.checkMobile);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.checkMobile);
  },
  methods: {
    async loadPets() {
      const petsUsuario = await listarPet();
      if (petsUsuario.length) {
        this.possuiPet = true;
        this.pets = petsUsuario;
      }
      this.loading = false;
    },
    checkMobile() {
      this.isMobile = window.innerWidth <= 768;
    },
    openModal() {
      this.editando = false;
      this.modalVisible = true;
      this.nome = '';
      this.raca = '';
      this.idade = '';
      this.peso = '';
      this.tipo = '';
    },
    editarPet(pet) {
      this.editando = true;
      this.petAtual = pet;
      this.modalVisible = true;
      this.nome = pet.nome;
      this.raca = pet.raca;
      this.idade = pet.idade.toString();
      this.peso = pet.peso.toString();
      this.tipo = pet.tipo;
    },
    async salvarPet() {
      const form = this.$refs.form;
      const isValid = form.validate();
      if (!isValid.errors) {
        try {
          const tipoValue = this.tipo === 'Gato' ? 1 : 2;
          if (this.editando) {
            await atualizarPet(
              this.petAtual.id,
              this.nome,
              this.raca,
              Number(this.idade),
              Number(this.peso),
              tipoValue,
              this.usuarioId.id
            );
            Object.assign(this.petAtual, {
              nome: this.nome,
              raca: this.raca,
              idade: Number(this.idade),
              peso: Number(this.peso),
              tipo: tipoValue,
              usuarioId: this.usuarioId.id,
            });
          } else {
            const result = await cadastrarPet(
              this.nome,
              this.raca,
              Number(this.idade),
              Number(this.peso),
              tipoValue,
              this.usuarioId.id
            );
            if (result) {
              this.pets.push({
                id: result.id,
                nome: this.nome,
                raca: this.raca,
                idade: Number(this.idade),
                peso: Number(this.peso),
                tipo: tipoValue,
                usuarioId: this.usuarioId.id,
              });
              this.possuiPet = true;
            }
          }
          this.modalVisible = false;
        } catch (error) {
          console.error("Erro ao salvar pet:", error);
        }
      }
    },
    async excluirPet() {
      if (this.petAtual) {
        try {
          await excluirPet(this.petAtual.id);
          this.pets = this.pets.filter(pet => pet.id !== this.petAtual.id);
          this.modalVisible = false;
          const petsUsuario = await listarPet();
          if (petsUsuario.length) {
            this.possuiPet = true;
            this.pets = petsUsuario;
          }
        } catch (error) {
          console.error("Erro ao excluir pet:", error);
        }
      }
    },
    next() {
      if (this.isMobile) {
        if (this.currentIndex < this.pets.length - 1) {
          this.currentIndex++;
        }
      } else {
        if (this.currentIndex + this.visibleCountDesktop < this.pets.length) {
          this.currentIndex += this.visibleCountDesktop;
        }
      }
    },
    prev() {
      if (this.isMobile) {
        if (this.currentIndex > 0) {
          this.currentIndex--;
        }
      } else {
        if (this.currentIndex - this.visibleCountDesktop >= 0) {
          this.currentIndex -= this.visibleCountDesktop;
        } else {
          this.currentIndex = 0;
        }
      }
    }
  }
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
  border-radius: 10px;
  text-align: center;
  padding: 40px;
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

.primary-action {
  margin-top: 20px;
  background-color: #1885F3;
  color: #fff;
  width: 50%;
  padding: 10px;
  border-radius: 10px;
}

.arrow-col {
  display: flex;
  justify-content: center;
  align-items: center;
}

.slider-container {
  margin-top: 20px;
}

.v-card-title,
.v-card-subtitle,
.v-card-text p {
  color: #000;
}

.v-img {
  display: block;
  margin: 20px auto;
}

/* Estilos para Mobile */
.setup-content-mobile {
  background: #39434f;
  padding: 20px;
  text-align: center;
  width: 95%;
  margin: 20px auto;
  border-radius: 10px;
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

.primary-action-mobile {
  margin-top: 15px;
  background-color: #1885F3;
  color: #fff;
  width: 100%;
  padding: 10px;
  border-radius: 10px;
}
</style>
