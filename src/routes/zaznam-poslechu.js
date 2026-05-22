const express = require("express");
const router = express.Router();

router.get("/list", (req, res) => {
  res.json({ message: "Seznam záznamů poslechu" });
});

router.get("/listByAlbumId", (req, res) => {
  res.json({ message: "Seznam záznamů poslechu pro konkrétní album" });
});

router.get("/get", (req, res) => {
  res.json({ message: "Jeden záznam poslechu" });
});

router.post("/create", (req, res) => {
  res.json({ message: "Záznam poslechu vytvořen" });
});

router.put("/update", (req, res) => {
  res.json({ message: "Záznam poslechu upraven" });
});

router.delete("/delete", (req, res) => {
  res.json({ message: "Záznam poslechu smazán" });
});

module.exports = router;