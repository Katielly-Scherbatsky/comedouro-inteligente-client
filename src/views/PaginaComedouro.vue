<template>
  <v-app style="background-color: #101113;">
    <v-main>
      <v-container fluid>
        <!-- Verificação de carregamento -->
        <template v-if="loading">
          <v-row justify="center">
            <v-col cols="12" class="setup-content">
              <v-progress-circular indeterminate color="primary"></v-progress-circular>
            </v-col>
          </v-row>
        </template>

        <!-- Layout Desktop -->
        <template v-else-if="!isMobile">
          <v-container v-if="!possuiPet">
            <v-row justify="center">
              <v-col cols="12" class="setup-content">
                <h1 id="setup-title" class="setup-title">Pets cadastrados!</h1>
                <p class="setup-description">
                  Parece que você não tem nenhum pet cadastrado no momento. Cadastre um pet agora.
                </p>
                <v-img src="/src/assets/petsa.png" width="600" height="300" />
                <v-btn class="primary-action" @click="openModal()">Clique aqui para cadastrar um pet!</v-btn>
              </v-col>
            </v-row>
          </v-container>
          
          <v-container v-else class="pa-0">
            <v-row justify="center">
              <v-col cols="12" class="setup-content">
                <h1 id="setup-title" class="setup-title">Pets cadastrados!</h1>
                <p class="setup-description">Seus Pets:</p>
                
                <v-row>
                  <v-col v-for="pet in pets" :key="pet.id" cols="12" sm="6" md="4" lg="3">
                    <v-card class="mx-auto" max-width="300">
                      <v-avatar size="30" class="mx-auto mt-4">
                        <v-icon x-large>{{ pet.tipo === 1 ? 'mdi-cat' : 'mdi-dog' }}</v-icon>
                      </v-avatar>
                      <v-card-title>{{ pet.nome }}</v-card-title>
                      <v-card-subtitle>{{ pet.raca || "Raça desconhecida" }}</v-card-subtitle>
                      <v-card-text>
                        <p><strong>Tipo:</strong> {{ pet.tipo === 1 ? 'Gato' : 'Cachorro' }}</p>
                        <p><strong>Idade:</strong> {{ pet.idade }} {{ pet.idade === 1 ? 'ano' : 'anos' }}</p>
                        <p><strong>Peso:</strong> {{ pet.peso }} kg</p>
                      </v-card-text>
                      <v-card-actions>
                        <v-btn color="primary" @click="editarPet(pet)" class="mx-auto">Ver detalhes</v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-col>
                </v-row>
                
                <v-btn class="primary-action" @click="openModal()">Adicionar novo pet</v-btn>
              </v-col>
            </v-row>
          </v-container>
        </template>

        <!-- Layout Mobile -->
        <template v-else>
          <v-container v-if="!possuiPet" style="padding: 0px !important;">
            <v-row justify="center">
              <v-col cols="12" class="setup-content-mobile mt-12">
                <h1 id="setup-title" class="setup-title-mobile">Pets cadastrados!</h1>
                <p class="setup-description-mobile">
                  Parece que você não tem nenhum pet cadastrado no momento. Cadastre um pet agora.
                </p>
                <v-img src="/src/assets/petsa.png" width="100%" height="auto" />
                <v-btn class="primary-action-mobile" height="60"  width="350" @click="openModal()">
                  Clique aqui para<br> cadastrar um pet!
                </v-btn>
              </v-col>
            </v-row>
          </v-container>
          
          <v-container v-else class="pa-0">
            <v-row justify="center">
              <v-col cols="12" class="setup-content-mobile mt-12">
                <h1 id="setup-title" class="setup-title-mobile">Pets cadastrados!</h1>
                <p class="setup-description-mobile">Seus Pets:</p>
                
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
                        <p><strong>Idade:</strong> {{ pet.idade }} {{ pet.idade === 1 ? 'ano' : 'anos' }}</p>
                        <p><strong>Peso:</strong> {{ pet.peso }} kg</p>
                      </v-card-text>
                      <v-card-actions>
                        <v-btn color="primary" @click="editarPet(pet)" class="mx-auto">Ver detalhes</v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-col>
                </v-row>
                
                <v-btn class="primary-action-mobile" width="300" @click="openModal()">Adicionar novo pet</v-btn>
              </v-col>
            </v-row>
          </v-container>
        </template>

        <!-- Modal (Comum para Desktop e Mobile) -->
        <modal
          :value="modalVisible"
          @input="modalVisible = $event"
          @save="salvarPet()"
          :title="editando ? 'Editar Pet' : 'Insira os dados do pet'"
        >
          <v-form ref="form" v-model="valid">
            <v-row dense class="mt-4">
              <v-col cols="12">
                <v-text-field v-model="nome" label="Nome" required :rules="nomeRules" clearable variant="outlined" />
              </v-col>
              <v-col cols="6">
                <v-select v-model="tipo" :items="['Gato', 'Cachorro']" label="Tipo" required clearable variant="outlined" />
              </v-col>
              <v-col cols="6">
                <v-text-field v-model="raca" label="Raça" required clearable variant="outlined" />
              </v-col>
              <v-col cols="6">
                <v-text-field v-model="idade" label="Idade" required clearable variant="outlined" />
              </v-col>
              <v-col cols="6">
                <v-text-field v-model="peso" label="Peso" required clearable variant="outlined" type="number" step="0.01" />
              </v-col>
            </v-row>
            <v-btn v-if="editando" color="red" class="mt-4" @click="excluirPet()">Excluir Pet</v-btn>
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
  name: 'PaginaComedouro',
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
      isMobile: false, // Flag para verificar se é mobile
      loading: true, // Flag de carregamento
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
    this.loading = false; // Finaliza o carregamento
  },
  methods: {
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
    checkMobile() {
      this.isMobile = window.innerWidth <= 768; // Define 768px como o breakpoint para mobile
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
  font-weight: medium;
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
/* Remova position: absolute e a altura fixa para permitir o scroll */
.setup-content-mobile {
  background: #39434f;
  padding: 20px;
  text-align: center;
  width: 100%;
  margin: 16px auto;
  height: 100vh;
}

.setup-title-mobile {
  color: #fff;
  font-weight: medium;
  font-size: 24px;
  margin-bottom: 20px;
  margin-top: 20px;
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
