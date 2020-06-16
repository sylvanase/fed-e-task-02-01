#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const inquirer = require('inquirer')
const ejs =require('ejs')

// 询问用户
inquirer.prompt([
  {
    type: 'input',
    name: 'name',
    message: 'Project name',
    default: 'Node-cli Project'
  },
  {
    type: 'input',
    name: 'author',
    message: 'Author name',
    default: 'inquirer tools'
  }
])
.then(answers => {
  // 指定模板目录
  const tmpDir = path.join(__dirname, 'templates')
  // 得到目标目录
  const destDir = process.cwd()
  // 将模板下的文件全部转换到目标目录
  fs.readdir(tmpDir,(err, files) => {
    if(err) throw err
    files.forEach(file => {
      // 通过模板引擎渲染文件
      ejs.renderFile(path.join(tmpDir, file), answers, (err, result) => {
        if(err) throw err
        // 将结果写入目标文件路径
        fs.writeFileSync(path.join(destDir, file), result)
      })
    })
  })
})
