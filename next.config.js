require('dotenv').config()

const path = require('path')
const withCustomBabelConfig = require('next-plugin-custom-babel-config')
const withPlugins = require('next-compose-plugins')
const withImages = require('next-images')

function withCustomWebpack(config = {}) {
    const { webpack } = config

    config.webpack = (config, ...rest) => {
        const { dev } = rest ? rest[0] : {}
        if (dev) {
            config.devtool = 'inline-source-map'
        }
        
        config.externals = config.externals || []

        config.module.rules.push({
            test: /\.(woff|woff2|ttf|otf|eot|svg|png)(\?v=\d+\.\d+\.\d+)?$/,
            use: [
                {
                    loader: 'url-loader',
                },
            ],
        })

        return webpack(config, ...rest)
    }

    return config
}

const plugins = [
    [withImages],
    [
        withCustomBabelConfig,
        {
            babelConfigFile: path.resolve('./babel.config.js'),
        },
    ],
    [withCustomWebpack],
]

const config = {
    distDir: '../.next',
}

module.exports = withPlugins(plugins, config)
