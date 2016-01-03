var webpack = require('webpack'),
  HtmlWebpackPlugin = require('html-webpack-plugin'),
  path = require('path'),
  srcPath = path.join(__dirname, 'src');

module.exports = {
    target: 'web',
    cache: true,
    entry: {
        app: path.join(srcPath, 'index.js'),
        vendor: ['react', 'react-dom']
    },
    output: {
        path: path.join(__dirname , 'dist'),
        filename: 'assets/[name].bundle.js'
    },
    module: {
        loaders: [{
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel',
                query: {
                    presets: ['es2015', 'react', 'stage-0']
                }
            },
            {
                test: /\.less$/,
                loader: 'style-loader!css-loader!less-loader'
            }
        ]
    },
    resolve: {
        extensions: ['', '.js', '.jsx'],
        modulesDirectories: ['node_modules', 'src/components']
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin('vendor', 'assets/vendor.js'),
        new webpack.optimize.DedupePlugin(),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            inject: true,
            template: 'src/index.html'
        }),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.NoErrorsPlugin()
    ],
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        inline: true,
        historyApiFallback: true
    }
};
