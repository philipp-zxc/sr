class Z {
  constructor(totalV, ...bucketsV) {
    this.setV(totalV)
    this.setBucketsV(...bucketsV)
  }

  setV(val) {
    this.totalV = val
  }

  setBucketsV(...vals) {
    this.bucketsV = Array.from(new Set(vals)).sort((a, b) => b - a)
  }

  calc() {
    const buckets = Array.from(this.bucketsV)
    const bucketsMap = new Map()
    for (const bucket of buckets) {
      bucketsMap.set(bucket, 0)
    }
    let current = this.totalV
    let last

    do {
      if (!buckets.length) {
        break
      }
      if (buckets[0] <= current) {
        current -= buckets[0]
        bucketsMap.set(buckets[0], bucketsMap.get(buckets[0]) + 1)
      } else {
        last = buckets.shift()
      }
    } while (current > 0)
    //bucketsMap.set(last, bucketsMap.get(last) + 1)

    return bucketsMap
  }
}

// const a = new Z()

// const readline = require('readline')

// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout,
// })

// rl.question('Input TotalV and BucketsV: ', (answer) => {
//   const answerArr = answer.split(' ').map((item) => +item)
//   a.setV(answerArr.shift())
//   a.setBucketsV(...answerArr)
//   console.log(a.calc())
//   rl.close()
// })

// console.log(a.bucketsV);
// a.setBucketsV(10, 10, 15, 32, 1, 2, 2);
// console.log(a.bucketsV);
// console.log(a.calc());

// const b = new Z(150, 60);
// console.log(b.calc());

export { Z }
