import bcrypt from "bcrypt";
export const hashPassword = (password) => {
  return new Promise(async (resolve, reject) => {
    await bcrypt.genSalt(12, (error, salt) => {
      if (error) {
        return reject(error);//If there's a problem generating the salt (like system issue, invalid round value, etc.)
      }
      bcrypt.hash(password, salt, (error, hash) => {
        if (error) {
          return reject(error);//when password is invalid
        }
        resolve(hash);
      });
    });
  });
};

export const comparePassword = (password, hashPassword) => {
  return bcrypt.compare(password, hashPassword);
};
