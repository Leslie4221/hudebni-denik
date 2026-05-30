import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ZaznamListContext } from "./zaznam-list-provider";
import Loading from "../common/loading";
import Error from "../common/error";
import Button from "react-bootstrap/Button";
import Stack from "react-bootstrap/Stack";
import Card from "react-bootstrap/Card";
import Icon from "@mdi/react";
import { mdiPlus, mdiArrowLeft, mdiPencilOutline, mdiDeleteOutline } from "@mdi/js";
import ZaznamItemForm from "./zaznam-item-form";
import ZaznamItemDeleteDialog from "./zaznam-item-delete-dialog";

function ZaznamList() {
  const { album, data, state, error } = useContext(ZaznamListContext);
  const [showForm, setShowForm] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [deleteItem, setDeleteItem] = useState(null);
  const navigate = useNavigate();

  if (state === "loading" && !data) return <Loading />;
  if (state === "error" && !data) return <Error message={error?.message || "Nastala chyba"} />;
  if (!data) return null;

  return (
    <div>
      {showForm && (
        <ZaznamItemForm
          item={editItem}
          onClose={() => {
            setShowForm(false);
            setEditItem(null);
          }}
        />
      )}
      {deleteItem && (
        <ZaznamItemDeleteDialog
          item={deleteItem}
          onClose={() => setDeleteItem(null)}
        />
      )}
      <Button
        className="btn-sage-outline mb-3"
        size="sm"
        onClick={() => navigate("/")}
      >
        <Icon path={mdiArrowLeft} size={0.7} /> Zpět na přehled
      </Button>
      <div className="page-title">{album?.nazev}</div>
      <p className="text-sage-muted">
        {album?.interpret}
        {album?.rokVydani ? ` · ${album.rokVydani}` : ""}
        {album?.zanr ? ` · ${album.zanr}` : ""}
      </p>
      <Stack direction="horizontal" gap={3} className="mb-3">
        <h3 className="text-sage" style={{ fontWeight: 500 }}>Záznamy poslechu</h3>
        <div className="ms-auto">
          <Button
            className="btn-sage"
            size="sm"
            onClick={() => {
              setEditItem(null);
              setShowForm(true);
            }}
          >
            <Icon path={mdiPlus} size={0.7} /> Přidat záznam
          </Button>
        </div>
      </Stack>
      {data.itemList.length > 0 ? (
        data.itemList.map((zaznam) => (
          <Card key={zaznam.id} className="card-zaznam mb-3">
            <Card.Body>
              <Stack direction="horizontal" gap={3}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: "15px", fontWeight: 500 }} className="text-sage">
                    {new Date(zaznam.datumPostlechu).toLocaleDateString("cs")}
                  </div>
                  <div style={{ fontSize: "14px", marginTop: 4 }}>
                    <i className="ti ti-music" aria-hidden="true" style={{ fontSize: "14px", marginRight: 4 }}></i>
                    {zaznam.oblibenaSkaldba}
                  </div>
                  <div className="text-sage-muted" style={{ fontSize: "13px", marginTop: 4 }}>
                    {zaznam.komentar}
                  </div>
                </div>
                <div>
                  <Button
                    className="btn-sage-outline me-1"
                    size="sm"
                    onClick={() => {
                      setEditItem(zaznam);
                      setShowForm(true);
                    }}
                  >
                    <Icon path={mdiPencilOutline} size={0.7} />
                  </Button>
                  <Button
                    className="btn-pink-outline"
                    size="sm"
                    onClick={() => setDeleteItem(zaznam)}
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
          <i className="ti ti-headphones" aria-hidden="true"></i>
          <p>Zatím žádné záznamy. Přidej první!</p>
        </div>
      )}
    </div>
  );
}

export default ZaznamList;