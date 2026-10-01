export default {
  namespaced: true,

  state: () => ({
    busqueda: '',
    categoriaSeleccionada: ''
  }),

  mutations: {
    SET_BUSQUEDA(state, valor) {
      state.busqueda = valor
    },

    SET_CATEGORIA(state, categoria) {
      state.categoriaSeleccionada = categoria
    }
  },

  actions: {
    actualizarBusqueda({ commit }, valor) {
      commit('SET_BUSQUEDA', valor)
    },

    actualizarCategoria({ commit }, categoria) {
      commit('SET_CATEGORIA', categoria)
    }
  },

  getters: {
    busqueda(state) {
      return state.busqueda
    },

    categoriaSeleccionada(state) {
      return state.categoriaSeleccionada
    }
  }
}