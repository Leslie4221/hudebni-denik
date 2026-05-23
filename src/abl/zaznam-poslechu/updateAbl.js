const Ajv = require("ajv");
const ajv = new Ajv();

const zaznamPoslechuDao = require("../../dao/zaznam-poslechu");

const schema = {
  type: "object",
  properties: {
    id: { type: "string" },
    albumId: { type: "string" },
    datumPostlechu: { type: "string" },
    komentar: { type: "string" },
    oblibenaSkaldba: { type: "string" },
  },
  required: ["id"],
  additionalProperties: false,
};

async function UpdateAbl(req, res) {
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

    const updatedZaznam = zaznamPoslechuDao.update(zaznam);
    if (!updatedZaznam) {
      res.status(404).json({
        code: "zaznamNotFound",
        message: `Záznam s id ${zaznam.id} nenalezen`,
      });
      return;
    }

    res.json(updatedZaznam);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = UpdateAbl;