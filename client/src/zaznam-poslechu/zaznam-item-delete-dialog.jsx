import { useContext, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import { ZaznamListContext } from "./zaznam-list-provider";

function ZaznamItemDeleteDialog({ item, onClose }) {
  const { state, handlerMap } = useContext(ZaznamListContext);
  const [errorState, setErrorState] = useState();

  return (
    <Modal show={true} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Smazat záznam</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {errorState && <Alert variant="danger">{errorState}</Alert>}
        <p>Opravdu chceš smazat záznam z <strong>{new Date(item.datumPostlechu).toLocaleDateString("cs")}</strong>?</p>
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

export default ZaznamItemDeleteDialog;