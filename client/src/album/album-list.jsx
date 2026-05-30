import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AlbumContext } from "./album-provider";
import Button from "react-bootstrap/Button";
import Stack from "react-bootstrap/Stack";
import Card from "react-bootstrap/Card";
import Icon from "@mdi/react";
import { mdiPlus, mdiPencilOutline, mdiDeleteOutline } from "@mdi/js";
import AlbumItemForm from "./album-item-form";
import AlbumItemDeleteDialog from "./album-item-delete-dialog";

function AlbumList() {
  const { data } = useContext(AlbumContext);
  const [formItem, setFormItem] = useState(null);
  const [deleteItem, setDeleteItem] = useState(null);
  const navigate = useNavigate();

  return (
    <div>
      {formItem !== null && (
        <AlbumItemForm
          item={formItem}
          onClose={() => setFormItem(null)}
        />
      )}
      {deleteItem && (
        <AlbumItemDeleteDialog
          item={deleteItem}
          onClose={() => setDeleteItem(null)}
        />
      )}
      <Stack direction="horizontal" gap={3} className="mb-4">
        <div className="page-title">Přehled alb</div>
        <div className="ms-auto">
          <Button
            className="btn-sage"
            size="sm"
            onClick={() => setFormItem({})}
          >
            <Icon path={mdiPlus} size={0.7} /> Přidat album
          </Button>
        </div>
      </Stack>
      {data.itemList.length > 0 ? (
        data.itemList.map((album) => (
          <Card key={album.id} className="card-album mb-3">
            <Card.Body>
              <Stack direction="horizontal" gap={3}>
                <div
                  style={{ flex: 1 }}
                  onClick={() => navigate(`/albumDetail/${album.id}`)}
                >
                  <div style={{ fontSize: "17px", fontWeight: 500 }}>{album.nazev}</div>
                  <div className="text-sage-muted" style={{ fontSize: "14px" }}>
                    {album.interpret}
                    {album.rokVydani ? ` · ${album.rokVydani}` : ""}
                    {album.zanr ? ` · ${album.zanr}` : ""}
                  </div>
                </div>
                <div>
                  <Button
                    className="btn-sage-outline me-1"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      setFormItem(album);
                    }}
                  >
                    <Icon path={mdiPencilOutline} size={0.7} />
                  </Button>
                  <Button
                    className="btn-pink-outline"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      setDeleteItem(album);
                    }}
                  >
                    <Icon path={mdiDeleteOutline} size={0.7} />
                  </Button>
                </div>
              </Stack>
            </Card.Body>
          </Card>
        ))
      ) : (
        <div className="empty-state">
          <i className="ti ti-music" aria-hidden="true"></i>
          <p>Zatím žádná alba. Přidej první!</p>
        </div>
      )}
    </div>
  );
}

export default AlbumList;