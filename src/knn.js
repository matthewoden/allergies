
const createArrayObject = (collection) => {
    // convert an array of objects, to an object of arrays.
    // this should allow us to operate over a cached list for mean, variance,
    // and standardization.
    // TODO: ignore non-numeric values.
}

const findMean(array){
  return (array.reduce((a, b) => a + b, 0) / array.length);
}

const findStandardDeviation = (array, mean) =>{
  const variance = (array.map(item => Math.pow(item - mean, 2)) / array.length)
  return Math.sqrt(variance)
}

const standardize(array, mean, deviation) {
  return array.map(item => (item - mean) / deviation)
}
