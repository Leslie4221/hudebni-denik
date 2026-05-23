const zaznamPoslechuDao = require("../../dao/zaznam-poslechu");

async function ListAbl(req, res) {
  try {
    const zaznamList = zaznamPoslechuDao.list();
    res.json({ itemList: zaznamList });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = ListAbl;