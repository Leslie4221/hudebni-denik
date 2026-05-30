import AlbumProvider from "./album-provider";
import AlbumStateResolver from "./album-state-resolver";

const Albums = () => {
  return (
    <AlbumProvider>
      <AlbumStateResolver />
    </AlbumProvider>
  );
};

export default Albums;