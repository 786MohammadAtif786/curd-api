module.exports = (res, status, data, message, httpStatus) => {
  const result = {
    status
  }
  if (data) {
    result.data = data; 
  }
  if (message) {
    result.message = message;
  }
  if (httpStatus) {
    res.status(httpStatus);
  }
  res.json(result);
}