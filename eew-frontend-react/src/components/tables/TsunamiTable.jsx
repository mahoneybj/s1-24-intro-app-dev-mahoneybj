import { useEffect, useState } from "react";
import {
  Table,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  Label,
  Input,
  FormFeedback,
} from "reactstrap";

import { earthquakeEarlyWarningSystemInstance } from "../../utils/axios";
import TsunamiForm from "../forms/TsunamiForm";

const TsunamiTable = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [errors, setErrors] = useState({
    region: "",
    date: "",
    size: "",
    duration: "",
    earthquake_id: "",
    submitError: "",
  });
  const [editItem, setEditItem] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const res = await earthquakeEarlyWarningSystemInstance.get("/tsunamis?amount=100");
      setData(res.data.data);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this item?");
    if (confirmDelete) {
      try {
        await earthquakeEarlyWarningSystemInstance.delete(`/tsunamis/${id}`);
        setData(data.filter((item) => item.id !== id)); // Remove the item from the data array
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleEdit = (item) => {
    setEditItem(item); // Set the item to be edited
    setModalOpen(true); // Open the modal
  };

  const resetErrors = () => { 
    setErrors({
        region: "",
        date: "",
        size: "",
        duration: "",
        earthquake_id: "",
      submitError: "",
    });
  };

  const handleEditFormSubmit = async (editedData) => {
    try {
      await earthquakeEarlyWarningSystemInstance.put(`/tsunamis/${editItem.id}`, editedData);
      const updatedData = data.map((item) => // Update the item in the data array
        item.id === editItem.id ? { ...item, ...editedData } : item
      );
      resetErrors();
      setData(updatedData);
      setModalOpen(false);
      setEditItem(null);
    } catch (err) {
      // Handle validation errors
      if (err.response && err.response.data && err.response.data.msg) {
        const errorMsg = err.response.data.msg; // Get the error message
        const field = errorMsg.split(" ")[0]; // Get the field name from the error message, i.e., "date should be a string" -> "date"
        setErrors({
          ...errors, // Keep the other errors
          [field]: errorMsg, // Set the error for the field
        });
      } else {
        console.log(err);
      }
    }
  };

  const handleFormSubmit = () => fetchData(); // Refetch data when the form is submitted

  return (
    <>
      <BuildingDamageForm onFormSubmit={handleFormSubmit} />
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <Table>
            <thead>
              <tr>
                <th>Id</th>
                <th>Region</th>
                <th>Date</th>
                <th>Size</th>
                <th>Duration</th>
                <th>Earthquake Id</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center"> 
                    No data available
                  </td>
                </tr>
              ) : (
                <>
                  {data.map((item) => (
                    <tr key={item.id}>
                      <td>{item.id}</td>
                      <td>{item.region}</td>
                      <td>{item.date}</td>
                      <td>{item.size}</td>
                      <td>{item.duration}</td>
                      <td>{item.earthquake_id}</td>
                      <td>
                        <Button
                          color="primary"
                          onClick={() => handleEdit(item)}
                        >
                          Edit
                        </Button>{" "}
                        <Button
                          color="danger"
                          onClick={() => handleDelete(item.id)}
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))}
                </>
              )}
            </tbody>
          </Table>
          <Modal
            isOpen={modalOpen}
            toggle={() => {
              resetErrors(); // Reset errors when the modal is closed
              setModalOpen(!modalOpen);
            }}
          >
            <ModalHeader
              toggle={() => {
                resetErrors(); // Reset errors when the modal is closed
                setModalOpen(!modalOpen);
              }}
            >
              Edit Item
            </ModalHeader>
            <ModalBody>
              <FormGroup>
                <Label for="editRegion">Region:</Label>
                <Input
                  type="text"
                  defaultValue={editItem?.region}
                  id="editRegion"
                  name="editRegion"
                  invalid={!!errors.region}
                />
                <FormFeedback>{errors.region}</FormFeedback>
              </FormGroup>
              <FormGroup>
                <Label for="editDate">Date:</Label>
                <Input
                  type="datetime-local"
                  defaultValue={editItem?.date}
                  id="editDate"
                  name="editDate"
                  invalid={!!errors.date}
                />
                <FormFeedback>{errors.date}</FormFeedback>
              </FormGroup>
              <FormGroup>
                <Label for="editSize">Size:</Label>
                <Input
                  type="number"          
                  step="0.1"
                  defaultValue={editItem?.size}
                  id="editSize"
                  name="editSize"
                  invalid={!!errors.size}
                />
                <FormFeedback>{errors.size}</FormFeedback>
              </FormGroup>
              <FormGroup>
                <Label for="editDuration">Duration:</Label>
                <Input
                  type="number"
                  step="0.1"
                  defaultValue={editItem?.duration}
                  id="editDuration"
                  name="editDuration"
                  invalid={!!errors.duration}
                />
                <FormFeedback>{errors.duration}</FormFeedback>
              </FormGroup>
              <FormGroup>
                <Label for="editEarthquakeId">Earthquake ID:</Label>
                <Input
                  type="number"
                  defaultValue={editItem?.earthquake_id}
                  id="editEarthquakeId"
                  name="editEarthquakeId"
                  invalid={!!errors.earthquake_id}
                />
                <FormFeedback>{errors.earthquake_id}</FormFeedback>
              </FormGroup>
            </ModalBody>
            <ModalFooter>
              <Button
                color="primary"
                onClick={() =>
                  handleEditFormSubmit({
                    region: document.getElementById("editRegion").value,
                    date: document.getElementById("editDate").value,
                    size: document.getElementById("editSize").value,
                    duration: document.getElementById("editDuration").value,
                    earthquake_id: document.getElementById("editEarthquakeId").value,
                  })
                }
              >
                Save
              </Button>
              <Button
                color="secondary"
                onClick={() => {
                  resetErrors();
                  setModalOpen(!modalOpen);
                }}
              >
                Cancel
              </Button>
            </ModalFooter>
          </Modal>
        </>
      )}
    </>
  );
};

export default TsunamiForm;
