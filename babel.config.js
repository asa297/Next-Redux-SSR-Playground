module.exports = function (api) {
    api.cache(true)

    const presets = ['next/babel']

    const plugins = [
        [
            'babel-plugin-module-resolver',
            {
                root: ['./'],
                alias: {
                    '@app': './app',
                    '@app/@server': './server',
                },
            },
        ],
        [
            'styled-components',
            {
                ssr: true,
                displayName: true,
                preprocess: false,
            },
        ],
    ]

    return {
        presets,
        plugins,
    }
}
