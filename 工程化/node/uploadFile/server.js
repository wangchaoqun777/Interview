const http = require('http')

const url = require('url')

function start (route, handler) {

  function onRequest(req, res) {

    const pathname = url.parse(req.url).pathname

    // let postData = ''

    // req.setEncoding("utf8");

    // req.addListener('data', (postDataChunk)=> {
    //   console.log('postDataChunk', postDataChunk)
    //   postData += postDataChunk
    // })

    // req.addListener('end',()=> {
    //   route(handler, pathname, res, postData)
    // })

    route(handler, pathname, res, req)
    
  }

  http.createServer(onRequest).listen(3001)
}

exports.start = start