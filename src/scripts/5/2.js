class Graph {
  constructor(V) {
    this.V = V
    this.adj = new Array(V)
    for (let i = 0; i < V; i++) {
      this.adj[i] = []
    }
  }

  addEdge(v, w) {
    this.adj[v].push(w)
  }

  dfs(v, visited, callback) {
    visited[v] = true
    callback(v)
    for (let i of this.adj[v]) {
      if (!visited[i]) this.dfs(i, visited, callback)
    }
  }

  getTranspose() {
    const g = new Graph(this.V)
    for (let v = 0; v < this.V; v++) {
      for (let i = 0; i < this.adj[v].length; i++) {
        g.adj[this.adj[v][i]].push(v)
      }
    }
    return g
  }

  fillOrder(v, visited, stack) {
    visited[v] = true
    for (let i = 0; i < this.adj[v].length; i++) {
      if (!visited[this.adj[v][i]]) {
        this.fillOrder(this.adj[v][i], visited, stack)
      }
    }
    stack.push(v)
  }

  printSCC() {
    const stack = []
    let result = ''
    const visited = new Array(this.V).fill(false)
    for (let i = 0; i < this.V; i++) {
      if (!visited[i]) {
        this.fillOrder(i, visited, stack)
      }
    }
    const gt = this.getTranspose()
    visited.fill(false)
    while (stack.length) {
      let v = stack.pop()
      if (!visited[v]) {
        gt.dfs(v, visited, (v) => (result += v + ' '))
        result += '\n'
      }
    }
    return result
  }
}

// const g = new Graph(5)
// g.addEdge(1, 0)
// g.addEdge(0, 2)
// g.addEdge(2, 1)
// g.addEdge(0, 3)
// g.addEdge(3, 4)
// console.log(g.adj)
// g.printSCC()

export { Graph }
