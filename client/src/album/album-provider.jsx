import { createContext, useState, useEffect } from "react";
import FetchHelper from "../fetch-helper";

export const AlbumContext = createContext();

const AlbumProvider = ({ children }) => {
  const [data, setData] = useState();
  const [error, setError] = useState();
  const [state, setState] = useState("loading");

  const fetchAlbums = async () => {
    setState("loading");
    const result = await FetchHelper.album.list();
    if (result.ok) {
      setData(result.data);
      setState("success");
    } else {
      setError(result.data);
      setState("error");
    }
  };

  useEffect(() => {
    fetchAlbums();
  }, []);

  const handleCreate = async (dtoIn) => {
    setState("creating");
    const result = await FetchHelper.album.create(dtoIn);
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
    const result = await FetchHelper.album.update(dtoIn);
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
    const result = await FetchHelper.album.delete(dtoIn);
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
    <AlbumContext.Provider
      value={{
        data,
        state,
        error,
        handlerMap: {
          handleCreate,
          handleUpdate,
          handleDelete,
          fetchAlbums,
        },
      }}
    >
      {children}
    </AlbumContext.Provider>
  );
};

export default AlbumProvider;