const catchErrors = (error) => {
  let errorMsg = '';

  if (error.response) {
    errorMsg = error.response.data.msg;
    console.error(errorMsg);
  } else if (error.request) {
    errorMsg = error.request;
    console.error(errorMsg);
  } else {
    errorMsg = error.message;
    console.error(errorMsg);
  }
  return errorMsg;
};

export default catchErrors;
