import React from "react";
import { useState } from "react";
import { Badge, Form, InputGroup, Stack } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const UpdateData = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
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
      <Stack direction="horizontal" onClick={handleShow} gap={2}>
        <Badge
          style={{
            cursor: "pointer",
          }}
          pill
          bg="primary"
        >
          Update
        </Badge>
      </Stack>

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

              <Form.Select
                {...register("status")}
                aria-label="Default select example"
              >
                <option value="ACTIVE">ACTIVE</option>
                <option value="INACTIVE">INACTIVE</option>
              </Form.Select>
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

export default UpdateData;
