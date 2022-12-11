class Node {
  constructor(valor) {
    this.valor = valor
    this.derecha = null
    this.izquierda = null
  }
}

class Tree {
  constructor() {
    this.raiz = null
  }

  isEmpty() {
    if (this.raiz === null)
      return true
    else
      return false
  }

  Agregar(valor, node = this.raiz) {
    if (!node) {
      this.raiz = new Node(valor)
      return
    }
    if (valor < node.valor) {
      if (node.izquierda) {
        return this.Agregar(valor, node.izquierda)
      }
      node.izquierda = new Node(valor)
      return
    } else { // vamos hacia la derecha
      if (node.derecha) {
        return this.Agregar(valor, node.derecha)
      }
      node.derecha = new Node(valor)
      return
    }
  }

  Buscar(valor) {
    if (this.isEmpty()) {
      return null
    }

    let aux = this.raiz
    if (aux.valor === valor) {
      return aux
    }

    while (aux) {
      // si encontramos el nodo con el valor
      // paramos de iterar.
      if (aux.valor === valor) {
        break
      }
      // seguimos buscando a la derecha
      if (aux.valor < valor) {
        aux = aux.derecha
      } else if (aux.valor > valor) {
        // seguimos buscando a la izquierda
        aux = aux.izquierda
      }
    }
    // retornamos el nodo encontrado.
    // si no encontramos el nodo con el valor
    // aux, toma el valor null.
    return aux
  }

  BuscarRecursive(valor, node = this.raiz) {
    if (node.valor === valor) {
      return node
    }

    if (node.valor < valor) {
      return this.BuscarRecursive(valor, node.derecha)
    } else if (node.valor > valor) {
      return this.BuscarRecursive(valor, node.izquierda)
    }
  }

  BuscarMin(node = this.raiz) {
    if (!this.isEmpty()) {
      /**
        * siempre a la izquierda de cualquier nodo
        * estará el menor valor.
        * iteramos hasta el último menor.
        */
      while (node.izquierda) {
        node = node.izquierda
      }
      return node
    }
  }

  Eliminar(valor, node = this.raiz) {
    if (!node) {
      return null
    }
    if (node.valor === valor) {
      // no tiene hijos
      if (!node.izquierda && !node.derecha) {
        return null
      }
      // no tiene hijo izquierdo
      if (!node.izquierda) {
        return node.derecha
      }
      // no tiene hijo derecho
      if (!node.derecha) {
        return node.izquierda
      }

      // tiene dos hijos
      // buscamos el menor de los hijos
      let temp = this.BuscarMin(node.derecha)
      // con ese valor reemplazamos el valor del nodo que queremos eliminar.
      node.valor = temp.valor;
      // seguimos iterando para reemplazar la rama que cambio,
      // eliminando el nodo que está repetido
      node.derecha = this.Eliminar(temp.valor, node.derecha)
      return node;
    }
    // buscamos a la derecha
    if (node.valor < valor) {
      node.derecha = this.Eliminar(valor, node.derecha)
      return node
    }
    // buscamos a la izquierda
    if (node.valor > valor) {
      node.izquierda = this.Eliminar(valor, node.izquierda)
      return node
    }
  }
  print(node = this.raiz) {
    if (!node) {
      return
    }
    this.print(node.izquierda)
    console.log(node.valor)
    this.print(node.derecha)
  }
  /**
    * recorre primero toda la rama izquierda
    * de izquierda al centro.
    * Luego imprime la raíz, y finalmente
    * recorre la rama derecha, del centro hacia
    * la derecha.
    */
  inOrder(node = this.raiz) {
    if (!node) {
      return
    }
    this.inOrder(node.izquierda)
    console.log(node.valor)
    this.inOrder(node.derecha)
  }
  /**
    * Imprime primero la raíz, luego
    * toda la rama izquierda de izquierda al centro.
    * y finalmente recorre la rama derecha,
    * del centro hacia la derecha.
    */
  preOrder(node = this.raiz) {
    if (!node) {
      return
    }
    console.log(node.valor)
    this.preOrder(node.izquierda)
    this.preOrder(node.derecha)
  }
  /**
    * Recorre el árbol de izquierda hacia el centro.
    * Luego del centro hacia la derecha, y finalmente
    * imprime la raíz.
    */
  postOrder(node = this.raiz) {
    if (!node) {
      return
    }
    this.postOrder(node.izquierda)
    this.postOrder(node.derecha)
    console.log(node.valor)
  }
}

//Creamos el Arbol
let arbol = new Tree()
let arr = [5, 2, 3, -4, 12, 9, 21, 19, 25]

for (let i = 0; i < arr.length; i++) {
  arbol.Agregar(arr[i])
}

//Recorremos In-orden
arbol.inOrder()
//Recorremos Pre-orden
arbol.preOrder()
//Recorremos Post-orden
arbol.postOrder()


//borramos el 12
arbol.Eliminar(12)

arbol.inOrder()