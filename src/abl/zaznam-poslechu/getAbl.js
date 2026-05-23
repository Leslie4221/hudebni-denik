const Ajv = require("ajv");
const ajv = new Ajv();

const zaznamPoslechuDao = require("../../dao/zaznam-poslechu");

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

    const zaznam = zaznamPoslechuDao.get(reqParams.id);
    if (!zaznam) {
      res.status(404).json({
        code: "zaznamNotFound",
        message: `Záznam s id ${reqParams.id} nenalezen`,
      });
      return;
    }

    res.json(zaznam);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = GetAbl;