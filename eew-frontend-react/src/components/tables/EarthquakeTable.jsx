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
import EarthquakeForm from "../forms/EarthquakeForm";

const EarthquakeTable = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [errors, setErrors] = useState({
    date: "",
    magnitude: "",
    depth: "",
    duration: "",
    intensity: "",
    fault_line: "",
    after_shock_id: "",
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
      const res = await earthquakeEarlyWarningSystemInstance.get("/earthquakes?amount=100");
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
        await earthquakeEarlyWarningSystemInstance.delete(`/earthquakes/${id}`);
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
      date: "",
      magnitude: "",
      depth: "",
      duration: "",
      intensity: "",
      fault_line: "",
      after_shock_id: "",
      submitError: "",
    });
  };

  const handleEditFormSubmit = async (editedData) => {
    try {
      await earthquakeEarlyWarningSystemInstance.put(`/earthquakes/${editItem.id}`, editedData);
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
      <EarthquakeForm onFormSubmit={handleFormSubmit} />
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <Table>
            <thead>
              <tr>
                <th>Id</th>
                <th>Date</th>
                <th>Magnitude</th>
                <th>Depth</th>
                <th>Duration</th>
                <th>Intensity</th>
                <th>Fault Line</th>
                <th>After Shock ID</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.length === 0 ? (
                <tr>
                  <td colSpan="9" className="text-center"> 
                    No data available
                  </td>
                </tr>
              ) : (
                <>
                  {data.map((item) => (
                    <tr key={item.id}>
                      <td>{item.id}</td>
                      <td>{new Date(item.date).toLocaleString()}</td>
                      <td>{item.magnitude}</td>
                      <td>{item.depth}</td>
                      <td>{item.duration}</td>
                      <td>{item.intensity}</td>
                      <td>{item.fault_line}</td>
                      <td>{item.after_shock_id}</td>
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
                <Label for="editMagnitude">Magnitude:</Label>
                <Input
                  type="number"
                  step="0.1"
                  defaultValue={editItem?.magnitude}
                  id="editMagnitude"
                  name="editMagnitude"
                  invalid={!!errors.magnitude}
                />
                <FormFeedback>{errors.magnitude}</FormFeedback>
              </FormGroup>
              <FormGroup>
                <Label for="editDepth">Depth:</Label>
                <Input
                  type="number"
                  step="0.1"
                  defaultValue={editItem?.depth}
                  id="editDepth"
                  name="editDepth"
                  invalid={!!errors.depth}
                />
                <FormFeedback>{errors.depth}</FormFeedback>
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
                <Label for="editIntensity">Intensity:</Label>
                <Input
                  type="number"
                  defaultValue={editItem?.intensity}
                  id="editIntensity"
                  name="editIntensity"
                  invalid={!!errors.intensity}
                />
                <FormFeedback>{errors.intensity}</FormFeedback>
              </FormGroup>
              <FormGroup>
                <Label for="editFaultLine">Fault Line:</Label>
                <Input
                  type="text"
                  defaultValue={editItem?.fault_line}
                  id="editFaultLine"
                  name="editFaultLine"
                  invalid={!!errors.fault_line}
                />
                <FormFeedback>{errors.fault_line}</FormFeedback>
              </FormGroup>
              <FormGroup>
                <Label for="editAfterShockId">After Shock ID:</Label>
                <Input
                  type="number"
                  defaultValue={editItem?.after_shock_id}
                  id="editAfterShockId"
                  name="editAfterShockId"
                  invalid={!!errors.after_shock_id}
                />
                <FormFeedback>{errors.after_shock_id}</FormFeedback>
              </FormGroup>
            </ModalBody>
            <ModalFooter>
              <Button
                color="primary"
                onClick={() =>
                  handleEditFormSubmit({
                    date: document.getElementById("editDate").value,
                    magnitude: document.getElementById("editMagnitude").value,
                    depth: document.getElementById("editDepth").value,
                    duration: document.getElementById("editDuration").value,
                    intensity: document.getElementById("editIntensity").value,
                    fault_line: document.getElementById("editFaultLine").value,
                    after_shock_id: document.getElementById("editAfterShockId").value,
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

export default EarthquakeTable;
