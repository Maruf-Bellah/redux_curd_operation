import React from "react";
import { useState } from "react";
import { Badge, Form, InputGroup, Stack } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { useEditLeaveMutation } from "../Features/apiSlice";

const UpdateData = ({ item }) => {
  // console.log(item);

  const [updateData, setUpdateData] = useState(item);

  const [editLeave] = useEditLeaveMutation();

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
    console.log(data);

    data.store = "6566e648a8d45ce8cf3f0f6b";
    data._id = `${item?._id}`;
    data.type = `${item.type}`;
    editLeave({ postBody: data });
  };

  const updateHandler = (data) => {
    handleShow();
  };

  return (
    <div>
      <Stack direction="horizontal" onClick={updateHandler} gap={2}>
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
                value={updateData?.name}
                onChange={(e) => {
                  setUpdateData({ ...updateData, name: e.target.value });
                }}
                placeholder="Please Enter Income Section"
              />
              <p className="text-danger mt-2">{errors.name?.message}</p>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupPassword">
              <Form.Label>Status</Form.Label>

              <Form.Select
                {...register("status")}
                value={updateData?.status}
                onChange={(e) => {
                  setUpdateData({ ...updateData, status: e.target.value });
                }}
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
