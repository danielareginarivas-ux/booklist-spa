import {
  getBooks,
  addBook,
  updateBook,
  deleteBook
} from '../../services/booksService'

export default {
  namespaced: true,

  state: () => ({
    libros: [],
    loading: false,
    error: ''
  }),

  mutations: {
    SET_LIBROS(state, libros) {
      state.libros = libros
    },

    AGREGAR_LIBRO(state, libro) {
      state.libros.push(libro)
    },

    ACTUALIZAR_LIBRO(state, libroActualizado) {
  const index = state.libros.findIndex(
    libro => libro.id === libroActualizado.id
  )

  if (index !== -1) {
    state.libros[index] = libroActualizado
  }
},

ELIMINAR_LIBRO(state, id) {
  state.libros = state.libros.filter(
    libro => libro.id !== id
  )
},


    SET_LOADING(state, valor) {
      state.loading = valor
    },

    SET_ERROR(state, mensaje) {
      state.error = mensaje
    }
  },

  actions: {
    async cargarLibros({ commit }) {
      commit('SET_LOADING', true)
      commit('SET_ERROR', '')

      try {
        const libros = await getBooks()
        commit('SET_LIBROS', libros)
      } catch (error) {
        console.error(error)
        commit('SET_ERROR', 'Error al cargar los libros.')
      } finally {
        commit('SET_LOADING', false)
      }
    },

    async agregarLibro({ commit }, libro) {
      try {
        const nuevoLibro = await addBook(libro)
        commit('AGREGAR_LIBRO', nuevoLibro)
        return nuevoLibro
      } catch (error) {
        console.error(error)
        throw error
      }
    },
  

      async actualizarLibro({ commit }, { id, datos }) {
      try {
        const libroActualizado = await updateBook(id, datos)
        commit('ACTUALIZAR_LIBRO', libroActualizado)
        return libroActualizado
      } catch (error) {
        console.error(error)
        throw error
      }
    },


    async eliminarLibro({ commit }, id) {
      try {
        await deleteBook(id)
        commit('ELIMINAR_LIBRO', id)
      } catch (error) {
        console.error(error)
        throw error
      }
    }
  }, 

  getters: {
    todosLosLibros(state) {
      return state.libros
    },

    librosFiltrados: (state, getters, rootState) => {
      const busqueda = rootState.filtros.busqueda.toLowerCase()
      const categoria = rootState.filtros.categoriaSeleccionada

      return state.libros.filter(libro => {
        const coincideBusqueda =
          libro.titulo.toLowerCase().includes(busqueda) ||
          libro.autor.toLowerCase().includes(busqueda)

        const coincideCategoria =
          !categoria || libro.categoria === categoria

        return coincideBusqueda && coincideCategoria
      })
    }
  }
}