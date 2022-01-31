const Generator = require('yeoman-generator')
const fs = require('fs')
const path = require('path')

module.exports = class extends Generator {
  // 配置脚手架问题
  prompting() {
    return this.prompt([
      {
        type: 'input', // 问题的方式
        name: 'name', // 问题结果返回的字段名
        message: 'Your project name', // 面板展示的问题信息
        default: this.appname // 默认值
      }
    ])
      .then(answers => { // answers为输入完信息之后每个字段名对应的信息
        this.answers = answers
      })
  }

  // 写入文件时的操作
  writing() {
    const tmpDir = path.join(__dirname, 'templates/src')
    fs.readdir(tmpDir, (err, files) => {
      if (err) throw err
      console.log(files);
    })
    const files = [
      'public/favicon.ico',
      'commitlint.config.js',
      'index.html',
      'package-lock.json',
      'package.json',
      'README.md',
      'tsconfig.json',
      'vite.config.ts',
      'src/api',
      'src/assets',
      'src/componets',
      'layout/AppLayout.vue',
      'src/plugins',
      'src/router/index.ts',
      'src/router/modules',
      'src/store/index.ts',
      'src/style/common.scss',
      'src/style/mixin.scss',
      'src/style/transition.scss',
      'src/style/variables.scss',
      'src/style/index.scss',
      'src/types',
      'src/utils/constants.ts',
      'src/utils/request.ts',
      'src/utils/storage.ts',
      'src/views/error-page/404.vue',
      'src/views/home/index.vue',
      'src/app.vue',
      'src/env.d.ts',
      'src/main.ts',
      'src/router.d.ts',
      'src/vuex.d.ts'
    ]
    files.forEach(filePath => {
      this.fs.copyTpl(
        this.templatePath(filePath), // 源路径文件
        this.destinationPath(filePath), // 目标路径文件
        this.answers
      )
    })
  }
}