const phoneNumberValidator = (phoneNumber) => {
  if (phoneNumber && phoneNumber.length > 0 && phoneNumber.length <= 10) {
    if (isNaN(parseInt(phoneNumber))) {
      return false;
    }
    return true;
  } else return false;
};

export default phoneNumberValidator;
