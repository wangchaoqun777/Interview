function route (handle, pathname, res, req) {
  console.log('route-pathname', pathname)
  if(typeof handle[pathname]==='function'){
    return handle[pathname](res, req);
  }else{
    res.writeHead(404, {'Content-Type': 'text/plain'})
    res.write('404 not found')
    res.end()
  }
}

exports.route = route