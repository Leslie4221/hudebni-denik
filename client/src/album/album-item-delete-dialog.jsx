import { useContext, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import { AlbumContext } from "./album-provider";

function AlbumItemDeleteDialog({ item, onClose }) {
  const { state, handlerMap } = useContext(AlbumContext);
  const [errorState, setErrorState] = useState();

  return (
    <Modal show={true} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Smazat album</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {errorState && <Alert variant="danger">{errorState}</Alert>}
        <p>Opravdu chceš smazat album <strong>{item.nazev}</strong>?</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Zrušit
        </Button>
        <Button
          variant="danger"
          disabled={state === "deleting"}
          onClick={async () => {
            const result = await handlerMap.handleDelete({ id: item.id });
            if (result.ok) {
              onClose();
            } else {
              setErrorState("Nastala chyba při mazání");
            }
          }}
        >
          Smazat
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default AlbumItemDeleteDialog;