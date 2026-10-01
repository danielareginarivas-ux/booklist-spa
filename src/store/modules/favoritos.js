export default {
  namespaced: true,

  state: () => ({
    favoritos: []
  }),

  mutations: {
    AGREGAR_FAVORITO(state, id) {
      state.favoritos.push(id)
    },

    ELIMINAR_FAVORITO(state, id) {
      state.favoritos = state.favoritos.filter(
        favoritoId => favoritoId !== id
      )
    }
  },

  actions: {
    alternarFavorito({ state, commit }, id) {
      if (state.favoritos.includes(id)) {
        commit('ELIMINAR_FAVORITO', id)
      } else {
        commit('AGREGAR_FAVORITO', id)
      }
    }
  },

  getters: {
    esFavorito: (state) => (id) => {
      return state.favoritos.includes(id)
    },

    cantidadFavoritos(state) {
      return state.favoritos.length
    }
  }
}