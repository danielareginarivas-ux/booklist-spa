import { createRouter, createMemoryHistory } from 'vue-router'
import { mount } from '@vue/test-utils'
import { createStore } from 'vuex'
import ListaLibros from '../../src/views/ListaLibros.vue'

describe('ListaLibros.vue', () => {
  test('muestra un mensaje visual cuando ocurre un error al cargar la API', async () => {
    const store = createStore({
      modules: {
        libros: {
          namespaced: true,

          state: () => ({
            libros: [],
            loading: false,
            error: 'Error al cargar los libros.'
          }),

          actions: {
            cargarLibros: jest.fn()
          },

          getters: {
            librosFiltrados: () => []
          }
        },

        filtros: {
          namespaced: true,

          state: () => ({
            busqueda: '',
            categoriaSeleccionada: ''
          }),

          actions: {
            actualizarBusqueda: jest.fn(),
            actualizarCategoria: jest.fn()
          }
        },

        favoritos: {
          namespaced: true,

          state: () => ({
            favoritos: []
          }),

          getters: {
            cantidadFavoritos: () => 0
          }
        }
      }
    })

    const router = createRouter({
  history: createMemoryHistory(),
  routes: [
    {
      path: '/libros',
      component: ListaLibros
    }
  ]
})

await router.push('/libros')
await router.isReady()

    const wrapper = mount(ListaLibros, {
      global: {
  plugins: [store, router],

        
        stubs: {
          RouterLink: true,
          FormularioLibro: true,
          Libro: true
        }
      }
    })

    await wrapper.vm.$nextTick()

    expect(wrapper.text()).toContain('Error al cargar los libros.')
  })
})