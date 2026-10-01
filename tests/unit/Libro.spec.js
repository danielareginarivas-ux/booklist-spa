import { mount } from '@vue/test-utils'
import { createStore } from 'vuex'
import Libro from '../../src/components/Libro.vue'

describe('Libro.vue', () => {
  test('renderiza correctamente los datos del libro', () => {
    const store = createStore({
      modules: {
        favoritos: {
          namespaced: true,

          state: () => ({
            favoritos: []
          }),

          actions: {
            alternarFavorito: jest.fn()
          },

          getters: {
            esFavorito: () => () => false
          }
        }
      }
    })

    const libro = {
      id: '1',
      titulo: 'Cien años de soledad',
      autor: 'Gabriel García Márquez',
      categoria: 'Novela',
      descripcion: 'Historia de la familia Buendía.'
    }

    const wrapper = mount(Libro, {
      props: {
        libro
      },

      global: {
        plugins: [store],

        stubs: {
          RouterLink: {
            template: '<a><slot /></a>'
          }
        }
      }
    })

    expect(wrapper.text()).toContain('Cien años de soledad')
    expect(wrapper.text()).toContain('Gabriel García Márquez')
    expect(wrapper.text()).toContain('Novela')
    expect(wrapper.text()).toContain('Historia de la familia Buendía.')
  })
})