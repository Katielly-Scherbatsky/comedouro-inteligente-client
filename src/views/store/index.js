import api from '../../services/api'

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

export const cadastrarUsuario = async (nome, email, senha) => {
  try {
    const response = await api.post("/usuario/inserir", {
      nome: nome,
      email: email,
      senha: senha,
    })

    if (response.status === 201) {
      window.console.log("Cadastro bem-sucedido:", response.data)
      return response.data
    } else {
      window.console.error("Erro no cadastro:", response.status)
      return null
    }
  } catch (error) {
    window.console.error("Erro na requisição:", error)
    return null
  }
}

export const cadastrarPet = async (nome, raca, idade, peso, usuarioId) => {
  try {
    const response = await api.post("/pet/inserir", {
      nome: nome,
      raca: raca,
      idade: idade,
      peso: peso,
      usuarioId: usuarioId,
    })

    if (response.status === 201) {
      window.console.log("Cadastro bem-sucedido:", response.data)
      return response.data
    } else {
      window.console.error("Erro no cadastro:", response.status)
      return null
    }
  } catch (error) {
    window.console.error("Erro na requisição:", error)
    return null
  }
}

export const listarPet = async (usuarioId, nome, raca, idade) => {
  try {
    const response = await api.get("/pet/listar", {
      usuarioId: usuarioId,
      nome: nome,
      raca: raca,
      idade: idade,
    })

    if (response.status === 200) {
      return response.data
    } else {
      window.console.error("Erro na listagem:", response.status)
      return null
    }
  } catch (error) {
    window.console.error("Erro na requisição:", error)
    return null
  }
}

export const cadastrarAlarme = async (nome, raca, idade, peso, usuarioId) => {
  try {
    const response = await api.post("/alarme/inserir", {
      nome: nome,
      raca: raca,
      idade: idade,
      peso: peso,
      usuarioId: usuarioId,
    })

    if (response.status === 201) {
      window.console.log("Cadastro bem-sucedido:", response.data)
      return response.data
    } else {
      window.console.error("Erro no cadastro:", response.status)
      return null
    }
  } catch (error) {
    window.console.error("Erro na requisição:", error)
    return null
  }
}

export const listarAlarme = async (usuarioId, nome, raca, idade) => {
  try {
    const response = await api.get("/alarme/listar", {
      usuarioId: usuarioId,
      nome: nome,
      raca: raca,
      idade: idade,
    })

    if (response.status === 200) {
      return response.data
    } else {
      window.console.error("Erro na listagem:", response.status)
      return null
    }
  } catch (error) {
    window.console.error("Erro na requisição:", error)
    return null
  }
}

export const cadastrarPedido = async (data, status, produtoId, fornecedorId, usuarioId) => {
  try {
    const response = await api.post("/pedido/inserir", {
      data: data,
      status: status,
      produtoId: produtoId,
      fornecedorId: fornecedorId,
      usuarioId: usuarioId,
    })

    if (response.status === 201) {
      window.console.log("Cadastro bem-sucedido:", response.data)
      return response.data
    } else {
      window.console.error("Erro no cadastro:", response.status)
      return null
    }
  } catch (error) {
    window.console.error("Erro na requisição:", error)
    return null
  }
}

export const listarPedido = async (usuarioId, data, status, produtoId, preco, fornecedorId) => {
  try {
    const response = await api.get("/pedido/listar", {
      usuarioId: usuarioId,
      data: data,
      status: status,
      produtoId: produtoId,
      preco: preco,
      fornecedorId: fornecedorId,
    })

    if (response.status === 200) {
      return response.data
    } else {
      window.console.error("Erro na listagem:", response.status)
      return null
    }
  } catch (error) {
    window.console.error("Erro na requisição:", error)
    return null
  }
}

export const cadastrarFornecedor = async (data, status, produtoId, fornecedorId, usuarioId) => {
  try {
    const response = await api.post("/fornecedor/inserir", {
      data: data,
      status: status,
      produtoId: produtoId,
      fornecedorId: fornecedorId,
      usuarioId: usuarioId,
    })

    if (response.status === 201) {
      window.console.log("Cadastro bem-sucedido:", response.data)
      return response.data
    } else {
      window.console.error("Erro no cadastro:", response.status)
      return null
    }
  } catch (error) {
    window.console.error("Erro na requisição:", error)
    return null
  }
}

export const listarFornecedor = async (usuarioId, data, status, produtoId, preco, fornecedorId) => {
  try {
    const response = await api.get("/fornecedor/listar", {
      usuarioId: usuarioId,
      data: data,
      status: status,
      produtoId: produtoId,
      preco: preco,
      fornecedorId: fornecedorId,
    })

    if (response.status === 200) {
      return response.data
    } else {
      window.console.error("Erro na listagem:", response.status)
      return null
    }
  } catch (error) {
    window.console.error("Erro na requisição:", error)
    return null
  }
}