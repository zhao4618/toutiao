module.exports = {
    plugins: {
        'postcss-pxtorem': {
            rootValue({
                // 解构这个file对象里是否包含vant组件库 如果包含设值为37.5否则75
                file //es6语法：对象解构
            }) {
                // console.log(file)
                return file.indexOf('vant') !== -1 ? 37.5 : 75
            },
            propList: ['*'], //配置要转换的属性*代表所有
        },
    },
};