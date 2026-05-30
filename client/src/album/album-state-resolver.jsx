import { useContext } from "react";
import { AlbumContext } from "./album-provider";
import Loading from "../common/loading";
import Error from "../common/error";
import AlbumList from "./album-list";

const AlbumStateResolver = () => {
  const { data, state, error } = useContext(AlbumContext);

  if (data) {
    return <AlbumList />;
  }

  if (state === "loading" && !data) {
    return <Loading />;
  }

  if (state === "error" && !data) {
    return <Error message={error?.message || "Nastala chyba"} />;
  }
};

export default AlbumStateResolver;