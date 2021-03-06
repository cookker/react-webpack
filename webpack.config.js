const path = require('path');
const RefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')

module.exports = {
    name: 'wordrelay-setting',
    mode: 'deplopment',
    devtool: 'eval', //production이면 hidden-source-map
    resolve: {
        extensions: [ '.js', '.jsx']
    },
    
    entry: {
        app:['./client'],
    },

    module:{
        rules: [{
            test: /\.jsx?$/,
            loader: 'babel-loader',
            options: {
                presets:[
                    ['@babel/preset-env',{
                        targets: {
                            browsers: ['last 2 chrome versions'],
                        }
                    }], 
                    '@babel/preset-react'
                ],
                plugins:[
                    '@babel/plugin-proposal-class-properties',
                    'react-refresh/babel'
                ],
            }
        }],
    },

    plugins:[
        new RefreshWebpackPlugin()
    ],

    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'app.js',
        publicPath: '/dist/',
    },

    devServer: {
        publicPath: '/dist/',
        hot: true
    }
};