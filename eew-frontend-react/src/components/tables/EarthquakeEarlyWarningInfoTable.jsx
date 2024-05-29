/**
 * @file EEW info table component.
 * @author [Your Name Here]
 */

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
import EarthquakeEarlyWarningInfoForm from "../forms/EarthquakeEarlyWarningInfoForm";

const EarthquakeEarlyWarningInfoTable = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [errors, setErrors] = useState({
    alert_triggered: "",
    date: "",
    region: "",
    duration: "",
    accuracy: "",
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
      const res = await earthquakeEarlyWarningSystemInstance.get(
        "/eewinfo?amount=100",
      );
      setData(res.data.data);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this item?",
    );
    if (confirmDelete) {
      try {
        await earthquakeEarlyWarningSystemInstance.delete(`/eewinfo/${id}`);
        setData(data.filter((item) => item.id !== id));
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleEdit = (item) => {
    setEditItem(item);
    setModalOpen(true);
  };

  const resetErrors = () => {
    setErrors({
      alert_triggered: "",
      date: "",
      region: "",
      duration: "",
      accuracy: "",
      earthquake_id: "",
      submitError: "",
    });
  };

  const handleEditFormSubmit = async (editedData) => {
    try {
      await earthquakeEarlyWarningSystemInstance.put(
        `/eewinfo/${editItem.id}`,
        editedData,
      );
      const updatedData = data.map((item) =>
        item.id === editItem.id ? { ...item, ...editedData } : item,
      );
      resetErrors();
      setData(updatedData);
      setModalOpen(false);
      setEditItem(null);
    } catch (err) {
      if (err.response && err.response.data && err.response.data.msg) {
        const errorMsg = err.response.data.msg;
        const field = errorMsg.split(" ")[0];
        setErrors({
          ...errors,
          [field]: errorMsg,
        });
        alert(errorMsg);
      } else {
        console.log(err);
      }
    }
  };

  const handleFormSubmit = () => fetchData();

  return (
    <>
      <EarthquakeEarlyWarningInfoForm onFormSubmit={handleFormSubmit} />
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <Table>
            <thead>
              <tr>
                <th>Id</th>
                <th>Alert Triggered</th>
                <th>Date</th>
                <th>Region</th>
                <th>Duration</th>
                <th>Accuracy</th>
                <th>Earthquake Id</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.length === 0 ? (
                <tr>
                  <td colSpan="8" className="text-center">
                    No data available
                  </td>
                </tr>
              ) : (
                <>
                  {data.map((item) => (
                    <tr key={item.id}>
                      <td>{item.id}</td>
                      <td>{item.alert_triggered.toString()}</td>
                      <td>{item.date}</td>
                      <td>{item.region}</td>
                      <td>{item.duration}</td>
                      <td>{item.accuracy}</td>
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
              resetErrors();
              setModalOpen(!modalOpen);
            }}
          >
            <ModalHeader
              toggle={() => {
                resetErrors();
                setModalOpen(!modalOpen);
              }}
            >
              Edit Item
            </ModalHeader>
            <ModalBody>
              <FormGroup>
                <Label for="editAlertTriggered">Alert Triggered:</Label>
                <Input
                  type="select"
                  defaultValue={editItem?.alert_triggered}
                  id="editAlertTriggered"
                  name="editAlertTriggered"
                  invalid={!!errors.alert_triggered}
                >
                  <option>Select Alert Status</option>
                  <option value="true">True</option>
                  <option value="false">False</option>
                </Input>
                <FormFeedback>{errors.alert_triggered}</FormFeedback>
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
                <Label for="editAccuracy">Accuracy:</Label>
                <Input
                  type="number"
                  defaultValue={editItem?.accuracy}
                  id="editAccuracy"
                  name="editAccuracy"
                  invalid={!!errors.accuracy}
                />
                <FormFeedback>{errors.accuracy}</FormFeedback>
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
                onClick={() => {
                  const editedData = {
                    alert_triggered:
                      document.getElementById("editAlertTriggered").value,
                    date: new Date(
                      document.getElementById("editDate").value,
                    ).toISOString(),
                    region: document.getElementById("editRegion").value,
                    duration: parseFloat(
                      document.getElementById("editDuration").value,
                    ),
                    accuracy: parseFloat(
                      document.getElementById("editAccuracy").value,
                    ),
                    earthquake_id: parseInt(
                      document.getElementById("editEarthquakeId").value,
                      10,
                    ),
                  };
                  const alertStr =
                    document.getElementById("editAlertTriggered").value;
                  if (alertStr == "true") {
                    editedData.alert_triggered = true;
                  } else {
                    editedData.alert_triggered = false;
                  }
                  handleEditFormSubmit(editedData);
                }}
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

export default EarthquakeEarlyWarningInfoTable;
