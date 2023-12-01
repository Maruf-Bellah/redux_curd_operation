import { useState } from "react";
import { Form, InputGroup } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { useAddLeaveMutation } from "../Features/apiSlice";

const ModalAddedData = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [AddLeave, { isLoading, error }] = useAddLeaveMutation();

  const schema = yup
    .object({
      name: yup.string().required(),
      status: yup.string().required(),
    })
    .required();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = (data) => {
    data.store = "6566e648a8d45ce8cf3f0f6b";
    AddLeave(data);
  };

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
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className="mb-3" controlId="formGroupEmail">
              <Form.Label>Income Section Name</Form.Label>
              <Form.Control
                {...register("name")}
                placeholder="Please Enter Income Section"
              />
              <p className="text-danger mt-2">{errors.name?.message}</p>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupPassword">
              <Form.Label>Status</Form.Label>

              <Form.Control
                {...register("status")}
                placeholder="Please Enter Income Section"
              />
              <p className="text-danger mt-2">{errors.status?.message}</p>
            </Form.Group>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button
              onClick={handleClose}
              className="text-center ms-2"
              type="submit"
              variant="primary"
            >
              Submit Data
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ModalAddedData;
