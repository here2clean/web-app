const { override, fixBabelImports, addLessLoader } = require('customize-cra');

module.exports = override(
    fixBabelImports('import', {
            libraryName: 'antd',
            libraryDirectory: 'es',
            style: true
}),
    addLessLoader({
       javascriptEnabled: true,
       modifyVars: { '@primary-color': '#FFB473', '@heading-color': 'rgba(255,180,115,1)' },
 }),
);