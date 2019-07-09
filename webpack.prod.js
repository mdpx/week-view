const merge = require('webpack-merge')
const common = require('./webpack.common.js')
const TerserPlugin = require('terser-webpack-plugin')

module.exports = merge(common, {
    mode: 'production',
    entry: {
        'week-view': './src/index.js',
        'week-view.min': './src/index.js'
    },
    output: {
        filename: '[name].js'
    },
    optimization: {
        minimizer: [
            new TerserPlugin({
                test: /\.min\.js$/,
                parallel: true
            })
        ]
    },
    module: {
        rules: [
            {
                test: /.+\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ]
    }
})