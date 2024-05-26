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
import SensorInfoForm from "../forms/SensorInfoForm";

const SensorInfoTable = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [errors, setErrors] = useState({
    location: "",
    region: "",
    sensor_type: "",
    activate: "",
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
      const res = await earthquakeEarlyWarningSystemInstance.get("/sensorinfo?amount=100");
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
        await earthquakeEarlyWarningSystemInstance.delete(`/sensorinfo/${id}`);
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
        location: "",
        region: "",
        sensor_type: "",
        activate: "",
        earthquake_id: "",
      submitError: "",
    });
  };

  const handleEditFormSubmit = async (editedData) => {
    try {
      await earthquakeEarlyWarningSystemInstance.put(`/sensorinfo/${editItem.id}`, editedData);
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
      <SensorInfoForm onFormSubmit={handleFormSubmit} />
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <Table>
            <thead>
              <tr>
                <th>Id</th>
                <th>Sensor Location</th>
                <th>Sensor Region</th>
                <th>Sensor Type</th>
                <th>Sensor Active?</th>
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
                      <td>{item.location}</td>
                      <td>{item.region}</td>
                      <td>{item.sensor_type}</td>
                      <td>{item.activate}</td>
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
                <Label for="editLocation">Sensor Location:</Label>
                <Input
                  type="text"
                  defaultValue={editItem?.location}
                  id="editLocation"
                  name="editLocation"
                  invalid={!!errors.location}
                />
                <FormFeedback>{errors.location}</FormFeedback>
              </FormGroup>
              <FormGroup>
                <Label for="editRegion">Sensor Region:</Label>
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
                <Label for="editSensorType">Sensor Type:</Label>
                <Input
                  type="text"  // ENUM!!!!
                  defaultValue={editItem?.sensor_type}
                  id="editSensorType"
                  name="editSensorType"
                  invalid={!!errors.sensor_type}
                />
                <FormFeedback>{errors.sensor_type}</FormFeedback>
              </FormGroup>
              <FormGroup>
                <Label for="editActivate">Sensor Active?:</Label>
                <Input
                  type="text"  // BOOLEAN!!!
                  defaultValue={editItem?.activate}
                  id="editActivate"
                  name="editActivate"
                  invalid={!!errors.activate}
                />
                <FormFeedback>{errors.activate}</FormFeedback>
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
                    location: document.getElementById("editLocation").value,
                    region: document.getElementById("editRegion").value,
                    sensor_type: document.getElementById("editSensorType").value,
                    activate: document.getElementById("editActivate").value,
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

export default SensorInfoTable;
