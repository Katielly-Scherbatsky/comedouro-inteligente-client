import api from '../../services/api';

// Função utilitária para centralizar requisições e tratamento de erros
const handleRequest = async (requestFn, successMessage, errorMessage) => {
  try {
    const response = await requestFn();
    if (response.status >= 200 && response.status < 300) {
      window.console.log(successMessage, response.data);
      return response.data;
    } else {
      window.console.error(errorMessage, response.status);
      return null;
    }
  } catch (error) {
    window.console.error(errorMessage, error);
    return null;
  }
};

// Funções de autenticação
export const autenticarUsuario = async (email, senha) => {
  try {
    const response = await api.post("/auth/login", {
      email: email,
      senha: senha,
    })

    if (response.status === 200) {
      window.console.log("Autenticação bem-sucedida:", response.data)
      localStorage.removeItem("usuario")
      localStorage.removeItem("token")
      localStorage.setItem("usuario", JSON.stringify(response.data.usuario))
      localStorage.setItem("token", response.data.access_token)
      return response.data
    } else {
      window.console.error("Erro na autenticação:", response.status)
      return null
    }
  } catch (error) {
    window.console.error("Erro na requisição:", error)
    return null
  }
}

export const obterUsuario = () => {
  const usuario = localStorage.getItem("usuario")
  return usuario ? JSON.parse(usuario) : null
}

export const estaAutenticado = () => {
  const token = localStorage.getItem("token")
  return token ? true : false
}

export const logout = () => {
  localStorage.removeItem("usuario")
  localStorage.removeItem("token")
  window.console.log("Usuário deslogado")
}

// Funções de usuário
export const cadastrarUsuario = async (nome, email, senha) => {
  return handleRequest(
    () => api.post("/usuario/inserir", { nome, email, senha }),
    "Cadastro bem-sucedido:",
    "Erro no cadastro:"
  );
};

export const atualizarUsuario = async (id, nome, email) => {
  return handleRequest(
    () => api.put(`/usuario/editar/${id}`, { nome, email }),
    "Edição do usuário bem-sucedida:",
    "Erro na edição de pet:"
  );
};

// Funções de pet
export const cadastrarPet = async (nome, raca, idade, peso, tipo, usuarioId) => {
  return handleRequest(
    () => api.post("/pet/inserir", { nome, raca, idade, peso, tipo, usuarioId }),
    "Cadastro de pet bem-sucedido:",
    "Erro no cadastro de pet:"
  );
};

export const listarPet = async (usuarioId, nome, raca, idade) => {
  return handleRequest(
    () => api.get("/pet/listar", { params: { usuarioId, nome, raca, idade } }),
    "Listagem de pets bem-sucedida:",
    "Erro na listagem de pets:"
  );
};

export const atualizarPet = async (id, nome, raca, idade, peso, tipo, usuarioId) => {
  return handleRequest(
    () => api.put(`/pet/editar/${id}`, { nome, raca, idade, peso, tipo, usuarioId }),
    "Edição de pet bem-sucedida:",
    "Erro na edição de pet:"
  );
};

export const excluirPet = async (id) => {
  return handleRequest(
    () => api.delete(`/pet/excluir/${id}`),
    "Exclusão de pet bem-sucedida:",
    "Erro na exclusão de pet:"
  );
};

// Funções de alarme
export const cadastrarAlarme = async (nome, tipoAlarme, data, status, usuarioId, comedouroId) => {
  return handleRequest(
    () => api.post("/alarme/inserir", { nome, tipoAlarme, data, status, usuarioId, comedouroId }),
    "Cadastro de alarme bem-sucedido:",
    "Erro no cadastro de alarme:"
  );
};

export const atualizarAlarme = async (id, nome, tipoAlarme, data, status, usuarioId, comedouroId) => {
  return handleRequest(
    () => api.put(`/alarme/editar/${id}`, { nome, tipoAlarme, data, status, usuarioId, comedouroId }),
    "Edição de alarme bem-sucedida:",
    "Erro na edição de alarme:"
  );
};

export const excluirAlarme = async (id) => {
  return handleRequest(
    () => api.delete(`/alarme/excluir/${id}`),
    "Exclusão de alarme bem-sucedida:",
    "Erro na exclusão de alarme:"
  );
};

export const listarAlarme = async (usuarioId, nome, tipoAlarme, data, status, comedouroId) => {
  return handleRequest(
    () => api.get("/alarme/listar", { params: { usuarioId, nome, tipoAlarme, data, status, comedouroId } }),
    "Listagem de alarmes bem-sucedida:",
    "Erro na listagem de alarmes:"
  );
};

// Funções de pedido
export const cadastrarPedido = async (data, status, produtoId, fornecedorId, usuarioId) => {
  return handleRequest(
    () => api.post("/pedido/inserir", { data, status, produtoId, fornecedorId, usuarioId }),
    "Cadastro de pedido bem-sucedido:",
    "Erro no cadastro de pedido:"
  );
};

export const listarPedido = async (usuarioId, data, status, produtoId, preco, fornecedorId) => {
  return handleRequest(
    () => api.get("/pedido/listar", { params: { usuarioId, data, status, produtoId, preco, fornecedorId } }),
    "Listagem de pedidos bem-sucedida:",
    "Erro na listagem de pedidos:"
  );
};

// Funções de fornecedor
export const cadastrarFornecedor = async (data, status, produtoId, fornecedorId, usuarioId) => {
  return handleRequest(
    () => api.post("/fornecedor/inserir", { data, status, produtoId, fornecedorId, usuarioId }),
    "Cadastro de fornecedor bem-sucedido:",
    "Erro no cadastro de fornecedor:"
  );
};

export const listarFornecedor = async (usuarioId, data, status, produtoId, preco, fornecedorId) => {
  return handleRequest(
    () => api.get("/fornecedor/listar", { params: { usuarioId, data, status, produtoId, preco, fornecedorId } }),
    "Listagem de fornecedores bem-sucedida:",
    "Erro na listagem de fornecedores:"
  );
};