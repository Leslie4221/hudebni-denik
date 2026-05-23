const express = require("express");
const router = express.Router();

const GetAbl = require("../abl/zaznam-poslechu/getAbl");
const ListAbl = require("../abl/zaznam-poslechu/listAbl");
const ListByAlbumIdAbl = require("../abl/zaznam-poslechu/listByAlbumIdAbl");
const CreateAbl = require("../abl/zaznam-poslechu/createAbl");
const UpdateAbl = require("../abl/zaznam-poslechu/updateAbl");
const DeleteAbl = require("../abl/zaznam-poslechu/deleteAbl");

router.get("/get", GetAbl);
router.get("/list", ListAbl);
router.get("/listByAlbumId", ListByAlbumIdAbl);
router.post("/create", CreateAbl);
router.post("/update", UpdateAbl);
router.post("/delete", DeleteAbl);

module.exports = router;