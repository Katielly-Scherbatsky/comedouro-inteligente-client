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
                <h1 id="setup-title" class="setup-title">Horários do Comedouro</h1>
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
          
          <!-- Exibe os horários já cadastrados com slider se houver mais de 4 alarmes -->
          <v-container v-else class="pa-0">
            <v-row justify="center">
              <v-col cols="12" class="setup-content">
                <h1 id="setup-title" class="setup-title">Horários do Comedouro</h1>
                <template v-if="horarios.length > visibleCountDesktop">
                  <div class="slider-container">
                    <v-row align="center" justify="center">
                      <v-col cols="1" class="arrow-col">
                        <v-btn icon @click="prev" :disabled="currentIndex === 0">
                          <v-icon>mdi-chevron-left</v-icon>
                        </v-btn>
                      </v-col>
                      <!-- Área com os alarmes visíveis -->
                      <v-col cols="10">
                        <v-row>
                          <v-col
                            v-for="horario in visibleHorarios"
                            :key="horario.id"
                            cols="12"
                            sm="6"
                            md="4"
                            lg="3"
                          >
                            <v-card class="mx-auto" max-width="300">
                              <v-card-title>{{ horario.nome }}</v-card-title>
                              <v-card-text>
                                <p><strong>Data:</strong> {{ formatDateTime(horario.data) }}</p>
                                <p>
                                  <strong>Comedouro:</strong>
                                  {{ horario.comedouro ? horario.comedouro.nome : horario.comedouroId }}
                                </p>
                                <p>
                                  <strong>Status:</strong>
                                  {{ horario.status === 1 ? 'Ativo' : 'Desativado' }}
                                </p>
                              </v-card-text>
                              <v-card-actions>
                                <v-btn color="primary" class="mx-auto" @click="editarHorario(horario)">
                                  Ver detalhes
                                </v-btn>
                              </v-card-actions>
                            </v-card>
                          </v-col>
                        </v-row>
                      </v-col>
                      <!-- Botão "próximo" -->
                      <v-col cols="1" class="arrow-col">
                        <v-btn
                          icon
                          @click="next"
                          :disabled="currentIndex + visibleCountDesktop >= horarios.length"
                        >
                          <v-icon>mdi-chevron-right</v-icon>
                        </v-btn>
                      </v-col>
                    </v-row>
                  </div>
                </template>
                <template v-else>
                  <!-- Exibe normalmente se 4 ou menos -->
                  <v-row>
                    <v-col
                      v-for="horario in horarios"
                      :key="horario.id"
                      cols="12"
                      sm="6"
                      md="4"
                      lg="3"
                    >
                      <v-card class="mx-auto" max-width="300">
                        <v-card-title>{{ horario.nome }}</v-card-title>
                        <v-card-text>
                          <p><strong>Data:</strong> {{ formatDateTime(horario.data) }}</p>
                          <p>
                            <strong>Comedouro:</strong>
                            {{ horario.comedouro ? horario.comedouro.nome : horario.comedouroId }}
                          </p>
                          <p>
                            <strong>Status:</strong>
                            {{ horario.status === 1 ? 'Ativo' : 'Desativado' }}
                          </p>
                        </v-card-text>
                        <v-card-actions>
                          <v-btn color="primary" class="mx-auto" @click="editarHorario(horario)">
                            Ver detalhes
                          </v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-col>
                  </v-row>
                </template>
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
              <v-col cols="12" class="setup-content-mobile mt-12" style="padding-top: 60px;">
                <h1 id="setup-title" class="setup-title-mobile">Horários do Comedouro</h1>
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
              <v-col cols="12" class="setup-content-mobile mt-12" style="padding-top: 20px;">
                <h1 id="setup-title" class="setup-title-mobile">Horários do Comedouro</h1>
                <v-row>
                  <v-col v-for="horario in horarios" :key="horario.id" cols="12">
                    <v-card class="mx-auto" max-width="300">
                      <v-card-title>{{ horario.nome }}</v-card-title>
                      <v-card-text>
                        <p><strong>Data:</strong> {{ formatDateTime(horario.data) }}</p>
                        <p>
                          <strong>Comedouro:</strong>
                          {{ horario.comedouro ? horario.comedouro.nome : horario.comedouroId }}
                        </p>
                        <p>
                          <strong>Status:</strong>
                          {{ horario.status === 1 ? 'Ativo' : 'Desativado' }}
                        </p>
                      </v-card-text>
                      <v-card-actions>
                        <v-btn color="primary" class="mx-auto" @click="editarHorario(horario)">
                          Ver detalhes
                        </v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-col>
                </v-row>
                <v-btn class="primary-action-mobile" width="300" @click="openModal()">
                  Adicionar novo horário
                </v-btn>
              </v-col>
            </v-row>
          </v-container>
        </template>

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
                  outlined
                />
              </v-col>
              <v-col cols="6">
                <v-text-field
                  v-model="dateInput"
                  label="Data (DD/MM/YYYY)"
                  required
                  clearable
                  outlined
                  placeholder="ex: 31/12/2023"
                />
              </v-col>
              <v-col cols="6">
                <v-text-field
                  v-model="timeInput"
                  label="Hora (00:00)"
                  required
                  clearable
                  outlined
                  placeholder="ex: 23:59"
                />
              </v-col>
              <v-col cols="6">
                <v-select
                  v-model="statusInput"
                  :items="statusOptions"
                  label="Status"
                  required
                  clearable
                  outlined
                  item-text="text"
                  item-value="value"
                  :item-props="statusItemProps"
                  placeholder="Selecione o status"
                />
              </v-col>
              <v-col cols="6">
                <v-select
                  v-model="comedouroId"
                  :items="availableComedouros"
                  label="Comedouro"
                  required
                  clearable
                  outlined
                  item-text="nome"
                  item-value="id"
                  :item-props="comedouroItemProps"
                  placeholder="Selecione um comedouro"
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
  obterComedouro,
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
      statusInput: 1,
      comedouroId: '',
      editando: false,
      horarioAtual: null,
      nomeRules: [(v) => !!v || 'Nome é obrigatório'],
      isMobile: false,
      valid: false,
      dateInput: '',
      timeInput: '',
      availableComedouros: [],
      statusOptions: [
        { text: "Ativo", value: 1 },
        { text: "Desativado", value: 2 },
      ],
      currentIndex: 0,
      visibleCountDesktop: 4,
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
    const comedourosDisponiveis = await obterComedouro();
    if (comedourosDisponiveis) {
      this.availableComedouros = Array.isArray(comedourosDisponiveis)
        ? comedourosDisponiveis
        : Object.values(comedourosDisponiveis);
    }
  },
  computed: {
    visibleHorarios() {
      return this.horarios.slice(this.currentIndex, this.currentIndex + this.visibleCountDesktop);
    },
  },
  methods: {
    openModal() {
      this.editando = false;
      this.modalVisible = true;
      this.nome = '';
      this.tipoAlarme = '';
      this.data = '';
      this.statusInput = 1;
      this.comedouroId = '';
      this.dateInput = '';
      this.timeInput = '';
    },
    editarHorario(horario) {
      this.editando = true;
      this.horarioAtual = horario;
      this.modalVisible = true;
      this.nome = horario.nome;
      this.tipoAlarme = horario.tipoAlarme;
      this.data = horario.data;
      this.statusInput = horario.status;
      this.comedouroId = horario.comedouroId;
      const d = new Date(horario.data);
      if (!isNaN(d)) {
        const dia = String(d.getDate()).padStart(2, "0");
        const mes = String(d.getMonth() + 1).padStart(2, "0");
        const ano = d.getFullYear();
        const horas = String(d.getHours()).padStart(2, "0");
        const minutos = String(d.getMinutes()).padStart(2, "0");
        this.dateInput = `${dia}/${mes}/${ano}`;
        this.timeInput = `${horas}:${minutos}`;
      } else {
        this.dateInput = '';
        this.timeInput = '';
      }
    },
    async salvarHorario() {
      const form = this.$refs.form;
      const isValid = form.validate();
      if (!isValid.errors) {
        if (this.dateInput && this.timeInput) {
          const parts = this.dateInput.split('/');
          if (parts.length !== 3) {
            alert("Data inválida. Use o formato DD/MM/YYYY.");
            return;
          }
          const dia = parts[0];
          const mes = parts[1];
          const ano = parts[2];
          this.data = `${ano}-${mes}-${dia}T${this.timeInput}:00`;
        }
        this.comedouroId = Number(this.comedouroId);
        try {
          if (this.editando) {
            await atualizarAlarme(
              this.horarioAtual.id,
              this.nome,
              this.tipoAlarme,
              this.data,
              this.statusInput,
              this.usuarioId.id,
              this.comedouroId
            );
            Object.assign(this.horarioAtual, {
              nome: this.nome,
              tipoAlarme: this.tipoAlarme,
              data: this.data,
              status: this.statusInput,
              comedouroId: this.comedouroId,
            });
          } else {
            const result = await cadastrarAlarme(
              this.nome,
              this.tipoAlarme,
              this.data,
              this.statusInput,
              this.usuarioId.id,
              this.comedouroId
            );
            if (result) {
              this.horarios.push({
                id: result.id,
                nome: this.nome,
                tipoAlarme: this.tipoAlarme,
                data: this.data,
                status: this.statusInput,
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
    comedouroItemProps(item) {
      return {
        title: item.nome,
        value: item.id,
      };
    },
    statusItemProps(item) {
      return {
        title: item.text,
        value: item.value,
      };
    },
    formatDateTime(dateStr) {
      if (!dateStr) return "";
      const date = new Date(dateStr);
      if (isNaN(date)) return dateStr;
      const dia = String(date.getDate()).padStart(2, "0");
      const mes = String(date.getMonth() + 1).padStart(2, "0");
      const ano = date.getFullYear();
      const horas = String(date.getHours()).padStart(2, "0");
      const minutos = String(date.getMinutes()).padStart(2, "0");
      return `${dia}/${mes}/${ano} ${horas}:${minutos}`;
    },
    next() {
      if (this.currentIndex + this.visibleCountDesktop < this.horarios.length) {
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
  beforeUnmount() {
    window.removeEventListener("resize", this.checkMobile);
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

/* Estilos do slider */
.arrow-col {
  display: flex;
  justify-content: center;
  align-items: center;
}

.slider-container {
  margin-top: 20px;
}
</style>
