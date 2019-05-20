const { override, fixBabelImports, addLessLoader } = require('customize-cra');

module.exports = override(
    fixBabelImports('import', {
            libraryName: 'antd',
            libraryDirectory: 'es',
            style: true
}),
    addLessLoader({
       javascriptEnabled: true,
       modifyVars: { '@primary-color': '#26c281', '@heading-color': 'rgba(38, 194, 129, 1)' },
 }),
);