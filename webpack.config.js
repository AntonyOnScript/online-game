const { resolve } = require('path')

module.exports = {
    mode: "production",
    entry: resolve(__dirname, 'src', 'js', 'index.js'),
    output: {
        path: resolve(__dirname, 'public'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: "babel-loader",
                options: {
                    presets: ["@babel/env"]
                }
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }
        ]
    }
}