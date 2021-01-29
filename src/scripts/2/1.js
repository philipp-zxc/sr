// class Hash {
//   constructor() {
//     this.table = Array(10)
//     this.hash = function (key) {
//       return Math.trunc(
//         this.table.length * (key * 0.256 - Math.floor(key * 0.256))
//       )
//     }
//   }

//   add(data) {
//     if (!this.table[this.hash(data.name.length)])
//       this.table[this.hash(data.name.length)] = {}
//     this.table[this.hash(data.name.length)][data.name] = data.job
//   }

//   remove(name) {
//     if (!this.table[this.hash(name.length)]) return
//     if (this.table[this.hash(name.length)].hasOwnProperty(name)) {
//       delete this.table[this.hash(name.length)][name]
//     }
//   }

//   getJob(name) {
//     if (
//       this.table[this.hash(name.length)] &&
//       this.table[this.hash(name.length)].hasOwnProperty(name)
//     )
//       return this.table[this.hash(name.length)][name]
//   }
// }

// const hash = new Hash()

// const fs = require('fs')
// const file = fs.readFileSync('./workers.txt', 'utf-8')
// const workers = file.split(';')
// for (const worker of workers) {
//   ;[name, job] = worker.split(':')
//   hash.add({ name: name, job: job })
// }
// console.log('HASH TABLE:', hash.table)
// console.log('GET JOB:', hash.getJob('Philipp'))
// hash.remove('Philipp')
// console.log('HASH TABLE AFTER REMOVE:', hash.table)

class Tree {
  constructor() {
    this.root = null
  }

  createNode(data) {
    return {
      data: data,
      left: null,
      right: null,
    }
  }

  insert(number = 0, fio = 'FIO', group = 'GROUP', avg = 0) {
    const newNode = this.createNode({
      number: number,
      fio: fio,
      group: group,
      avg: avg,
    })
    if (this.root === null) {
      this.root = newNode
      return
    }
    this.insertNode(newNode, this.root)
  }

  insertNode(newNode, node) {
    if (newNode.data.number < node.data.number) {
      if (node.left === null) {
        node.left = newNode
      } else {
        this.insertNode(newNode, node.left)
      }
    } else {
      if (node.right === null) {
        node.right = newNode
      } else {
        this.insertNode(newNode, node.right)
      }
    }
  }

  traverse(callback, node = this.root) {
    if (node != null) {
      this.traverse(callback, node.left)
      callback(node.data)
      this.traverse(callback, node.right)
    }
  }

  search(data, node = this.root) {
    if (node === null) {
      return null
    }
    if (data < node.data.number) {
      return this.search(data, node.left)
    }
    if (data > node.data.number) {
      return this.search(data, node.right)
    }
    return node
  }

  minNode(node = this.root) {
    if (node.left === null) {
      return node
    }
    return this.minNode(node.left)
  }

  remove(data) {
    this.root = this.removeNode(data)
  }

  removeNode(data, node = this.root) {
    if (node === null) {
      return null
    }
    if (data < node.data.number) {
      node.left = this.removeNode(data, node.left)
      return node
    }
    if (data > node.data.number) {
      node.right = this.removeNode(data, node.right)
      return node
    }
    if (node.left === null && node.right === null) {
      node = null
      return node
    }
    if (node.left === null) {
      node = node.right
      return node
    }
    if (node.right === null) {
      node = node.left
      return node
    }
    const newNode = this.minNode(node.right)
    node.data = newNode.data
    node.right = this.removeNode(newNode.data, node.right)
    return node
  }

  worst() {
    let min = 100
    let minNode = null
    this.traverse((node) => {
      if (node.avg < min) {
        min = node.avg
        minNode = node
      }
    })
    return minNode
  }

  best() {
    let max = 0
    let maxNode = null
    this.traverse((node) => {
      if (node.avg > max) {
        max = node.avg
        maxNode = node
      }
    })
    return maxNode
  }

  find(number) {
    return this.search(number).data.fio
  }
}
// const tree = new Tree()
// tree.insert(12, 'Philipp', '1', 100)
// tree.insert(6, 'usr2', '1', 59)
// tree.insert(32, 'user3', '2', 90)
// tree.insert(5, 'user4', '2', 81)
// console.log('Список студентов:')
// tree.traverse((node) => console.log(node))
// console.log('Худший средний балл: ', tree.worst())
// console.log('Лучший средний балл: ', tree.best())
// console.log('Студент с номером зачетки 6: ', tree.find(6))
// tree.remove(5)
// console.log('Список студентов после удаления студента с номером зачетки 5:')
// tree.traverse((node) => console.log(node))

export { Tree }
