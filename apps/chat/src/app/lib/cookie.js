export function getCookie (name) {
    const value = `; ${document.cookie}`
    const parts = value.split(`; ${name}=`)
  
    if (parts.length === 2) {
      return parts
        .pop()
        .split(';')
        .shift()
    }
  }
  
  export function setCookie ({ name, value, options = {} }) {
    const _options = { path: '/', ...options }
    document.cookie = Object.keys(_options).reduce((aggr, key) => {
      aggr += `; ${key}=${_options[key]}`
      return aggr
    }, `${name}=${value}`)
  }