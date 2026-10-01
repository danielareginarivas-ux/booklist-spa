import { createStore } from 'vuex'
import libros from './modules/libros'
import filtros from './modules/filtros'
import favoritos from './modules/favoritos'

export default createStore({
  modules: {
    libros,
    filtros,
    favoritos
  }
})