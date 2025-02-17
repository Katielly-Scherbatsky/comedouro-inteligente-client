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

        <template v-else>
          <!-- Layout Desktop: Exibe 4 pets por vez -->
          <template v-if="!isMobile">
            <v-row justify="center">
              <v-col cols="12" class="setup-content">
                <h1 class="setup-title">Bem vindo!</h1>
                <p class="setup-description">
                  {{ !possuiPet
                    ? "Parece que você não tem nenhum perfil configurado no momento. Adicione seu pet agora."
                    : "Seus Pets e suas últimas atualizações:" }}
                </p>
                <!-- Caso não haja pets -->
                <v-img
                  v-if="!possuiPet"
                  src="/src/assets/petsa.png"
                  width="600"
                  height="300"
                />
                <v-btn v-if="!possuiPet" class="primary-action" @click="openModal()">
                  Clique aqui para adicionar um pet!
                </v-btn>

                <div v-if="possuiPet" class="slider-container">
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
                                {{ pet.tipo === 1 ? 'Gato' : pet.tipo === 2 ? 'Cachorro' : 'Desconhecido' }}
                              </p>
                              <p><strong>Idade:</strong> {{ pet.idade }} anos</p>
                              <p><strong>Peso:</strong> {{ pet.peso }} kg</p>
                            </v-card-text>
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
              </v-col>
            </v-row>
          </template>

          <!-- Layout Mobile: Exibe 1 pet por vez -->
          <template v-else>
            <v-row justify="center">
              <v-col cols="12" class="setup-content-mobile mt-12" style="padding-top: 60px;">
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

                <div v-if="possuiPet" class="slider-container-mobile">
                  <v-row align="center" justify="center">
                    <v-col cols="2" class="arrow-col">
                      <v-btn icon @click="prev" :disabled="currentIndex === 0">
                        <v-icon>mdi-chevron-left</v-icon>
                      </v-btn>
                    </v-col>
                    <v-col cols="8">
                      <v-card class="mx-auto" max-width="300">
                        <v-avatar size="30" class="mx-auto mt-4">
                          <v-icon x-large>
                            {{ currentPet.tipo === 1 ? 'mdi-cat' : currentPet.tipo === 2 ? 'mdi-dog' : 'mdi-help' }}
                          </v-icon>
                        </v-avatar>
                        <v-card-title>{{ currentPet.nome }}</v-card-title>
                        <v-card-subtitle>
                          {{ currentPet.raca || "Raça desconhecida" }}
                        </v-card-subtitle>
                        <v-card-text>
                          <p>
                            <strong>Tipo:</strong>
                            {{ currentPet.tipo === 1 ? 'Gato' : currentPet.tipo === 2 ? 'Cachorro' : 'Desconhecido' }}
                          </p>
                          <p><strong>Idade:</strong> {{ currentPet.idade }} anos</p>
                          <p><strong>Peso:</strong> {{ currentPet.peso }} kg</p>
                        </v-card-text>
                      </v-card>
                    </v-col>
                    <v-col cols="2" class="arrow-col">
                      <v-btn
                        icon
                        @click="next"
                        :disabled="currentIndex + visibleCountMobile >= pets.length"
                      >
                        <v-icon>mdi-chevron-right</v-icon>
                      </v-btn>
                    </v-col>
                  </v-row>
                </div>
              </v-col>
            </v-row>
          </template>
        </template>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { listarPet } from "./store/index.js";

export default {
  name: "PetSlider",
  data() {
    return {
      loading: true,
      pets: [],
      currentIndex: 0,
      isMobile: window.innerWidth <= 768,
    };
  },
  computed: {
    visibleCountDesktop() {
      return 4;
    },
    visibleCountMobile() {
      return 1;
    },
    visiblePets() {
      if (this.isMobile) {
        return this.pets.slice(this.currentIndex, this.currentIndex + 1);
      } else {
        return this.pets.slice(this.currentIndex, this.currentIndex + 4);
      }
    },
    currentPet() {
      return this.pets[this.currentIndex] || {};
    },
    possuiPet() {
      return this.pets.length > 0;
    },
  },
  async created() {
    try {
      const data = await listarPet();
      this.pets = data || [];
    } catch (error) {
      console.error("Erro ao carregar pets:", error);
    } finally {
      this.loading = false;
    }
  },
  mounted() {
    window.addEventListener("resize", this.checkMobile);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.checkMobile);
  },
  methods: {
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
    },
    checkMobile() {
      this.isMobile = window.innerWidth <= 768;
    },
  },
};
</script>

<style scoped>
/* Layout Desktop */
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

.v-card-title,
.v-card-subtitle,
.v-card-text p {
  color: #000;
}

/* Layout Mobile */
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

.v-img {
  display: block;
  margin: 20px auto;
}
</style>
