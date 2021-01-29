// const graph = [
//   [0, 7, 9, 0, 0, 14],
//   [7, 0, 10, 15, 0, 0],
//   [9, 10, 0, 11, 0, 2],
//   [0, 15, 11, 0, 6, 0],
//   [0, 0, 0, 6, 0, 9],
//   [14, 0, 2, 0, 9, 0],
// ]

// const SIZE = graph.length

// console.log('Матрица смежности:', graph)

// const beginIndex = 0
// const range = 11

// console.log('Range:', range)

// const d = Array(SIZE).fill(Infinity)
// const visited = Array(SIZE).fill(1)

// let minIndex, min, temp

// d[beginIndex] = 0

// do {
//   minIndex = Infinity
//   min = Infinity
//   for (let i = 0; i < SIZE; i++) {
//     if (visited[i] === 1 && d[i] < min) {
//       min = d[i]
//       minIndex = i
//     }
//   }
//   if (minIndex < Infinity) {
//     for (let i = 0; i < SIZE; i++) {
//       if (graph[minIndex][i] > 0) {
//         temp = min + graph[minIndex][i]
//         if (temp < d[i]) {
//           d[i] = temp
//         }
//       }
//     }
//     visited[minIndex] = 0
//   }
// } while (minIndex < Infinity)

// console.log('Растояние к каждой вершине', d)
// let result = []
// let result2 = []
// d.forEach((item, index) => (item <= range ? result.push(index) : null))
// d.forEach((item, index) => (item == range ? result2.push(index) : null))
// console.log('Вершины в радиусе ' + range + ':', result)
// console.log('Вершины на расстоянии ' + range + ':', result2)

export const calc = (matrix, beginIndex, range) => {
  const d = Array(matrix.length).fill(Infinity)
  const visited = Array(matrix.length).fill(1)

  let minIndex, min, temp

  d[beginIndex] = 0

  do {
    minIndex = Infinity
    min = Infinity
    for (let i = 0; i < matrix.length; i++) {
      if (visited[i] === 1 && d[i] < min) {
        min = d[i]
        minIndex = i
      }
    }
    if (minIndex < Infinity) {
      for (let i = 0; i < matrix.length; i++) {
        if (matrix[minIndex][i] > 0) {
          temp = min + matrix[minIndex][i]
          if (temp < d[i]) {
            d[i] = temp
          }
        }
      }
      visited[minIndex] = 0
    }
  } while (minIndex < Infinity)
  let result = []
  let result2 = []
  d.forEach((item, index) => (item <= range ? result.push(index) : null))
  d.forEach((item, index) => (item == range ? result2.push(index) : null))
  return 'Вершины в радиусе ' + range + ':' + result
  console.log('Вершины на расстоянии ' + range + ':', result2)
}
