!function start(moudles) {
  // 缓存
  var installedModules = {}

  function __kkbpack_reqiure__(moduleId) {
    if(installedModules[moduleId]) {
      return installedModulesmoduleId.reports
    }
    var moudle = installedModules[moduleId] = {
      exports: {}
    }

    moudles[moduleId].call(moudle.exports, module, moudle.exports, __kkbpack_reqiure__)
    moudle.l = true

    return moudle.exports

  }

  return __kkbpack_reqiure__(__kkbpack_reqiure__.s = "__entry__")
}({__content__})