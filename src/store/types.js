function keyMirror (obj) {
  if (obj instanceof Object) {
    const _obj = Object.assign({}, obj)
    Object.keys(obj).forEach((key) => {
      _obj[key] = key
    })
    return _obj
  }
}

export default keyMirror({
  LOGIN_INFO: null
})
