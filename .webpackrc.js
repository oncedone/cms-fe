const path = require('path');

// https://github.com/sorrycc/roadhog/blob/master/README_zh-cn.md
module.exports = {
    outputPath: './app/public/dist',
    alias: {
        "@": path.resolve('./src'),
    },
    html: {
        template: './src/assets/index.html',
        filename: 'app/views/index.html',
    },
    extraBabelPlugins: [
        [
            'import',
            {
                libraryName: 'antd',
                libraryDirectory: 'es',
                style: true,
            },
        ],
    ],
    theme: './theme.js',
    manifest: {
        fileName: '../../../config/manifest.json',
    },
    hash: true,
    env: {
        development: {
            proxy: {
                '/api': {
                    target: 'http://cms.oncedone.cn',
                    changeOrigin: true,
                    pathRewrite: {
                        '^/api': '',
                    },
                },
            },
            define: {
                SERVER: 'http://127.0.0.1:8002',
                BUILD_ENV: 'development',
            },
        },
        production: {
            define: {
                SERVER: '',
                BUILD_ENV: 'production',
            },
        },
    },
};
