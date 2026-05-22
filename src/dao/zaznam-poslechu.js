const express = require("express");
const router = express.Router();
const zaznamPoslechuDao = require("../dao/zaznam-poslechu");

router.get("/list", (req, res) => {
  const zaznamy = zaznamPoslechuDao.list();
  res.json({ itemList: zaznamy });
});

router.get("/listByAlbumId", (req, res) => {
  const zaznamy = zaznamPoslechuDao.listByAlbumId(req.query.albumId);
  res.json({ itemList: zaznamy });
});

router.get("/get", (req, res) => {
  const zaznam = zaznamPoslechuDao.get(req.query.id);
  if (!zaznam) return res.status(404).json({ message: "Záznam nenalezen" });
  res.json(zaznam);
});

router.post("/create", (req, res) => {
  const zaznam = zaznamPoslechuDao.create(req.body);
  res.json(zaznam);
});

router.put("/update", (req, res) => {
  const zaznam = zaznamPoslechuDao.update(req.query.id, req.body);
  if (!zaznam) return res.status(404).json({ message: "Záznam nenalezen" });
  res.json(zaznam);
});

router.delete("/delete", (req, res) => {
  const result = zaznamPoslechuDao.remove(req.query.id);
  if (!result) return res.status(404).json({ message: "Záznam nenalezen" });
  res.json({ message: "Záznam smazán" });
});

module.exports = router;