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

        <!-- Layout Desktop -->
        <template v-else-if="!isMobile">
          <!-- Se não houver comedouros vinculados -->
          <v-container v-if="comedouros.length === 0">
            <v-row justify="center">
              <v-col cols="12" class="setup-content">
                <h1 id="setup-title" class="setup-title">Comedouros</h1>
                <p class="setup-description">
                  Parece que você não tem nenhum comedouro vinculado no momento. Vincule um comedouro agora.
                </p>
                <v-img src="/src/assets/pedidos.png" width="600" height="300" />
                <v-btn class="primary-action" @click="vincularComedouro">
                  Clique aqui para vincular um comedouro!
                </v-btn>
              </v-col>
            </v-row>
          </v-container>

          <!-- Se houver comedouros vinculados, exibe cada um em um card com slider -->
          <v-container v-else class="pa-0">
            <v-row justify="center">
              <v-col cols="12" class="setup-content">
                <h1 id="setup-title" class="setup-title">Comedouros</h1>
                
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
                          v-for="comedouro in visibleComedouros"
                          :key="comedouro.id"
                          cols="12"
                          sm="6"
                          md="4"
                          lg="4"
                        >
                          <v-card class="mx-auto" max-width="400">
                            <!-- Desenho do comedouro -->
                            <div class="comedouro-drawing">
                              <div class="comedouro">
                                <div class="racao" :style="{ height: getFillHeight(comedouro) }"></div>
                                <div class="gaveta" :class="{ aberta: comedouro.situacaoTampa === 1 }"></div>
                              </div>
                            </div>
                            <v-card-title>{{ comedouro.nome }}</v-card-title>
                            <v-card-subtitle>
                              {{ comedouro.status === 1 ? 'Ativo' : 'Desativado' }}
                            </v-card-subtitle>
                            <v-card-text>
                              <p>
                                <strong>Gaveta:</strong>
                                {{ comedouro.situacaoTampa === 1 ? 'Aberta' : 'Fechada' }}
                              </p>
                              <p><strong>Ração:</strong> {{ comedouro.statusRacao }}%</p>
                            </v-card-text>
                          </v-card>
                        </v-col>
                      </v-row>
                    </v-col>
                    <v-col cols="1" class="arrow-col">
                      <v-btn
                        icon
                        @click="next"
                        :disabled="currentIndex + visibleCountDesktop >= comedouros.length"
                      >
                        <v-icon>mdi-chevron-right</v-icon>
                      </v-btn>
                    </v-col>
                  </v-row>
                </div>

                <v-btn class="primary-action" @click="vincularComedouro">
                  Vincular novo comedouro
                </v-btn>
              </v-col>
            </v-row>
          </v-container>
        </template>

        <!-- Layout Mobile -->
        <template v-else>
          <!-- Se não houver comedouros vinculados -->
          <v-container v-if="comedouros.length === 0" style="padding: 0px !important;">
            <v-row justify="center">
              <v-col cols="12" class="setup-content-mobile mt-12" style="padding-top: 60px;">
                <h1 id="setup-title" class="setup-title-mobile">Comedouros</h1>
                <p class="setup-description-mobile">
                  Parece que você não tem nenhum comedouro vinculado no momento. Vincule um comedouro agora.
                </p>
                <v-img src="/src/assets/comedouro_nao_vinculado.png" width="100%" height="auto" />
                <v-btn class="primary-action-mobile" height="60" width="350" @click="vincularComedouro">
                  Clique aqui para<br> vincular um comedouro!
                </v-btn>
              </v-col>
            </v-row>
          </v-container>

          <!-- Se houver comedouros vinculados, exibe cada um em um card -->
          <v-container v-else class="pa-0">
            <v-row justify="center">
              <v-col cols="12" class="setup-content-mobile mt-12" style="padding-top: 20px;">
                <h1 id="setup-title" class="setup-title-mobile">Comedouros</h1>
                <v-row>
                  <v-col v-for="comedouro in comedouros" :key="comedouro.id" cols="12">
                    <v-card class="mx-auto" max-width="350">
                      <div class="comedouro-drawing">
                        <div class="comedouro">
                          <div class="racao" :style="{ height: getFillHeight(comedouro) }"></div>
                          <div class="gaveta" :class="{ aberta: comedouro.situacaoTampa === 1 }"></div>
                        </div>
                      </div>
                      <v-card-title>{{ comedouro.nome }}</v-card-title>
                      <v-card-subtitle>
                        {{ comedouro.status === 1 ? 'Ativo' : 'Desativado' }}
                      </v-card-subtitle>
                      <v-card-text>
                        <p>
                          <strong>Gaveta:</strong>
                          {{ comedouro.situacaoTampa === 1 ? 'Aberta' : 'Fechada' }}
                        </p>
                        <p><strong>Ração:</strong> {{ comedouro.statusRacao }}%</p>
                      </v-card-text>
                    </v-card>
                  </v-col>
                </v-row>
                <v-btn class="primary-action-mobile" width="300" @click="vincularComedouro">
                  Vincular novo comedouro
                </v-btn>
              </v-col>
            </v-row>
          </v-container>
        </template>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { obterComedouro } from "./store/index.js";

export default {
  name: "PaginaComedouro",
  data() {
    return {
      loading: true,
      comedouros: [],
      isMobile: window.innerWidth <= 768,
      currentIndex: 0,
      visibleCountDesktop: 3,
    };
  },
  async created() {
    try {
      const data = await obterComedouro();
      this.comedouros = data || [];
    } catch (error) {
      console.error("Erro ao carregar dados dos comedouros:", error);
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
  computed: {
    visibleComedouros() {
      return this.comedouros.slice(
        this.currentIndex,
        this.currentIndex + this.visibleCountDesktop
      );
    },
  },
  methods: {
    vincularComedouro() {
      // Implemente a lógica para vincular um comedouro, por exemplo, redirecionar ou abrir um modal.
      console.log("Vincular comedouro acionado");
    },
    checkMobile() {
      this.isMobile = window.innerWidth <= 768;
    },
    getFillHeight(com) {
      const maxHeight = 166;
      return com.statusRacao ? (com.statusRacao * maxHeight) / 100 + "px" : "0px";
    },
    next() {
      if (this.currentIndex + this.visibleCountDesktop < this.comedouros.length) {
        this.currentIndex += this.visibleCountDesktop;
      }
    },
    prev() {
      if (this.currentIndex - this.visibleCountDesktop >= 0) {
        this.currentIndex -= this.visibleCountDesktop;
      } else {
        this.currentIndex = 0;
      }
    },
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

.primary-action {
  margin-bottom: 10px;
  color: #fff;
  background-color: #1885F3;
  width: 50%;
  padding: 5px;
  border-radius: 10px;
  margin-top: 20px;
}

.comedouro-drawing {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
}

.comedouro {
  width: 300px;
  height: 200px;
  border: 2px solid #fff;
  background: #5555;
  border-radius: 10px;
  overflow: hidden;
  position: relative;
  margin-bottom: 10px;
}

.racao {
  position: absolute;
  bottom: 30px;
  left: 0;
  width: 100%;
  background: #f5c542;
  transition: height 0.3s ease;
}

.gaveta {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 30px;
  background: #3339;
  transition: transform 0.3s ease;
}

.gaveta.aberta {
  background: darkgreen;
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
  width: 100%;
  margin: 16px auto;
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

.arrow-col {
  display: flex;
  justify-content: center;
  align-items: center;
}

.slider-container {
  margin-top: 20px;
}
</style>
