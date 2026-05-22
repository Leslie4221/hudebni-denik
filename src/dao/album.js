const albums = [];

const albumDao = {
  create(album) {
    const newAlbum = {
      id: Math.random().toString(32).slice(2),
      ...album,
    };
    albums.push(newAlbum);
    return newAlbum;
  },

  get(id) {
    return albums.find((album) => album.id === id);
  },

  list() {
    return albums;
  },

  update(id, data) {
    const index = albums.findIndex((album) => album.id === id);
    if (index === -1) return null;
    albums[index] = { ...albums[index], ...data };
    return albums[index];
  },

  remove(id) {
    const index = albums.findIndex((album) => album.id === id);
    if (index === -1) return null;
    albums.splice(index, 1);
    return true;
  },
};

module.exports = albumDao;