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
          <div class="comedouro-container">
            <div class="comedouro">
              <div class="racao" :style="{ height: racaoHeight }"></div>
              <div class="gaveta" :class="{ aberta: comedouro.situacao_tampa === 1 }"></div>
            </div>
            <div class="info">
              <p><strong>Quantidade de ração:</strong> {{ comedouro.status }}%</p>
              <p><strong>Gaveta:</strong> {{ comedouro.situacao_tampa === 1 ? 'Aberta' : 'Fechada' }}</p>
            </div>
          </div>
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
      comedouro: {
        status: 0,
        situacao_tampa: 0,
      },
    };
  },
  computed: {
    racaoHeight() {
      const maxHeight = 100;
      return (this.comedouro.status * maxHeight / 100) + "px";
    },
  },
  async created() {
    try {
      const data = await obterComedouro();
      this.comedouro = data;
    } catch (error) {
      console.error("Erro ao carregar dados do comedouro:", error);
    } finally {
      this.loading = false;
    }
  },
};
</script>

<style scoped>
.comedouro-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
}

.comedouro {
  width: 300px;
  height: 200px;
  border: 2px solid #fff;
  position: relative;
  background: #555;  /* Fundo do comedouro */
  border-radius: 10px;
  overflow: hidden;
  margin-bottom: 10px;
}

/* A "ração" é representada por um bloco colorido que cresce
   a partir da base do comedouro (acima da gaveta) */
.racao {
  position: absolute;
  bottom: 30px; /* Espaço reservado para a gaveta */
  left: 0;
  width: 100%;
  background: #f5c542; /* Cor da ração */
  transition: height 0.3s ease;
}

/* A gaveta ocupa a parte inferior do comedouro */
.gaveta {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 30px;
  background: #333;
  transition: transform 0.3s ease;
}

/* Quando a gaveta está aberta, desloca-se para baixo */
.gaveta.aberta {
  transform: translateY(20px);
}

.info {
  color: #fff;
  text-align: center;
}
</style>
