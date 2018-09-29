const { query } = require('graphqurl');

const makeRequest = async (queryObj, callback) => {
  try {
    const response = await query(queryObj)
    console.log(response)
    if (response.error){
      return callback(response.error, null);
    } else {
      return {
        error: null,
        data: response.data,
      }
    }
  } catch (error) {
    console.log(error)
    return callback(error, null);
  }
}

module.exports = makeRequest;