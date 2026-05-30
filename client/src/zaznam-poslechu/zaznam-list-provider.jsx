import { createContext, useState, useEffect } from "react";
import FetchHelper from "../fetch-helper";

export const ZaznamListContext = createContext();

function ZaznamListProvider({ albumId, children }) {
  const [album, setAlbum] = useState();
  const [data, setData] = useState();
  const [error, setError] = useState();
  const [state, setState] = useState("loading");

  const fetchData = async () => {
    setState("loading");

    const albumResult = await FetchHelper.album.get({ id: albumId });
    if (!albumResult.ok) {
      setError(albumResult.data);
      setState("error");
      return;
    }
    setAlbum(albumResult.data);

    const zaznamResult = await FetchHelper.zaznamPostlechu.listByAlbumId({ albumId });
    if (zaznamResult.ok) {
      setData(zaznamResult.data);
      setState("success");
    } else {
      setError(zaznamResult.data);
      setState("error");
    }
  };

  useEffect(() => {
    fetchData();
  }, [albumId]);

  const handleCreate = async (dtoIn) => {
    setState("creating");
    const result = await FetchHelper.zaznamPostlechu.create({ albumId, ...dtoIn });
    if (result.ok) {
      setData((current) => {
        current.itemList.push(result.data);
        return { ...current };
      });
      setState("success");
    } else {
      setError(result.data);
      setState("error");
    }
    return { ok: result.ok };
  };

  const handleUpdate = async (dtoIn) => {
    setState("updating");
    const result = await FetchHelper.zaznamPostlechu.update(dtoIn);
    if (result.ok) {
      setData((current) => {
        const index = current.itemList.findIndex((item) => item.id === dtoIn.id);
        current.itemList[index] = result.data;
        return { ...current };
      });
      setState("success");
    } else {
      setError(result.data);
      setState("error");
    }
    return { ok: result.ok };
  };

  const handleDelete = async (dtoIn) => {
    setState("deleting");
    const result = await FetchHelper.zaznamPostlechu.delete(dtoIn);
    if (result.ok) {
      setData((current) => {
        const index = current.itemList.findIndex((item) => item.id === dtoIn.id);
        current.itemList.splice(index, 1);
        return { ...current };
      });
      setState("success");
    } else {
      setError(result.data);
      setState("error");
    }
    return { ok: result.ok };
  };

  return (
    <ZaznamListContext.Provider
      value={{
        album,
        data,
        state,
        error,
        handlerMap: {
          handleCreate,
          handleUpdate,
          handleDelete,
          fetchData,
        },
      }}
    >
      {children}
    </ZaznamListContext.Provider>
  );
}

export default ZaznamListProvider;