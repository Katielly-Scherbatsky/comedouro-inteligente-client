<template>
  <v-app style="background-color: #101113;">
    <v-main>
      <v-container v-if="!possuiHorarios">
        <v-row justify="center">
          <v-col cols="12" class="setup-content">
              <h1 id="setup-title" class="setup-title">
                Horários do Comedouro!
              </h1>
              <p class="setup-description">
                Parece que você não tem nenhum horário configurado no momento. Configure um agora.
              </p>
              <v-img src="/src/assets/Pet App.png" width="300" />
              <v-btn class="primary-action" @click="openModal()">Clique aqui para configurar um horário!</v-btn>
          </v-col>
        </v-row>

        <modal
          :value="modalVisible"
          @input="modalVisible = $event"
          @save="salvarHorario()"
          title="Insira o horário"
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
      <v-container v-else-if="!!possuiHorarios">
        <v-row justify="center">
          <v-col cols="12" class="setup-content">
              <h1 id="setup-title" class="setup-title">
                Horários do Comedouro!
              </h1>
              <p class="setup-description">
                Seus Horários programados:
              </p>
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
                  <v-card-subtitle>{{ horario.raca || "Raça desconhecida" }}</v-card-subtitle>
                  <v-card-text>
                    <p><strong>Nome:</strong> {{ horario.idade }} anos</p>
                    <p><strong>Peso:</strong> {{ horario.peso }} kg</p>
                  </v-card-text>
                  <v-card-actions>
                    <v-btn color="primary">Ver detalhes</v-btn>
                  </v-card-actions>
                </v-card>
              </v-col>
          </v-col>
        </v-row>

        <modal
          :value="modalVisible"
          @input="modalVisible = $event"
          @save="salvarHorario()"
          title="Insira o horário"
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
    </v-main>
  </v-app>
</template>

<script>
import modal from '@/components/modal.vue';
import { cadastrarAlarme, obterUsuario, listarAlarme } from "./store/index.js";

export default {
  name: 'PaginaHorarios',
  components: {
    modal,
  },
  data() {
    return {
      novoHorario: null,
      usuarioId: obterUsuario(),
      modalVisible: false,
      possuiHorarios: false,
      horarios: [],
    };
  },
  async created() {
    const horariosUsuario = await listarAlarme();
    if (horariosUsuario !== null) {
      this.possuiHorarios = true;
      this.horarios = horariosUsuario;
    }
  },
  methods: {
    openModal() {
      this.modalVisible = true;
    },
    async salvarHorario() {
      const form = this.$refs.form;

      console.log("Validando formulário...");
      const isValid = form.validate();
      console.log("Resultado da validação:", isValid);

      if (!isValid.errors) {
        try {
          const result = await cadastrarAlarme(this.nome, this.raca, Number(this.idade), Number(this.peso), this.usuarioId.id);
          if (result) {
            if (result) {
              this.$router.push("/horarios");
            }
          } else {
            console.error("Erro ao realizar cadastro no backend.");
          }
        } catch (error) {
          console.error("Erro ao realizar cadastro:", error);
        }
      }
    },
  },
}
</script>

<style scoped>
.v-card {
  border-radius: 10px;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.2);
}

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
  background-color:  #1885F3;
  width: 50%;
  padding: 5px;
  border-radius: 10px;
  margin-top: 20px;
}

.v-img {
  display: block;
  margin: 30px auto;
}
</style>
