<template>
  <v-app style="background-color: #101113;">
    <v-main>
      <v-container>
        <v-row justify="center">
          <v-col cols="12" class="setup-content">
          </v-col>
        </v-row>

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
import { cadastrarPet, obterUsuario } from "./store/index.js";

export default {
  name: 'ListarPets',
  components: {
    modal,
  },
  data() {
    return {
      usuarioId: obterUsuario(),
      modalVisible: false,
    };
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
          const result = await cadastrarPet(this.nome, this.raca, Number(this.idade), Number(this.peso), this.usuarioId.id);
          if (result) {
            if (result) {
              this.$router.push("/pets");
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
