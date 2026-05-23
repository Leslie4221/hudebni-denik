const albumDao = require("../../dao/album");

async function ListAbl(req, res) {
  try {
    const albumList = albumDao.list();
    res.json({ itemList: albumList });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = ListAbl;