import {
  useGetLeaveQuery,
  useRemoveLeaveTypeMutation,
} from "../Features/apiSlice";
import Table from "react-bootstrap/Table";
import { Badge, Stack } from "react-bootstrap";
import Swal from "sweetalert2";
import UpdateData from "./UpdateData";
import { useEffect, useState } from "react";

const ShowData = () => {
  const { data, isLoading, error } = useGetLeaveQuery();
  const [RemoveLeaveType] = useRemoveLeaveTypeMutation();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  // console.log(data);

  const DeleteData = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await RemoveLeaveType(id);
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
          }).then(() => {
            window.location.reload();
          });
        } catch (error) {
          console.error("Error deleting data", error);
          Swal.fire({
            title: "Error",
            text: "An error occurred while deleting the file.",
            icon: "error",
          });
        }
      }
    });
  };

  return (
    <div>
      {error ? (
        <p className="text-center">Oh no, there was an error</p>
      ) : isLoading ? (
        <h3 className="text-center">please wait ...</h3>
      ) : data ? (
        <div>
          <h3 className="text-center">ALL DATA = {data?.data?.length}</h3>

          <Table striped bordered hover>
            <thead>
              <tr>
                <th className="text-uppercase">Name</th>
                <th className="text-uppercase">Status</th>
                <th className="text-uppercase">Type</th>
                <th className="text-uppercase">Update</th>
                <th className="text-uppercase">Delete</th>
              </tr>
            </thead>
            {data?.data?.map((val, key) => (
              <tbody key={key}>
                <tr>
                  <td className="text-capitalize">{val.name}</td>

                  <td>{val.status}</td>
                  <td>{val.updatedAt}</td>
                  <td>
                    <UpdateData
                      isOpen={isModalOpen}
                      onClose={handleCloseModal}
                      item={val}
                    />
                  </td>
                  <td>
                    <Stack direction="horizontal" gap={2}>
                      <Badge
                        onClick={() => DeleteData(val._id, val)}
                        style={{
                          cursor: "pointer",
                        }}
                        pill
                        bg="danger"
                      >
                        delete
                      </Badge>
                    </Stack>
                  </td>
                </tr>
              </tbody>
            ))}
          </Table>

          {/* {isModalOpen && (
            <ModalAddedData isOpen={isModalOpen} onClose={handleCloseModal} />
          )} */}
        </div>
      ) : null}
    </div>
  );
};

export default ShowData;
