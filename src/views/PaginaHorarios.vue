<template>
  <v-app style="background-color: #101113;">
    <v-main>
      <v-container fluid class="pa-0">
        <!-- Layout Desktop -->
        <template v-if="!isMobile">
          <!-- Exibe conteúdo caso não haja horários configurados -->
          <v-container v-if="!possuiHorarios">
            <v-row justify="center">
              <v-col cols="12" class="setup-content">
                <h1 id="setup-title" class="setup-title">Horários do Comedouro!</h1>
                <p class="setup-description">
                  Parece que você não tem nenhum horário configurado no momento. Configure um agora.
                </p>
                <v-img src="/src/assets/timer.png" width="300" />
                <v-btn class="primary-action" @click="openModal()">
                  Clique aqui para configurar um horário!
                </v-btn>
              </v-col>
            </v-row>
          </v-container>
          
          <!-- Exibe os horários já cadastrados -->
          <v-container v-else class="pa-0">
            <v-row justify="center">
              <v-col cols="12" class="setup-content">
                <h1 id="setup-title" class="setup-title">Horários do Comedouro!</h1>
                <p class="setup-description">Seus Horários programados:</p>
                <v-row>
                  <v-col v-for="horario in horarios" :key="horario.id" cols="12" sm="6" md="4" lg="3">
                    <v-card class="mx-auto" max-width="300">
                      <v-card-title>{{ horario.nome }}</v-card-title>
                      <v-card-subtitle>{{ horario.tipoAlarme }}</v-card-subtitle>
                      <v-card-text>
                        <p><strong>Data:</strong> {{ horario.data }}</p>
                        <p><strong>Comedouro:</strong> {{ horario.comedouroId }}</p>
                      </v-card-text>
                      <v-card-actions>
                        <v-btn color="primary" class="mx-auto" @click="editarHorario(horario)">
                          Ver detalhes
                        </v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-col>
                </v-row>
                <v-btn class="primary-action" @click="openModal()">
                  Adicionar novo horário
                </v-btn>
              </v-col>
            </v-row>
          </v-container>
        </template>

        <!-- Layout Mobile -->
        <template v-else>
          <!-- Caso não haja horários configurados -->
          <v-container v-if="!possuiHorarios" class="pa-0">
            <v-row justify="center">
              <v-col cols="12" class="setup-content-mobile mt-12">
                <h1 id="setup-title" class="setup-title-mobile">Horários do Comedouro!</h1>
                <p class="setup-description-mobile">
                  Parece que você não tem nenhum horário configurado no momento. Configure um agora.
                </p>
                <v-img src="/src/assets/timer.png" width="100%" height="400" />
                <v-btn class="primary-action-mobile" height="60" width="350" @click="openModal()">
                  Clique aqui para<br> configurar um horário!
                </v-btn>
              </v-col>
            </v-row>
          </v-container>
          
          <!-- Exibe os horários já cadastrados -->
          <v-container v-else class="pa-0">
            <v-row justify="center">
              <v-col cols="12" class="setup-content-mobile mt-12">
                <h1 id="setup-title" class="setup-title-mobile">Horários do Comedouro!</h1>
                <p class="setup-description-mobile">Seus Horários programados:</p>
                <v-row>
                  <v-col v-for="horario in horarios" :key="horario.id" cols="12">
                    <v-card class="mx-auto" max-width="300">
                      <v-card-title>{{ horario.nome }}</v-card-title>
                      <v-card-subtitle>{{ horario.tipoAlarme }}</v-card-subtitle>
                      <v-card-text>
                        <p><strong>Data:</strong> {{ horario.data }}</p>
                        <p><strong>Comedouro:</strong> {{ horario.comedouroId }}</p>
                      </v-card-text>
                      <v-card-actions>
                        <v-btn color="primary" class="mx-auto" @click="editarHorario(horario)">
                          Ver detalhes
                        </v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-col>
                </v-row>
                <v-btn class="primary-action-mobile" @click="openModal()">
                  Adicionar novo horário
                </v-btn>
              </v-col>
            </v-row>
          </v-container>
        </template>

        <!-- Modal (Comum para Desktop e Mobile) -->
        <modal
          :value="modalVisible"
          @input="modalVisible = $event"
          @save="salvarHorario()"
          :title="editando ? 'Editar Horário' : 'Insira o horário'"
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
              <v-col cols="12">
                <v-text-field
                  v-model="tipoAlarme"
                  label="Tipo do Alarme"
                  required
                  clearable
                  variant="outlined"
                />
              </v-col>
              <v-col cols="6">
                <v-text-field
                  v-model="data"
                  label="Data"
                  required
                  clearable
                  variant="outlined"
                />
              </v-col>
              <v-col cols="6">
                <v-text-field
                  v-model="comedouroId"
                  label="Comedouro"
                  required
                  clearable
                  variant="outlined"
                />
              </v-col>
            </v-row>
            <v-btn v-if="editando" color="red" class="mt-4" @click="excluirHorario()">
              Excluir Horário
            </v-btn>
          </v-form>
        </modal>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import modal from '@/components/modal.vue';
import {
  cadastrarAlarme,
  atualizarAlarme,
  excluirAlarme,
  listarAlarme,
  obterUsuario,
} from "./store/index.js";

export default {
  name: 'PaginaHorarios',
  components: { modal },
  data() {
    return {
      usuarioId: obterUsuario(),
      modalVisible: false,
      possuiHorarios: false,
      horarios: [],
      nome: '',
      tipoAlarme: '',
      data: '',
      comedouroId: '',
      editando: false,
      horarioAtual: null,
      nomeRules: [(v) => !!v || 'Nome é obrigatório'],
      isMobile: false,
      valid: false,
    };
  },
  async created() {
    this.checkMobile();
    window.addEventListener('resize', this.checkMobile);
    const horariosUsuario = await listarAlarme();
    if (horariosUsuario && horariosUsuario.length) {
      this.possuiHorarios = true;
      this.horarios = horariosUsuario;
    }
  },
  methods: {
    openModal() {
      this.editando = false;
      this.modalVisible = true;
      this.nome = '';
      this.tipoAlarme = '';
      this.data = '';
      this.comedouroId = '';
    },
    editarHorario(horario) {
      this.editando = true;
      this.horarioAtual = horario;
      this.modalVisible = true;
      this.nome = horario.nome;
      this.tipoAlarme = horario.tipoAlarme;
      this.data = horario.data;
      this.comedouroId = horario.comedouroId;
    },
    async salvarHorario() {
      const form = this.$refs.form;
      const isValid = form.validate();
      if (!isValid.errors) {
        try {
          if (this.editando) {
            await atualizarAlarme(
              this.horarioAtual.id,
              this.nome,
              this.tipoAlarme,
              this.data,
              this.comedouroId,
              this.usuarioId.id
            );
            Object.assign(this.horarioAtual, {
              nome: this.nome,
              tipoAlarme: this.tipoAlarme,
              data: this.data,
              comedouroId: this.comedouroId,
            });
          } else {
            const result = await cadastrarAlarme(
              this.nome,
              this.tipoAlarme,
              this.data,
              this.usuarioId.id,
              this.comedouroId
            );
            if (result) {
              this.horarios.push({
                id: result.id,
                nome: this.nome,
                tipoAlarme: this.tipoAlarme,
                data: this.data,
                comedouroId: this.comedouroId,
                usuarioId: this.usuarioId.id,
              });
              this.possuiHorarios = true;
            }
          }
          this.modalVisible = false;
        } catch (error) {
          console.error("Erro ao salvar horário:", error);
        }
      }
    },
    async excluirHorario() {
      if (this.horarioAtual) {
        try {
          await excluirAlarme(this.horarioAtual.id);
          this.horarios = this.horarios.filter(
            (horario) => horario.id !== this.horarioAtual.id
          );
          this.modalVisible = false;
          if (!this.horarios.length) {
            this.possuiHorarios = false;
          }
        } catch (error) {
          console.error("Erro ao excluir horário:", error);
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

.v-img {
  display: block;
  margin: 20px auto;
}
</style>
