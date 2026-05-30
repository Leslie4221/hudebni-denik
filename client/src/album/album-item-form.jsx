import { useContext, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import { AlbumContext } from "./album-provider";

function AlbumItemForm({ item, onClose }) {
  const { state, handlerMap } = useContext(AlbumContext);
  const [errorState, setErrorState] = useState();

  const isUpdate = !!item?.id;

  return (
    <Modal show={true} onHide={onClose}>
      <Form
        onSubmit={async (e) => {
          e.preventDefault();
          const formData = new FormData(e.target);
          const values = Object.fromEntries(formData);
          values.rokVydani = Number(values.rokVydani);

          let result;
          if (isUpdate) {
            result = await handlerMap.handleUpdate({ id: item.id, ...values });
          } else {
            result = await handlerMap.handleCreate(values);
          }

          if (result.ok) {
            onClose();
          } else {
            setErrorState("Nastala chyba při ukládání");
          }
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>{isUpdate ? "Upravit" : "Přidat"} album</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {errorState && <Alert variant="danger">{errorState}</Alert>}
          <Form.Group className="mb-2">
            <Form.Label>Název *</Form.Label>
            <Form.Control
              type="text"
              name="nazev"
              defaultValue={item?.nazev}
              required
            />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Interpret *</Form.Label>
            <Form.Control
              type="text"
              name="interpret"
              defaultValue={item?.interpret}
              required
            />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Rok vydání *</Form.Label>
            <Form.Control
              type="number"
              name="rokVydani"
              defaultValue={item?.rokVydani}
              required
            />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Žánr</Form.Label>
            <Form.Control
              type="text"
              name="zanr"
              defaultValue={item?.zanr}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onClose}>
            Zrušit
          </Button>
          <Button variant="primary" type="submit" disabled={state === "creating"}>
            Uložit
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

export default AlbumItemForm;