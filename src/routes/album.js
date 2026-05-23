const express = require("express");
const router = express.Router();

const GetAbl = require("../abl/album/getAbl");
const ListAbl = require("../abl/album/listAbl");
const CreateAbl = require("../abl/album/createAbl");
const UpdateAbl = require("../abl/album/updateAbl");
const DeleteAbl = require("../abl/album/deleteAbl");

router.get("/get", GetAbl);
router.get("/list", ListAbl);
router.post("/create", CreateAbl);
router.post("/update", UpdateAbl);
router.post("/delete", DeleteAbl);

module.exports = router;