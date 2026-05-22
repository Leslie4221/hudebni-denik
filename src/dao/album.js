const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const albumFolderPath = path.join(__dirname, "../storage/albumList");

function get(albumId) {
  try {
    const filePath = path.join(albumFolderPath, `${albumId}.json`);
    const fileData = fs.readFileSync(filePath, "utf8");
    return JSON.parse(fileData);
  } catch (error) {
    if (error.code === "ENOENT") return null;
    throw { code: "failedToReadAlbum", message: error.message };
  }
}

function create(album) {
  try {
    album.id = crypto.randomBytes(16).toString("hex");
    const filePath = path.join(albumFolderPath, `${album.id}.json`);
    fs.writeFileSync(filePath, JSON.stringify(album), "utf8");
    return album;
  } catch (error) {
    throw { code: "failedToCreateAlbum", message: error.message };
  }
}

function list() {
  try {
    const files = fs.readdirSync(albumFolderPath);
    return files.map((file) => {
      const fileData = fs.readFileSync(
        path.join(albumFolderPath, file),
        "utf8"
      );
      return JSON.parse(fileData);
    });
  } catch (error) {
    throw { code: "failedToListAlbums", message: error.message };
  }
}

function update(album) {
  try {
    const currentAlbum = get(album.id);
    if (!currentAlbum) return null;
    const newAlbum = { ...currentAlbum, ...album };
    const filePath = path.join(albumFolderPath, `${album.id}.json`);
    fs.writeFileSync(filePath, JSON.stringify(newAlbum), "utf8");
    return newAlbum;
  } catch (error) {
    throw { code: "failedToUpdateAlbum", message: error.message };
  }
}

function remove(albumId) {
  try {
    const filePath = path.join(albumFolderPath, `${albumId}.json`);
    fs.unlinkSync(filePath);
    return {};
  } catch (error) {
    if (error.code === "ENOENT") return {};
    throw { code: "failedToRemoveAlbum", message: error.message };
  }
}

module.exports = { get, create, update, remove, list };