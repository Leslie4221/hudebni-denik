const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const zaznamFolderPath = path.join(__dirname, "../storage/zaznamPoslechuList");

function get(zaznamId) {
  try {
    const filePath = path.join(zaznamFolderPath, `${zaznamId}.json`);
    const fileData = fs.readFileSync(filePath, "utf8");
    return JSON.parse(fileData);
  } catch (error) {
    if (error.code === "ENOENT") return null;
    throw { code: "failedToReadZaznam", message: error.message };
  }
}

function create(zaznam) {
  try {
    zaznam.id = crypto.randomBytes(16).toString("hex");
    const filePath = path.join(zaznamFolderPath, `${zaznam.id}.json`);
    fs.writeFileSync(filePath, JSON.stringify(zaznam), "utf8");
    return zaznam;
  } catch (error) {
    throw { code: "failedToCreateZaznam", message: error.message };
  }
}

function list() {
  try {
    const files = fs.readdirSync(zaznamFolderPath);
    return files.map((file) => {
      const fileData = fs.readFileSync(
        path.join(zaznamFolderPath, file),
        "utf8"
      );
      return JSON.parse(fileData);
    });
  } catch (error) {
    throw { code: "failedToListZaznamy", message: error.message };
  }
}

function listByAlbumId(albumId) {
  const zaznamy = list();
  return zaznamy.filter((zaznam) => zaznam.albumId === albumId);
}

function update(zaznam) {
  try {
    const currentZaznam = get(zaznam.id);
    if (!currentZaznam) return null;
    const newZaznam = { ...currentZaznam, ...zaznam };
    const filePath = path.join(zaznamFolderPath, `${zaznam.id}.json`);
    fs.writeFileSync(filePath, JSON.stringify(newZaznam), "utf8");
    return newZaznam;
  } catch (error) {
    throw { code: "failedToUpdateZaznam", message: error.message };
  }
}

function remove(zaznamId) {
  try {
    const filePath = path.join(zaznamFolderPath, `${zaznamId}.json`);
    fs.unlinkSync(filePath);
    return {};
  } catch (error) {
    if (error.code === "ENOENT") return {};
    throw { code: "failedToRemoveZaznam", message: error.message };
  }
}

module.exports = { get, create, update, remove, list, listByAlbumId };