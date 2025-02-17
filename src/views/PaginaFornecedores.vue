<template>
  <v-app style="background-color: #101113;">
    <v-main>
      <v-container fluid class="pa-0">
        <!-- Layout Desktop -->
        <template v-if="!isMobile">
          <template v-if="showMap">
            <v-row justify="center">
              <v-col cols="12" class="setup-content">
                <MapView />
              </v-col>
            </v-row>
          </template>
          <template v-else>
            <!-- Quando NÃO há fornecedores cadastrados -->
            <v-container v-if="!possuiFornecedor">
              <v-row justify="center">
                <v-col cols="12" class="setup-content">
                  <h1 id="setup-title" class="setup-title">Fornecedores</h1>
                  <!-- <p class="setup-description">
                    Parece que você não tem nenhum fornecedor.
                  </p> -->
                  <v-img src="/src/assets/fornecedor.png" width="300" />
                  <v-btn class="primary-action" @click="showMapView()">
                    Clique para ver mapa com fornecedores próximos
                  </v-btn>
                </v-col>
              </v-row>
              <modal
                :value="modalVisible"
                @input="modalVisible = $event"
                @save="salvarFornecedor()"
                title="Cadastre um fornecedor"
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
                    <v-col cols="4">
                      <v-text-field
                        v-model="raca"
                        label="Raça"
                        required
                        clearable
                        variant="outlined"
                      />
                    </v-col>
                    <v-col cols="4">
                      <v-text-field
                        v-model="idade"
                        label="Idade"
                        required
                        clearable
                        variant="outlined"
                      />
                    </v-col>
                    <v-col cols="4">
                      <v-text-field
                        v-model="peso"
                        label="Peso"
                        required
                        clearable
                        variant="outlined"
                      />
                    </v-col>
                  </v-row>
                </v-form>
              </modal>
            </v-container>

            <!-- Quando há fornecedores cadastrados -->
            <v-container v-else class="pa-0">
              <v-row justify="center">
                <v-col cols="12" class="setup-content">
                  <h1 id="setup-title" class="setup-title">Fornecedores realizados!</h1>
                  <v-col
                    v-for="fornecedor in fornecedores"
                    :key="fornecedor.id"
                    cols="12"
                    sm="6"
                    md="4"
                    lg="3"
                  >
                    <v-card class="mx-auto" max-width="300">
                      <v-card-title>{{ fornecedor.nome }}</v-card-title>
                      <v-card-subtitle>
                        {{ fornecedor.raca || "Raça desconhecida" }}
                      </v-card-subtitle>
                      <v-card-text>
                        <p><strong>Idade:</strong> {{ fornecedor.idade }} anos</p>
                        <p><strong>Peso:</strong> {{ fornecedor.peso }} kg</p>
                      </v-card-text>
                      <v-card-actions>
                        <v-btn color="primary">Ver detalhes</v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-col>
                  <v-btn class="primary-action" @click="showMapView()">
                    Clique para ver mapa com fornecedores próximos
                  </v-btn>
                </v-col>
              </v-row>
              <modal
                :value="modalVisible"
                @input="modalVisible = $event"
                @save="salvarFornecedor()"
                title="Insira os dados do fornecedor"
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
                    <v-col cols="4">
                      <v-text-field
                        v-model="raca"
                        label="Raça"
                        required
                        clearable
                        variant="outlined"
                      />
                    </v-col>
                    <v-col cols="4">
                      <v-text-field
                        v-model="idade"
                        label="Idade"
                        required
                        clearable
                        variant="outlined"
                      />
                    </v-col>
                    <v-col cols="4">
                      <v-text-field
                        v-model="peso"
                        label="Peso"
                        required
                        clearable
                        variant="outlined"
                      />
                    </v-col>
                  </v-row>
                </v-form>
              </modal>
            </v-container>
          </template>
        </template>

        <!-- Layout Mobile -->
        <template v-else>
          <template v-if="showMap">
            <v-row justify="center">
              <v-col cols="12" class="setup-content-mobile" style="margin-top: 60px;">
                <MapView />
              </v-col>
            </v-row>
          </template>
          <template v-else>
            <!-- Sem fornecedores cadastrados -->
            <v-container v-if="!possuiFornecedor" class="pa-0">
              <v-row justify="center">
                <v-col cols="12" class="setup-content-mobile" style="padding-top: 60px;">
                  <h1 id="setup-title" class="setup-title-mobile">Fornecedores</h1>
                  <!-- <p class="setup-description-mobile">
                    Parece que você não tem nenhum fornecedor.
                  </p> -->
                  <v-img src="/src/assets/fornecedor.png" width="100%" height="400" />
                  <v-btn class="primary-action-mobile" height="60" width="350" @click="showMapView()">
                    Clique para ver mapa com<br> fornecedores próximos
                  </v-btn>
                </v-col>
              </v-row>
              <modal
                :value="modalVisible"
                @input="modalVisible = $event"
                @save="salvarFornecedor()"
                title="Cadastre um fornecedor"
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
                    <v-col cols="4">
                      <v-text-field
                        v-model="raca"
                        label="Raça"
                        required
                        clearable
                        variant="outlined"
                      />
                    </v-col>
                    <v-col cols="4">
                      <v-text-field
                        v-model="idade"
                        label="Idade"
                        required
                        clearable
                        variant="outlined"
                      />
                    </v-col>
                    <v-col cols="4">
                      <v-text-field
                        v-model="peso"
                        label="Peso"
                        required
                        clearable
                        variant="outlined"
                      />
                    </v-col>
                  </v-row>
                </v-form>
              </modal>
            </v-container>
            <!-- Quando há fornecedores cadastrados -->
            <v-container v-else class="pa-0">
              <v-row justify="center">
                <v-col cols="12" class="setup-content-mobile" style="padding-top: 60px;">
                  <h1 id="setup-title" class="setup-title-mobile">Fornecedores realizados!</h1>
                  <v-col
                    v-for="fornecedor in fornecedores"
                    :key="fornecedor.id"
                    cols="12"
                  >
                    <v-card class="mx-auto" max-width="300">
                      <v-card-title>{{ fornecedor.nome }}</v-card-title>
                      <v-card-subtitle>
                        {{ fornecedor.raca || "Raça desconhecida" }}
                      </v-card-subtitle>
                      <v-card-text>
                        <p><strong>Idade:</strong> {{ fornecedor.idade }} anos</p>
                        <p><strong>Peso:</strong> {{ fornecedor.peso }} kg</p>
                      </v-card-text>
                      <v-card-actions>
                        <v-btn color="primary">Ver detalhes</v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-col>
                  <v-btn class="primary-action-mobile" @click="showMapView()">
                    Clique para ver mapa com fornecedores próximos
                  </v-btn>
                </v-col>
              </v-row>
              <modal
                :value="modalVisible"
                @input="modalVisible = $event"
                @save="salvarFornecedor()"
                title="Insira os dados do fornecedor"
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
                    <v-col cols="4">
                      <v-text-field
                        v-model="raca"
                        label="Raça"
                        required
                        clearable
                        variant="outlined"
                      />
                    </v-col>
                    <v-col cols="4">
                      <v-text-field
                        v-model="idade"
                        label="Idade"
                        required
                        clearable
                        variant="outlined"
                      />
                    </v-col>
                    <v-col cols="4">
                      <v-text-field
                        v-model="peso"
                        label="Peso"
                        required
                        clearable
                        variant="outlined"
                      />
                    </v-col>
                  </v-row>
                </v-form>
              </modal>
            </v-container>
          </template>
        </template>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import modal from '@/components/modal.vue';
import MapView from '@/components/mapView.vue';
import { cadastrarFornecedor, obterUsuario, listarFornecedor } from "./store/index.js";

export default {
  name: 'PaginaPedidos',
  components: {
    modal,
    MapView,
  },
  data() {
    return {
      usuarioId: obterUsuario(),
      modalVisible: false,
      possuiFornecedor: false,
      fornecedores: [],
      nome: '',
      raca: '',
      idade: '',
      peso: '',
      showMap: false,
      valid: false,
      nomeRules: [(v) => !!v || 'Nome é obrigatório'],
      isMobile: false,
    };
  },
  async created() {
    this.checkMobile();
    window.addEventListener('resize', this.checkMobile);

    const fornecedoresUsuario = await listarFornecedor();
    if (fornecedoresUsuario.length) {
      this.possuiFornecedor = true;
      this.fornecedores = fornecedoresUsuario;
    }
  },
  methods: {
    openModal() {
      this.modalVisible = true;
    },
    async salvarFornecedor() {
      const form = this.$refs.form;
      console.log("Validando formulário...");
      const isValid = form.validate();
      console.log("Resultado da validação:", isValid);
      if (!isValid.errors) {
        try {
          const result = await cadastrarFornecedor(
            this.nome,
            this.raca,
            Number(this.idade),
            Number(this.peso),
            this.usuarioId.id
          );
          if (result) {
            this.$router.push("/fornecedores");
          } else {
            console.error("Erro ao realizar cadastro no backend.");
          }
        } catch (error) {
          console.error("Erro ao realizar cadastro:", error);
        }
      }
    },
    showMapView() {
      this.showMap = true;
    },
    checkMobile() {
      this.isMobile = window.innerWidth <= 768;
    }
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.checkMobile);
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

.v-img {
  display: block;
  margin: 30px auto;
}

/* Estilos para Mobile */
.setup-content-mobile {
  background: #39434f;
  padding: 20px;
  text-align: center;
  width: 100%;
  margin: 0;
}

.setup-title-mobile {
  color: #fff;
  font-weight: 500;
  font-size: 24px;
  margin: 20px 0;
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
</style>
