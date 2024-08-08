const passwordValidator = (password) => {
  if (password && password.length > 0) {
    const regex =
      /^(?!.* {2})(?!^ )(?!.* $)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/;

    return regex.test(password);
  } else return false;
};

export default passwordValidator;
