const jwt = require("jsonwebtoken");
const { secret } = require("./config");


module.exports = (req, res, next) => {
  const token = req.headers["authorization"];

  token
    ? jwt.verify(token, secret, function (error) {
        if (error) {
          return res.status(401).send({
            auth: false,
            message: "Não foi possível autenticar o acesso",
          });
        }
        next();
      })
    : res.status(401).send("Não foi fornecido o token");
};
