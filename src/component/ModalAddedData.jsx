import { useState } from "react";
import { Form, InputGroup } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const ModalAddedData = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div>
      <Button className="mt-3" variant="primary" onClick={handleShow}>
        Please Open The Modal
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formGroupEmail">
              <Form.Label>Income Section Name</Form.Label>
              <Form.Control placeholder="Please Enter Income Section" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupPassword">
              <Form.Label>Status</Form.Label>
              <Form.Select aria-label="Default select example">
                <option value="1">Active</option>
                <option value="2">Inactive</option>
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>

          <Button type="submit" variant="primary">
            Submit Data
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ModalAddedData;
