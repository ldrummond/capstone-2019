

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
* Array Next
*/
export function next(arr, i) {
  if(i < 0 || i >= arr.length) {throw new RangeError("Array index is out of range.")}
  let nexti = (i < arr.length - 1) ? i + 1 : 0; 
  return arr[nexti]; 
}

/*
* Array Prev
*/
export function prev(arr, i) {
  if(i < 0 || i >= arr.length) {throw new RangeError("Array index is out of range.")}
  let previ = (i > 0) ? i - 1 : arr.length - 1; 
  return arr[previ]; 
}

/*
* Merge objects
*/
export function mergeObjects(a = {}, b = {}) {
  let aCopy = Object.assign({}, a);
  let bCopy = Object.assign({}, b);
  return Object.assign(aCopy, bCopy)
}