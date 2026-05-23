const Ajv = require("ajv");
const ajv = new Ajv();

const albumDao = require("../../dao/album");

const schema = {
  type: "object",
  properties: {
    id: { type: "string" },
  },
  required: ["id"],
  additionalProperties: false,
};

async function GetAbl(req, res) {
  try {
    const reqParams = req.query?.id ? req.query : req.body;

    const valid = ajv.validate(schema, reqParams);
    if (!valid) {
      res.status(400).json({
        code: "dtoInIsNotValid",
        message: "dtoIn is not valid",
        validationError: ajv.errors,
      });
      return;
    }

    const album = albumDao.get(reqParams.id);
    if (!album) {
      res.status(404).json({
        code: "albumNotFound",
        message: `Album s id ${reqParams.id} nenalezeno`,
      });
      return;
    }

    res.json(album);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = GetAbl;