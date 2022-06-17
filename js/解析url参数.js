paraseUrl (url) {
  var pattern = /(\w+)=([^&]*)/gi
  var parames = {}
  url.replace(pattern, function (attr, key, value) {
    parames[key] = decodeURI(value)
  })
  return parames
},