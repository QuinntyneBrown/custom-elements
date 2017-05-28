const webpack = require('webpack');
const CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;
const UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;

module.exports = {
    devtool: 'source-map',
    entry: {
        'all': [
            './src/add-contact-form.component',
            './src/card.component',
            './src/content-block.component',
            './src/cta.component',
            './src/header.component',
            './src/mega-header.component'
        ],
        'ce-add-contact-form': './src/add-contact-form.component',
        'ce-content-block': './src/content-block.component',
        'ce-cta': './src/cta.component',
        'ce-header': './src/header.component',
        'ce-mega-header': './src/mega-header.component'
    },
    output: {
        path: __dirname + "/dist",
        filename: "[name].js",
        publicPath: "dist/"
    },
    resolve: {
        extensions: ['.ts', '.js', '.jpg', '.jpeg', '.gif', '.png', '.css', '.html']
    },
    module: {
        loaders: [
            { test: /\.scss$/, exclude: /node_modules/, loaders: ['raw-loader', 'sass-loader'] },
            { test: /\.(jpg|jpeg|gif|png)$/, loader: 'file-loader?name=img/[path][name].[ext]' },
            { test: /\.(eof|woff|woff2|svg)$/, loader: 'file-loader?name=img/[path][name].[ext]' },
            { test: /\.css$/, loader: 'raw-loader' },
            { test: /\.html$/, loaders: ['html-loader'] },
            { test: /\.ts$/, loaders: ['awesome-typescript-loader'], exclude: /node_modules/ }
        ]
    },
    node: {
        fs: "empty"
    },
    plugins: [
        //new UglifyJsPlugin()
    ]
};
