// const fs = require('fs');
// const str = fs.readFileSync('./str.txt', 'utf-8');
// const entries = new Map;
// for (let letter of str) {
//   if (!entries.has(letter)) {
//     entries.set(letter, 1);
//   } else {
//     entries.set(letter, entries.get(letter) + 1);
//   }
// }

// const entriesArr = Array.from(entries, item => ({ letter: item[0], entries: item[1], left: null, right: null }));
// entriesArr.sort((item1, item2) => item2.entries - item1.entries);

// while (entriesArr.length > 1) {
//   const item1 = entriesArr.pop();
//   const item2 = entriesArr.pop();
//   entriesArr.push({ letter: null, entries: item1.entries + item2.entries, left: item2, right: item1 });
//   entriesArr.sort((item1, item2) => item2.entries - item1.entries);
// }

// const root = entriesArr[0];

// const table = new Map;

// function search(current, code = '') {
//   if (current.letter) {
//     table.set(current.letter, code);
//   }
//   if (current.left !== null) {
//     search(current.left, code + '0');
//   }
//   if (current.right !== null) {
//     search(current.right, code + '1');
//   }
// }

// search(root);

// let result = '';
// for (const letter of str) {
//   result += table.get(letter);
// }

// const decodeTable = new Map;
// for (const [letter, code] of table.entries()) {
//   decodeTable.set(code, letter);
// }

// let decoded = '';
// let temp = '';
// for (let i = 0; i < result.length; i++) {
//   temp += result[i];
//   if (decodeTable.has(temp)) {
//     decoded += decodeTable.get(temp);
//     temp = '';
//   }
// }

// console.log(table);
// console.log(result);
// console.log(decoded);

class Haffman {
  // constructor(path) {
  //   if (path) this.init(path)
  // }

  // init(path) {
  //   const fs = require('fs')
  //   this.str = fs.readFileSync(path, 'utf-8')
  //   this.__makeFrequencyTable()
  //   this.__makeTree()
  //   this.__makeCodeTable()
  //   this.__encode()
  // }

  static makeFrequencyTable(str) {
    const entries = new Map()
    for (let letter of str) {
      if (!entries.has(letter)) {
        entries.set(letter, 1)
      } else {
        entries.set(letter, entries.get(letter) + 1)
      }
    }
    return Array.from(entries, (item) => ({
      letter: item[0],
      entries: item[1],
      left: null,
      right: null,
    })).sort((item1, item2) => item2.entries - item1.entries)
  }

  static makeTree(frequencyTable) {
    const entriesArr = Array.from(frequencyTable)
    while (entriesArr.length > 1) {
      const item1 = entriesArr.pop()
      const item2 = entriesArr.pop()
      entriesArr.push({
        letter: null,
        entries: item1.entries + item2.entries,
        left: item2,
        right: item1,
      })
      entriesArr.sort((item1, item2) => item2.entries - item1.entries)
    }
    return entriesArr[0]
  }

  static makeCodeTable(root) {
    const table = new Map()
    function search(current, code = '') {
      if (current.letter) {
        table.set(current.letter, code)
      }
      if (current.left !== null) {
        search(current.left, code + '0')
      }
      if (current.right !== null) {
        search(current.right, code + '1')
      }
    }
    search(root)
    return table
  }

  static encode(str, codeTable) {
    let result = ''
    for (const letter of str) {
      result += codeTable.get(letter)
    }
    return result
  }

  save() {
    const fs = require('fs')
    fs.writeFileSync('./result.txt', this.result)
    let codeTableStr = ''
    for (const [letter, code] of this.codeTable.entries()) {
      codeTableStr += letter + '::' + code + '\n'
    }
    fs.writeFileSync('./codeTable.txt', codeTableStr)
  }

  static decode(codeTable, encodedStr) {
    // const fs = require('fs')
    // const str = fs.readFileSync(codeTableFile, 'utf-8')
    // const arr = str.split('\n')
    // const map = new Map()
    // for (const item of arr) {
    //   const [letter, entries] = item.split('::')
    //   if (letter === '') continue
    //   map.set(letter, entries)
    // }
    //this.codeTable = map
    const decodeTable = this.__makeDecodeTable(codeTable)
    const encodedText = encodedStr
    let decoded = ''
    let temp = ''
    for (let i = 0; i < encodedText.length; i++) {
      temp += encodedText[i]
      if (decodeTable.has(temp)) {
        decoded += decodeTable.get(temp)
        temp = ''
      }
    }
    return { decoded, decodeTable }
  }

  static __makeDecodeTable(codeTable) {
    const decodeTable = new Map()
    for (const [letter, code] of codeTable.entries()) {
      decodeTable.set(code, letter)
    }
    return decodeTable
  }
}

export { Haffman }

// console.clear()

// const path = './str.txt'
// const haff = new Haffman(path)
// console.log('encode: some text example: ', haff.result)

// const codeTableFile = './codeTable.txt'
// const encodedFile = './result.txt'
// const decode = new Haffman()
// decode.decode(codeTableFile, encodedFile)
// console.log('decode: ', decode.str)
