const sendResponse = (res, statusCode, data, message) => {
  var status = null;
  const pattern = /^[23]\d{2}$/;
  // if statusCode starts with 2 or 3, set status values as success else failure

  if (pattern.test(statusCode)) {
    status = "success";
  } else {
    status = "failure";
  }

  res.status(statusCode).json({
    status,
    data,
    message,
  });
};

module.exports = sendResponse;
