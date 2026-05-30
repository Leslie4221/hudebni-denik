async function Call(baseUri, useCase, dtoIn, method) {
  let response;
  if (!method || method === "get") {
    response = await fetch(
      `${baseUri}/${useCase}${
        dtoIn && Object.keys(dtoIn).length
          ? `?${new URLSearchParams(dtoIn)}`
          : ""
      }`
    );
  } else {
    response = await fetch(`${baseUri}/${useCase}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dtoIn),
    });
  }
  const data = await response.json();
  return { ok: response.ok, status: response.status, data };
}

const baseUri = "http://localhost:3000";

const FetchHelper = {
  album: {
    get: async (dtoIn) => {
      return await Call(baseUri, "album/get", dtoIn, "get");
    },
    create: async (dtoIn) => {
      return await Call(baseUri, "album/create", dtoIn, "post");
    },
    update: async (dtoIn) => {
      return await Call(baseUri, "album/update", dtoIn, "post");
    },
    delete: async (dtoIn) => {
      return await Call(baseUri, "album/delete", dtoIn, "post");
    },
    list: async () => {
      return await Call(baseUri, "album/list", null, "get");
    },
  },

  zaznamPostlechu: {
    get: async (dtoIn) => {
      return await Call(baseUri, "zaznam-poslechu/get", dtoIn, "get");
    },
    create: async (dtoIn) => {
      return await Call(baseUri, "zaznam-poslechu/create", dtoIn, "post");
    },
    update: async (dtoIn) => {
      return await Call(baseUri, "zaznam-poslechu/update", dtoIn, "post");
    },
    delete: async (dtoIn) => {
      return await Call(baseUri, "zaznam-poslechu/delete", dtoIn, "post");
    },
    listByAlbumId: async (dtoIn) => {
      return await Call(baseUri, "zaznam-poslechu/listByAlbumId", dtoIn, "get");
    },
  },
};

export default FetchHelper;