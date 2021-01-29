// const form = document.querySelector('form')

// const input = document.querySelector('input')

// const result = document.querySelector('span')

// form.addEventListener('submit', (e) => {
//   e.preventDefault()
//   if (!input.value) {
//     return
//   }
//   let arr = input.value.split(' ')
//   arr = arr.map(number => +number)
//   let count = 1
//   let start = 0
//   let max = 0
//   let startMax = 0
//   for (let i = 1; i < arr.length; i++) {
//     if (arr[i] < arr[i - 1]) {
//       count++
//     } else {
//       if (count > max) {
//         max = count
//         startMax = start
//       }
//       count = 1
//       start = i
//     }
//   }
//   if (count > max) {
//     max = count
//     startMax = start
//   }
//   result.innerText = `Самая долгая убывающая подстрока: ${arr.slice(startMax, startMax + max)}`
// })

export function substr(str) {
  str = str.trim()
  let arr = str.split(' ')
  arr = arr.map((number) => +number)
  let count = 1
  let start = 0
  let max = 0
  let startMax = 0
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] < arr[i - 1]) {
      count++
    } else {
      if (count > max) {
        max = count
        startMax = start
      }
      count = 1
      start = i
    }
  }
  if (count > max) {
    max = count
    startMax = start
  }
  return `Самая долгая убывающая подстрока: ${arr.slice(
    startMax,
    startMax + max
  )}`
}
