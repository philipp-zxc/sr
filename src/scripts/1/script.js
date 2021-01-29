class List {
  constructor(data) {
    this._count = 0
    this.first = null
    this.last = null
    if (data != undefined) {
      this.addHead(data)
    }
  }

  _createNode(data, prev, next) {
    return {
      data: data,
      prev: prev,
      next: next,
    }
  }

  isEmpty() {
    return this._count === 0
  }

  getNode(index) {
    if (this.isEmpty()) throw new Error('List is empty!')
    if (index < this._count / 2) {
      let current = this.first
      for (let i = 0; i < index; i++) {
        current = current.next
      }
      return current
    } else {
      let current = this.last
      for (let i = this._count - 1; i > index; i--) {
        current = current.prev
      }
      return current
    }
  }

  addHead(data) {
    const node = this._createNode(data, null, this.first)
    if (this.isEmpty) this.last = node
    else this.first.prev = node
    this.first = node
    this._count++
    return this
  }

  addTail(data) {
    const node = this._createNode(data, this.last, null)
    if (this.isEmpty()) this.first = node
    else this.last.next = node
    this.last = node
    this._count++
    return this
  }

  add(data, index) {
    const currentNode = this.getNode(index)
    const node = this._createNode(data, currentNode, currentNode.next)
    currentNode.next = node
    node.next.prev = node
    this._count++
    return this
  }

  shift() {
    this.first = this.first.next
    this.first.prev = null
    this._count--
    return this
  }

  pop() {
    this.last = this.last.prev
    this.last.next = null
    this._count--
    return this
  }

  remove(index) {
    const node = this.getNode(index)
    node.prev.next = node.next
    node.next.prev = node.prev
    this._count--
    return this
  }

  toArray() {
    const result = []
    let current = this.first
    while (current) {
      result.push(current.data)
      current = current.next
    }
    return result
  }

  toArrayTail() {
    return this.toArray().reverse()
  }

  showNodes() {
    console.log(this.toArray())
  }

  showNodesTail() {
    console.log(this.toArrayTail())
  }
}

class Heap {
  constructor(data) {
    this._arr = []
    if (Array.isArray(data)) this.build(data)
    else if (data) this.add(data)
  }

  get heapSize() {
    return this._arr.length
  }

  add(data) {
    this._arr.push(data)
    let i = this.heapSize - 1
    let parent = Math.ceil((i - 1) / 2)
    while (i > 0 && this._arr[parent] < this._arr[i]) {
      let temp = this._arr[i]
      this._arr[i] = this._arr[parent]
      this._arr[parent] = temp
      i = parent
      parent = Math.ceil((i - 1) / 2)
    }
  }

  heapify(i) {
    let leftChild, rightChild, largestChild
    while (true) {
      leftChild = 2 * i + 1
      rightChild = 2 * i + 2
      largestChild = i
      if (
        leftChild < this.heapSize &&
        this._arr[leftChild] > this._arr[largestChild]
      ) {
        largestChild = leftChild
      }
      if (
        rightChild < this.heapSize &&
        this._arr[rightChild] > this._arr[largestChild]
      ) {
        largestChild = rightChild
      }
      if (largestChild === i) {
        break
      }

      let temp = this._arr[i]
      this._arr[i] = this._arr[largestChild]
      this._arr[largestChild] = temp
      i = largestChild
    }
  }

  build(data) {
    this._arr = data

    for (let i = this.heapSize / 2; i >= 0; i--) {
      this.heapify(i)
    }
  }

  getMax() {
    let result = this._arr[0]
    this._arr[0] = this._arr[this.heapSize - 1]
    this._arr.pop()
    this.heapify(0)
    return result
  }

  getHeap() {
    return this._arr
  }

  showHeap() {
    console.log(this._arr)
  }
}

class Students extends List {
  constructor(fio, address, avg, gender, birthday) {
    if (arguments.length > 0) {
      super({
        fio: fio,
        address: address,
        avg: avg,
        gender: gender,
        birthday: birthday,
      })
    } else {
      super()
    }
  }

  addTail(fio, address, avg, gender, day, month, year) {
    super.addTail({
      fio: fio,
      address: address,
      avg: avg,
      gender: gender,
      birthday: new Date(year, month, day),
    })
  }
}

function byMonth(students) {
  const months = [
    'jan',
    'feb',
    'mar',
    'apr',
    'may',
    'jun',
    'jul',
    'aug',
    'sep',
    'oct',
    'nov',
    'dec',
  ]
  let result = months.map((month) => {
    const result = {
      month: month,
      count: 0,
      toString() {
        return this.count
      },
    }
    return result
  })
  for (let i = 0; i < students._count; i++) {
    result[students.getNode(i).data.birthday.getMonth()].count++
  }
  return sort(result)
}

function sort(input) {
  const heap = new Heap(input)
  const result = []
  const numberOfEls = heap.heapSize
  for (let i = 0; i < numberOfEls; i++) {
    result.push(heap.getMax())
  }
  return result.map((item) => item.month)
}

// let heap = new Heap([1, 2, 3, 6, 10, -2]);

// const students = new Students;
// students.addTail('1', 'address', 'avg', 'M', 11, 10, 2000);
// students.addTail('2', 'address2', 'avg', 'M', 9, 3, 2000);
// students.addTail('3', 'address3', 'avg', 'F', 25, 5, 2000);
// students.addTail('4', 'address4', 'avg', 'M', 11, 5, 2000);
// students.addTail('5', 'address5', 'avg', 'M', 9, 3, 2000);
// students.addTail('6', 'address6', 'avg', 'F', 19, 3, 2000);
// students.addTail('7', 'address7', 'avg', 'F', 14, 6, 2000);
// console.log(students.showNodes());

// console.log(byMonth(students));
export { Students, byMonth }
