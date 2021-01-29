const rates = [
  [1, 0.23, 0.25, 16.43, 18.21, 4.94],
  [4.34, 1, 1.11, 71.4, 79.09, 21.44],
  [3.93, 0.9, 1, 64.52, 71.48, 19.37],
  [0.061, 0.014, 0.015, 1, 1.11, 0.3],
  [0.055, 0.013, 0.014, 0.9, 1, 0.27],
  [0.2, 0.047, 0.052, 3.33, 3.69, 1],
]

const currencies = ['PLN', 'EUR', 'USD', 'RUB', 'INR', 'MXN']

function negateLogarithmConvertor(matrix) {
  return matrix.map((row) => row.map((item) => -Math.log(item)))
}

export function arbitrage(ratesMatrix) {
  const matrix = negateLogarithmConvertor(ratesMatrix)
  let source = 0
  const n = matrix.length
  const minDist = new Array(n).fill(Infinity)
  const pre = new Array(n).fill(-1)
  minDist[source] = source
  for (let _ = 0; _ < n - 1; _++) {
    for (let sourceCurr = 0; sourceCurr < n; sourceCurr++) {
      for (let destCurr = 0; destCurr < n; destCurr++) {
        if (
          minDist[destCurr] >
          minDist[sourceCurr] + matrix[sourceCurr][destCurr]
        ) {
          minDist[destCurr] = minDist[sourceCurr] + matrix[sourceCurr][destCurr]
          pre[destCurr] = sourceCurr
        }
      }
    }
  }

  let result = ''

  for (let sourceCurr = 0; sourceCurr < n; sourceCurr++) {
    for (let destCurr = 0; destCurr < n; destCurr++) {
      if (
        minDist[destCurr] >
        minDist[sourceCurr] + matrix[sourceCurr][destCurr]
      ) {
        let printCycle = [destCurr, sourceCurr]

        while (!printCycle.includes(pre[sourceCurr])) {
          printCycle.push(pre[sourceCurr])
          sourceCurr = pre[sourceCurr]
        }

        printCycle.push(pre[sourceCurr])
        printCycle.reverse()
        result += printCycle.map((index) => currencies[index]).join(' => ')
      }
    }
  }
  return result
}

//arbitrage(currencies, rates)
