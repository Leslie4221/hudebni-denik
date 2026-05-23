const Ajv = require("ajv");
const ajv = new Ajv();

const zaznamPoslechuDao = require("../../dao/zaznam-poslechu");

const schema = {
  type: "object",
  properties: {
    albumId: { type: "string" },
  },
  required: ["albumId"],
  additionalProperties: false,
};

async function ListByAlbumIdAbl(req, res) {
  try {
    const reqParams = req.query?.albumId ? req.query : req.body;

    const valid = ajv.validate(schema, reqParams);
    if (!valid) {
      res.status(400).json({
        code: "dtoInIsNotValid",
        message: "dtoIn is not valid",
        validationError: ajv.errors,
      });
      return;
    }

    const zaznamList = zaznamPoslechuDao.listByAlbumId(reqParams.albumId);
    res.json({ itemList: zaznamList });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = ListByAlbumIdAbl;