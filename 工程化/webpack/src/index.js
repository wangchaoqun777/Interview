#! /usr/bin/env node
const path = require('path')
const fs = require('fs')
const defaultConfig = {
  enrty: './src/index.js',
  output: {
    filename: 'bundles.js'
  }
}

const config = {
  ...defaultConfig,
  ...require(path.resolve('./kkb.config.js'))
}
class Kkapack {
  constructor(config) {
    this.config = config
    this.root = process.cwd()
    this.entry = config.entry
    this.mouldes = {}
  }

  parse(code,parent) {
    let deps = []
    const r = /require\((.*)\)/g
    code = code.replace(r, (match, arg)=>{
      const retpath = path.join(parent, arg.replace(/'|"/g, ''))
      deps.push(retpath)
      return `__kkbpack_reqiure__(${retpath})`
    })
    return {deps, code}
  }

  createMoudle (modulePath,name) {
    // modulePath 是绝对路径获取文件
    // name 是相对路径文件名
    let fileContent = fs.readFileSync(modulePath, 'utf-8')
    const {code,deps} = this.parse(fileContent, path.dirname(name))
    this.mouldes[name] = code
    deps.forEach(dep=> {
      this.createMoudle(path.join(this.root, dep), dep)
    })
  }

  genarateModuleStr () {
    let fnTemp = ''
    Object.keys(this.mouldes).forEach(item => {
      fnTemp += `"${item}": ${this.mouldes[itme]}`
    })
    return fnTemp
  }

  generateFile () {
    const tempalte = fs.readFileSync(path.resolve(__dirname, './template.js'), 'utf-8')

    tempalte = tempalte.replace('__entry__', this.entry).replace('__content__', this.genarateModuleStr())

    fs.writeFileSync('./dist/' + this.config.output.filename, tempalte)

  }

  start () {
    const entryPath = path.resolve(this.root, this.entry)
    this.createMoudle(entryPath,this.entry)
    this.generateFile()
  }
}

const bbk = new Kkapack(config)

bbk.start()
