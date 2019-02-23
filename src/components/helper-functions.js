

/*
* Get url params.
*/
export function getQueryParamsFromLocation(location = {search: ""}) {
  let search = decodeURIComponent(location.search); 
  return search.slice(1).split('&').reduce((acc, query) => {
    let q = query.split('=');
    acc[q[0]] = q[1]
    return acc;
  }, {})
}

/*
* Array Contains
*/
export function contains(arr, val) {
  return !(arr.indexOf(val) == -1)
}

/*
* Merge objects
*/
export function mergeObjects(a = {}, b = {}) {
  let aCopy = Object.assign({}, a);
  let bCopy = Object.assign({}, b);
  return Object.assign(aCopy, bCopy)
}