const Ajv = require("ajv");
const ajv = new Ajv();

const zaznamPoslechuDao = require("../../dao/zaznam-poslechu");
const albumDao = require("../../dao/album");

const schema = {
  type: "object",
  properties: {
    albumId: { type: "string" },
    datumPostlechu: { type: "string" },
    komentar: { type: "string" },
    oblibenaSkaldba: { type: "string" },
  },
  required: ["albumId", "datumPostlechu", "komentar", "oblibenaSkaldba"],
  additionalProperties: false,
};

async function CreateAbl(req, res) {
  try {
    let zaznam = req.body;

    const valid = ajv.validate(schema, zaznam);
    if (!valid) {
      res.status(400).json({
        code: "dtoInIsNotValid",
        message: "dtoIn is not valid",
        validationError: ajv.errors,
      });
      return;
    }

    const album = albumDao.get(zaznam.albumId);
    if (!album) {
      res.status(400).json({
        code: "albumDoesNotExist",
        message: `Album s id ${zaznam.albumId} neexistuje`,
      });
      return;
    }

    zaznam = zaznamPoslechuDao.create(zaznam);
    res.json(zaznam);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = CreateAbl;