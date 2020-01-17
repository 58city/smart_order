export default{
  set(key, value) {
    localStorage[key] = value
  },
  get(key, defaultValue) {
    return localStorage[key] || defaultValue
  },
  setObject(key, value) {
    localStorage[key] = JSON.stringify(value)
  },
  getObject(key,defaultValue) {
    let local=localStorage[key]
    if(local=='undefined'||local==null){
      local=JSON.stringify(defaultValue)
    }
    return JSON.parse(local)
  },
  remove(key){
    localStorage.removeItem(key)
  },
  clear(){
    localStorage.clear()
  }
}