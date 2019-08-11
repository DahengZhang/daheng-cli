const glob = require('glob')

const entry = glob.sync('./src/**/index.js')
const template = glob.sync('./src/**/index.html')

console.log('entry', entry)
console.log('template', template)
