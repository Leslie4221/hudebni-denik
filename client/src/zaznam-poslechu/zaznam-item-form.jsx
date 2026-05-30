import { useContext, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import { ZaznamListContext } from "./zaznam-list-provider";

function ZaznamItemForm({ item, onClose }) {
  const { state, handlerMap } = useContext(ZaznamListContext);
  const [errorState, setErrorState] = useState();

  const isUpdate = !!item?.id;

  return (
    <Modal show={true} onHide={onClose}>
      <Form
        onSubmit={async (e) => {
          e.preventDefault();
          const formData = new FormData(e.target);
          const values = Object.fromEntries(formData);

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
          <Modal.Title>{isUpdate ? "Upravit" : "Přidat"} záznam poslechu</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {errorState && <Alert variant="danger">{errorState}</Alert>}
          <Form.Group className="mb-2">
            <Form.Label>Datum poslechu *</Form.Label>
            <Form.Control
              type="date"
              name="datumPostlechu"
              defaultValue={item?.datumPostlechu || new Date().toISOString().slice(0, 10)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Oblíbená skladba *</Form.Label>
            <Form.Control
              type="text"
              name="oblibenaSkaldba"
              defaultValue={item?.oblibenaSkaldba}
              required
            />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Komentář *</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="komentar"
              defaultValue={item?.komentar}
              required
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

export default ZaznamItemForm;