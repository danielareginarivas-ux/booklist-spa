import { reactive } from 'vue'

let nextId = 4

export const libroStore = reactive({
  libros: [
    {
      id: 1,
      titulo: 'Cien años de soledad',
      autor: 'Gabriel García Márquez',
      categoria: 'Novela',
      descripcion: 'La historia de la familia Buendía a lo largo de siete generaciones en el pueblo ficticio de Macondo.'
    },
    {
      id: 2,
      titulo: 'Fundación',
      autor: 'Isaac Asimov',
      categoria: 'Ciencia ficción',
      descripcion: 'KEl matemático Hari Seldon predice la caída inevitable del Imperio Galáctico y una era de tinieblas de 30.000 años. Para acortar ese período, crea la Fundación, un grupo dedicado a preservar el conocimiento humano.'
    },
    {
      id: 3,
      titulo: 'La realidad no es lo que parece',
      autor: 'Carlo Rovelli',
      categoria: 'Ensayo',
      descripcion: 'Un ensayo fascinante sobre la evolución de la física, desde la antigua Grecia hasta la gravedad cuántica de bucles, que explica de forma sencilla cómo ha cambiado nuestra percepción del espacio y del tiempo.'
    }
  ],

  agregarLibro(libro) {
    this.libros.push({
      id: nextId++,
      ...libro
    })
  },

  actualizarLibro(id, datos) {
    const libro = this.libros.find(l => l.id === Number(id))
    if (libro) {
      Object.assign(libro, datos)
    }
  },

  eliminarLibro(id) {
    const index = this.libros.findIndex(l => l.id === Number(id))
    if (index !== -1) {
      this.libros.splice(index, 1)
    }
  },

  obtenerPorId(id) {
    return this.libros.find(l => l.id === Number(id))
  }
})
