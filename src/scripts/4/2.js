const initial = [
  [0, 3.22, 3.57, 4.12, 4, 4.85],
  [0, 3.33, 4.87, 5.26, 7.34, 9.49],
  [0, 4.27, 7.64, 10.25, 15.93, 16.12],
]

let S = 5
const I = initial.length - 1

const last = initial[I]

const i2Best = []

let etap = 2
for (let i = 0; i < S; i++) {
  const tmp = []
  for (let j = 0; j < etap; j++) {
    tmp.push(initial[1][j] + last[i - j + 1])
  }
  let best = 0
  let bestI2 = -1
  tmp.forEach((item, index) => {
    if (item > best) {
      best = item
      bestI2 = index
    }
  })
  i2Best.push({ item: best, index2: bestI2, index3: i - bestI2 + 1 })
  etap++
}

const i1 = i2Best.slice()
i1.unshift({ item: 0, index2: 0, index3: 0 })

for (let i = 0; i < S + 1; i++) {
  i1[S - i].item += initial[0][i]
  i1[S - i].index1 = i
}

i1.sort((a, b) => b.item - a.item)
const result = i1[0]

export const calc = (matrix) => {
  matrix = matrix.slice()
  const I = 2
  let S = 5
  const last = matrix[I]
  const i2Best = []
  let etap = 2
  for (let i = 0; i < S; i++) {
    const tmp = []
    for (let j = 0; j < etap; j++) {
      tmp.push(matrix[1][j] + last[i - j + 1])
    }
    let best = 0
    let bestI2 = -1
    tmp.forEach((item, index) => {
      if (item > best) {
        best = item
        bestI2 = index
      }
    })
    i2Best.push({ item: best, index2: bestI2, index3: i - bestI2 + 1 })
    etap++
  }
  const i1 = i2Best.slice()
  i1.unshift({ item: 0, index2: 0, index3: 0 })
  for (let i = 0; i < S + 1; i++) {
    i1[S - i].item += matrix[0][i]
    i1[S - i].index1 = i
  }
  i1.sort((a, b) => b.item - a.item)
  const result = i1[0]
  return [
    matrix[0][result.index1],
    matrix[1][result.index2],
    matrix[2][result.index3],
    result.item.toFixed(2),
  ]
}
