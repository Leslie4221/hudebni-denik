const express = require("express");
const router = express.Router();
const albumDao = require("../dao/album");

router.get("/list", (req, res) => {
  const albums = albumDao.list();
  res.json({ itemList: albums });
});

router.get("/get", (req, res) => {
  const album = albumDao.get(req.query.id);
  if (!album) return res.status(404).json({ message: "Album nenalezeno" });
  res.json(album);
});

router.post("/create", (req, res) => {
  const album = albumDao.create(req.body);
  res.json(album);
});

router.post("/update", (req, res) => {
  const album = albumDao.update(req.body);
  if (!album) return res.status(404).json({ message: "Album nenalezeno" });
  res.json(album);
});

router.post("/delete", (req, res) => {
  const result = albumDao.remove(req.body.id);
  res.json({ message: "Album smazáno" });
});

module.exports = router;