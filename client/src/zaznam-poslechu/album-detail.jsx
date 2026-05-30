import { useParams } from "react-router-dom";
import ZaznamListProvider from "./zaznam-list-provider";
import ZaznamList from "./zaznam-list";

function AlbumDetail() {
  const { id } = useParams();

  return (
    <ZaznamListProvider albumId={id}>
      <ZaznamList />
    </ZaznamListProvider>
  );
}

export default AlbumDetail;