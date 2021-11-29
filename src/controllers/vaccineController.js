const Vaccine = require("../models/Vaccine");
const Users = require("../models/Users");
const { vaccineValidation } = require("../../middleware/schemas");
const { isUpdated, errorMessage } = require("./helpers");

const createVaccine = async (req, res) => {
  const { name, expected_date, vaccinated, userid } = req.body;
  const { error } = vaccineValidation(req.body);

  if (error) {
    res.status(400).send(error.details[0].message);
  } else {
    try {
      const vaccine = await Vaccine.create({
        name,
        expected_date,
        vaccinated,
        userid,
      });
      console.log(`Vacina ${vaccine.name} criada com sucesso`);
      res.status(201).send(vaccine);
    } catch (error) {
      errorMessage(error, res);
    }
  }
};

const getAllVaccines = async (req, res) => {
  try {
    const vaccines = await Vaccine.findAll({
      include: { model: Users, attributes: ["first_name", "last_name"] },
    });
    if (vaccines && vaccines.length > 0) {
      res.status(200).send(vaccines);
    } else {
      res.status(404).send({ message: `Nenhuma vacina cadastrada` });
    }
  } catch (error) {
    errorMessage(error);
  }
};

const getVaccine = async (req, res) => {
  const { id } = req.params;

  try {
    const vaccine = await Vaccine.findOne({ where: { id } });
    if (vaccine) {
      res.status(200).send(vaccine);
    } else {
      res.status(404).send({
        message: `Não foi possível encontrar a vacina com o id ${id}`,
      });
    }
  } catch (error) {
    errorMessage(error, res);
  }
};

const updateVaccineStatus = async (req, res) => {
  const { id } = req.params;
  const vaccinated = req.body.vaccinated;

  try {
    const rowsUpdated = await Vaccine.update({ vaccinated }, { where: { id } });

    const checkUpdate = isUpdated(rowsUpdated);
    checkUpdate
      ? res.status(200).send({ message: `${rowsUpdated[0]} vacina atualizada` })
      : res.status(404).send({
          message: `Não foi possível encontrar a vacina com o id ${id}`,
        });
  } catch (error) {
    errorMessage(error, res);
  }
};

const deleteVaccine = async (req, res) => {
  const { id } = req.params;

  try {
    const rowsDeleted = await Vaccine.destroy({ where: { id } });
    if (rowsDeleted) {
      res
        .status(200)
        .send({ message: `${rowsDeleted} vacina deletada com sucesso` });
    } else {
      res.status(404).send({
        message: `Não foi possível encontrar a vacina com o id ${id}`,
      });
    }
  } catch (error) {
    errorMessage(error, res);
  }
};
module.exports = {
  createVaccine,
  getAllVaccines,
  getVaccine,
  updateVaccineStatus,
  deleteVaccine,
};
