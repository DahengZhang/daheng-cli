const glob = require('glob')
const path = require('path')

const files = glob.sync('./src/**/index.js').map(item => {
	return item.match(/\.\/src\/(\S*\/index)\.js/)
			&& item.match(/\.\/src\/(\S*\/index)\.js/)[1]
			|| 'index'
})

function getEntry() {
	let entry = {}
	let html = []
	for (let i = 0; i < files.length; i++) {
		entry[files[i]] = [path.resolve(__dirname, files[i] + '.js')]
		html.push({
			template: path.resolve(__dirname, files[i] + '.html'),
			filename: files[i] + '.html',
			chunks: [files[i]].toString()
		})
	}
	return {
		entry,
		html
	}
}

console.log(getEntry())
