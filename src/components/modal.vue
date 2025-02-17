<template>
  <v-dialog
    v-model="isVisible"
    :max-width="isMobile ? '90%' : '500px'"
    persistent
    scrollable
    transition="dialog-bottom-transition"
    @keydown.esc="closeModal"
    class="custom-modal"
  >
    <v-card class="modal-card">
      <!-- Título -->
      <v-card-title class="modal-header">
        <span class="modal-title">{{ title }}</span>
      </v-card-title>

      <v-divider></v-divider>

      <!-- Conteúdo -->
      <v-card-text class="modal-content">
        <slot></slot>
      </v-card-text>

      <!-- Botões -->
      <v-card-actions class="modal-actions">
        <v-btn variant="tonal" color="grey" @click="closeModal">Fechar</v-btn>
        <v-btn color="primary" variant="flat" @click="onSave">Salvar</v-btn>
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
      isMobile: false, // Flag para verificar se é mobile
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
    checkMobile() {
      this.isMobile = window.innerWidth <= 768; // Define 768px como o breakpoint para mobile
    },
  },
  created() {
    this.checkMobile();
    window.addEventListener('resize', this.checkMobile);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.checkMobile);
  },
};
</script>

<style scoped>
/* Cartão principal */
.modal-card {
  background-color: #2A3240;
  color: white;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  overflow: hidden;
}

/* Cabeçalho */
.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
}

/* Título do modal */
.modal-title {
  font-size: 20px;
  font-weight: bold;
}

/* Conteúdo do modal */
.modal-content {
  padding: 20px;
  font-size: 16px;
  line-height: 1.5;
}

/* Botões */
.modal-actions {
  display: flex;
  justify-content: flex-end;
  padding: 16px;
  background: rgba(255, 255, 255, 0.05);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

/* Estilos específicos para mobile */
@media (max-width: 768px) {
  .modal-card {
    border-radius: 8px; /* Bordas mais arredondadas para mobile */
  }

  .modal-header {
    padding: 12px; /* Padding menor para mobile */
  }

  .modal-title {
    font-size: 18px; /* Tamanho de fonte menor para mobile */
  }

  .modal-content {
    padding: 16px; /* Padding menor para mobile */
    font-size: 14px; /* Tamanho de fonte menor para mobile */
  }

  .modal-actions {
    padding: 12px; /* Padding menor para mobile */
  }

  .v-btn {
    font-size: 14px; /* Tamanho de fonte menor para botões em mobile */
  }
}

/* Animação ao abrir/fechar */
.v-dialog {
  transition: all 0.3s ease-in-out;
}
</style>