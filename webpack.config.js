const path = require('path')
const webpack = require('webpack')
const { VueLoaderPlugin } = require('vue-loader')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const publicPath = ''
const isDev = process.env.NODE_ENV === 'development'

module.exports = {
    mode: process.env.NODE_ENV,
    devtool: isDev ? 'eval' : 'source-maps',
    entry: {
        app: [path.resolve(__dirname, 'src/index.js')]
    },
    output: {
        path: path.resolve(__dirname, 'dist/'),
        publicPath: publicPath,
        filename: '[name].bundle.[hash].js',
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
                isDev ? 'vue-style-loader' : {
					loader: MiniCssExtractPlugin.loader,
					options: {
						publicPath
					}
				},
                'css-loader',
                {
                    loader: 'sass-loader',
                    options: {
                        implementation: require('dart-sass')
                    }
                }
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
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'src/index.html'),
            filename: 'index.html',
            inject: true,
            minify: {
                removeComments: true,
                collapseWhitespace: true
            }
        }),
        new MiniCssExtractPlugin({
            filename: '[name].bundle.[hash].css',
            chunkFilename: '[name].chunk.[chunkhash:6].css'
        })
    ]
}