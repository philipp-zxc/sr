const matrix = [
  [0, 25, Infinity, Infinity, 17],
  [25, 0, 10, Infinity, Infinity],
  [Infinity, 10, 0, 5, 10],
  [Infinity, Infinity, 5, 0, Infinity],
  [17, Infinity, 10, 10, 0],
]

export function getData() {
  return [
    [0, 25, Infinity, Infinity, 17],
    [25, 0, 10, Infinity, Infinity],
    [Infinity, 10, 0, 5, 10],
    [Infinity, Infinity, 5, 0, Infinity],
    [17, Infinity, 10, 10, 0],
  ]
}

export function f(matrix) {
  // console.log('Map matrix:', matrix)
  const v = matrix.length
  const path = []
  for (let i = 0; i < v; i++) {
    path.push(new Array(v).fill(null))
    for (let j = 0; j < v; j++) {
      if (matrix[i][j] != Infinity) path[i][j] = j
    }
  }
  for (let k = 0; k < v; k++) {
    for (let i = 0; i < v; i++) {
      for (let j = 0; j < v; j++) {
        if (matrix[i][j] > matrix[i][k] + matrix[k][j]) {
          matrix[i][j] = matrix[i][k] + matrix[k][j]
          path[i][j] = path[i][k]
        }
      }
    }
  }
  return { matrix, path }
}

export function path(path, u, v) {
  if (path[u][v] === null) {
    return []
  }
  const result = [u]
  while (u !== v) {
    u = path[u][v]
    result.push(u)
  }
  return result
}

// const result = f(getData())
// console.log('paths: ', result.path)
// const start = 3;
// const end = 0;
// console.log(`path from ${start} to ${end}`, path(result.path, start, end))

export const dijkstra = function (graph, start) {
  const v = graph.length
  const distances = new Array(v).fill(Infinity)
  distances[start] = 0
  const prevs = new Array(v).fill(null)
  prevs[start] = start
  const visited = new Array(v).fill(false)

  while (true) {
    let shortestDistance = Infinity
    let shortestIndex = -1
    for (let i = 0; i < v; i++) {
      if (distances[i] < shortestDistance && !visited[i]) {
        shortestDistance = distances[i]
        shortestIndex = i
      }
    }
    if (shortestIndex === -1) {
      return { distances, prevs }
    }
    for (let i = 0; i < v; i++) {
      if (
        graph[shortestIndex][i] !== 0 &&
        distances[i] > distances[shortestIndex] + graph[shortestIndex][i]
      ) {
        distances[i] = distances[shortestIndex] + graph[shortestIndex][i]
        prevs[i] = shortestIndex
      }
    }
    visited[shortestIndex] = true
  }
}

export function _path(path, u, v) {
  if (path[v] === null) {
    return []
  }
  const result = [u]
  while (u !== v) {
    u = path[u]
    result.push(u)
  }
  return result.reverse()
}

// const input = getData();
// const start = 0
// const end = 5
// const result = dijkstra(input, start)
// const result2 = _path(result.prevs, 5, 0)
// console.log('mapMatrix:', input)
// console.log('distances:', result.distances)
// console.log(`path from ${start} to ${end}:`, result2)
