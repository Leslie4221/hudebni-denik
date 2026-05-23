const Ajv = require("ajv");
const ajv = new Ajv();

const albumDao = require("../../dao/album");

const schema = {
  type: "object",
  properties: {
    id: { type: "string" },
    nazev: { type: "string" },
    interpret: { type: "string" },
    rokVydani: { type: "number" },
    zanr: { type: "string" },
  },
  required: ["id"],
  additionalProperties: false,
};

async function UpdateAbl(req, res) {
  try {
    let album = req.body;

    const valid = ajv.validate(schema, album);
    if (!valid) {
      res.status(400).json({
        code: "dtoInIsNotValid",
        message: "dtoIn is not valid",
        validationError: ajv.errors,
      });
      return;
    }

    const updatedAlbum = albumDao.update(album);
    if (!updatedAlbum) {
      res.status(404).json({
        code: "albumNotFound",
        message: `Album s id ${album.id} nenalezeno`,
      });
      return;
    }

    res.json(updatedAlbum);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = UpdateAbl;