const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { secret } = require("../../middleware/config");

const isUpdated = (rowsUpdated) => {
  if (rowsUpdated && rowsUpdated[0] > 0) {
    return true;
  } else {
    return false;
  }
};

const errorMessage = (error, res) => {
  return res.status(500).send({ message: error.message });
};

const passwordMacth = (password, matchPassword, user) => {
  if (bcrypt.compareSync(password, matchPassword)) {
    var token = jwt.sign({ id: user.id }, secret, { expiresIn: 3600 });
    return [true, token]
  }else{
      return false
  }
}

module.exports = { isUpdated, errorMessage, passwordMacth };
