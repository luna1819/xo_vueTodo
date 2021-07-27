const path = require('path')
const merge = require('webpack-merge')
const { VueLoaderPlugin } = require('vue-loader')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = (env, opts) => {
    const config = {
        resolve: {
            extensions: ['.vue', '.js'],
            alias: {
                '~': path.join(__dirname),
                'scss': path.join(__dirname, './scss')
            }
        },
        // 진입점
        entry: {
            app: [
                path.join(__dirname, 'main.js')
            ]
        },

        // 결과물에 대한 설정
        output: {
            filename: '[name].js', // app.js
            path: path.join(__dirname, 'dist')
        },

        module: {
            rules: [
                {
                    test: /\.vue$/,
                    loader: 'vue-loader'
                },
                // this will apply to both plain `.js` files
                // AND `<script>` blocks in `.vue` files
                {
                    test: /\.js$/,
                    loader: 'babel-loader'
                },
                // this will apply to both plain `.css` files
                // AND `<style>` blocks in `.vue` files
                {
                    test: /\.css$/,
                    use: [
                        'vue-style-loader',
                        'css-loader',
                        'postcss-loader'
                    ]
                },
                {
                    test: /\.scss$/,
                    use: [
                        'vue-style-loader',
                        'css-loader',
                        'postcss-loader',
                        'sass-loader'
                    ]
                }
            ]
        },

        plugins: [
            new VueLoaderPlugin(),
            new HtmlWebpackPlugin({
                template: path.join(__dirname, 'index.html')
            }),
            new CopyPlugin([
                {
                    from: 'assets/',
                    to: ''
                }
            ])
        ]
    }

    // 개발용
    if (opts.mode === 'development') {
        return merge(config, {
            // 추가 개발용 옵션
            devtool: 'eval',
            devServer: {
                open: false,
                hot: true
            }
        })

    // 제품용
    } else {
        return merge(config, {
            // 추가 제품용 옵션
            devtool: 'cheap-module-source-map',
            plugins: [
                new CleanWebpackPlugin()
            ]
        })
    }
}
