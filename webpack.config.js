const path = require('path')
const glob = require('glob')
const webpack = require('webpack')
const { VueLoaderPlugin } = require('vue-loader')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const isDev = process.env.NODE_ENV == 'development'
const buildPath = getArgv('path')
const files = glob.sync(buildPath ? `./src/**/${buildPath}/**/index.js` : './src/**/index.js').map(item => {
	return item.match(/\.\/src\/(\S*\/index)\.js/)
			&& item.match(/\.\/src\/(\S*\/index)\.js/)[1]
			|| 'index'
})
const { entry, htmlPlugins } = getEntry()
function getEntry() {
	let entry = {}
    let htmlPlugins = []
	for (let i = 0; i < files.length; i++) {
		entry[files[i]] = [path.resolve(__dirname, 'src', files[i] + '.js')]
		htmlPlugins.push(new HtmlWebpackPlugin({
			template: path.resolve(__dirname, 'src', files[i] + '.html'),
			filename: files[i] + '.html',
			inject: true,
			chunks: [files[i]],
			minify: {
                removeComments: false,
                collapseWhitespace: false
            }
		}))
	}
	return {
		entry,
		htmlPlugins
	}
}
function getArgv(name) {
	const argvs = process.argv.find(item => {
		return item.indexOf(`--${name}`) !== -1
	}) || '';
	return argvs.split('=').length < 2
				? false : argvs.split('=')[1];
}

module.exports = {
	mode: process.env.NODE_ENV,
	devtool: isDev ? 'eval' : 'source-maps',
	entry,
    output: {
        path: path.resolve(__dirname, 'public/'),
        publicPath: '/',
        filename: '[name].bundle.[hash:6].js',
        chunkFilename: '[name].chunk.[chunkhash:6].js'
	},
	resolve: {
        extensions: ['.js', '.vue'],
        alias: {
            '@': path.resolve(__dirname, 'src/')
        }
	},
	module: {
        rules: [{
            test: /\.js$/,
			exclude: /node_modules/,
			loader: 'babel-loader'
        }, {
            test: /\.vue$/,
            exclude: /node_modules/,
            loader: 'vue-loader'
        }, {
            test: /\.(sc|sa|c)ss$/,
            exclude: /node_modules/,
            use: [
                'vue-style-loader',
                'css-loader',
                'sass-loader'
            ]
        }]
    },
    devServer: {
        host: '0.0.0.0',
        port: 8080,
        hot: true,
        overlay: true
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
		new VueLoaderPlugin(),
		...htmlPlugins
    ]
}
