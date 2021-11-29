const express = require("express");
const router = express.Router();
const controller = require("../controllers/vaccineController");
const auth = require('../../middleware/auth')


router.use(auth);
router.post("/", controller.createVaccine);
router.get("/", controller.getAllVaccines);
router.get("/:id", controller.getVaccine);
router.patch("/:id/vaccinated", controller.updateVaccineStatus);
router.delete("/:id", controller.deleteVaccine);

module.exports = router;
