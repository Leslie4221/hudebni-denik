const Ajv = require("ajv");
const ajv = new Ajv();

const albumDao = require("../../dao/album");

const schema = {
  type: "object",
  properties: {
    nazev: { type: "string" },
    interpret: { type: "string" },
    rokVydani: { type: "number" },
    zanr: { type: "string" },
  },
  required: ["nazev", "interpret", "rokVydani"],
  additionalProperties: false,
};

async function CreateAbl(req, res) {
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

    album = albumDao.create(album);
    res.json(album);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = CreateAbl;