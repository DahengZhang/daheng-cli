const { mock } = require('mockjs')

const apis = require.context('./', true, /\.js$/)

apis.keys().map(key => {
	apis(key) && mock(
		key.match(/(\/\S*)\.js/)
			&& key.match(/(\/\S*)\.js/)[1] || '/'
		, apis(key))
})
