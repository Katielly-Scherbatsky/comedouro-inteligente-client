<template>
  <v-dialog
    v-model="isVisible"
    max-width="600px"
    persistent
    scrollable
    @keydown.esc="closeModal"
    class="custom-modal"
  >
    <v-card class="modal-card">
      <v-card-title class="pt-4 ml-6">
        <span class="headline">{{ title }}</span>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <slot></slot>
      </v-card-text>
      <v-card-actions>
        <v-btn color="white" variant="outlined" @click="closeModal">Fechar</v-btn>
        <v-btn color="secondary" variant="outlined" @click="onSave">Salvar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'Modal',
  props: {
    title: {
      type: String,
      required: true,
    },
    value: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      isVisible: this.value,
    };
  },
  watch: {
    value(newVal) {
      this.isVisible = newVal;
    },
    isVisible(newVal) {
      this.$emit('input', newVal);
    },
  },
  methods: {
    closeModal() {
      this.isVisible = false;
    },
    onSave() {
      this.$emit('save');
      this.closeModal();
    },
  },
};
</script>

<style scoped>

.modal-card {
  background-color: #2A3240 !important;
  color: white;
}

.modal-card .v-card-title {
  color: white;
}

.modal-card .v-btn {
  color: white;
}
</style>
