const Users = require("../models/Users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { secret } = require("../../middleware/config");
const Vaccine = require("../models/Vaccine");
const { userValidation, loginValidation } = require("../../middleware/schemas");
const { errorMessage, passwordMacth } = require("./helpers");

const createUser = async (req, res) => {
  const { first_name, last_name, email, password } = req.body;
  const { error } =  userValidation(req.body);

  let passworddatabase = bcrypt.hashSync(password, 10);

  if (error) {
    res.status(400).send(error.details[0].message);
  } else {
    let checkUser = await Users.findOne({ where: { email } });

    if (checkUser) {
      res.status(404).send({
        message: `Usuário ${first_name} já cadastrado. Faça seu login!`,
      });
    } else {
      try {
        const user = await Users.create({
          first_name,
          last_name,
          email,
          password: passworddatabase,
        });
        console.log(`Usuário ${user.first_name} criado com sucesso`);
        res.status(201).send(user);
      } catch (error) {
        errorMessage(error, res);
      }
    }
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await Users.findAll({
      include: { model: Vaccine, attributes: ["name", "vaccinated"] },
    });
    if (users && users.length > 0) {
      res.status(200).send(users);
    } else {
      res.status(404).send({ message: `Nenhum usuário cadastrado` });
    }
  } catch (error) {
    errorMessage(error, res);
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const { error } = await loginValidation(req.body);

  if (error) {
    res.status(400).send(error.details[0].message);
  } else {
    let user = await Users.findOne({ where: { email } });
    try {
      if (user !== null) {
        const passwordsMatched = passwordMacth(password, user.password, user);

        passwordsMatched
          ? res.status(200).send({ auth: true, token: passwordsMatched[1] })
          : res.status(401).send({
              message: `Não foi possível fazer o login, senha incorreta`,
            });
      } else {
        res.status(401).send({ message: `Não foi possível fazer o login` });
      }
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const rowsDeleted = await Users.destroy({ where: { id } });
    if (rowsDeleted) {
      res
        .status(200)
        .send({ message: `${rowsDeleted} usuário deletado com sucesso` });
    } else {
      res.status(404).send({
        message: `Não foi possível encontrar o usuário com o id ${id}`,
      });
    }
  } catch (error) {
    errorMessage(error, res);
  }
};
module.exports = {
  createUser,
  getAllUsers,
  loginUser,
  deleteUser,
};
