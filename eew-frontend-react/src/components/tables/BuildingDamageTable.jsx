/**
 * @file Building damage report table component.
 * @author Ben Mahoney
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
import BuildingDamageForm from "../forms/BuildingDamageForm";

const BuildingDamageTable = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [errors, setErrors] = useState({
    houses_damaged: "",
    houses_destroyed: "",
    commerical_damaged: "",
    commerical_destroyed: "",
    earthquake_id: "",
    cost: "",
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
      const res = await earthquakeEarlyWarningSystemInstance.get("/buildings?amount=100");
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
        await earthquakeEarlyWarningSystemInstance.delete(`/buildings/${id}`);
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
      houses_damaged: "",
      houses_destroyed: "",
      commerical_damaged: "",
      commerical_destroyed: "",
      earthquake_id: "",
      cost: "",
      submitError: "",
    });
  };

  const handleEditFormSubmit = async (editedData) => {
    try {
      await earthquakeEarlyWarningSystemInstance.put(`/buildings/${editItem.id}`, editedData);
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
                <th>Houses Damaged</th>
                <th>Houses Destroyed</th>
                <th>Commerical Damaged</th>
                <th>Commerical Destroyed</th>
                <th>Earthquake Id</th>
                <th>Cost</th>
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
                      <td>{item.houses_damaged}</td>
                      <td>{item.houses_destroyed}</td>
                      <td>{item.commerical_damaged}</td>
                      <td>{item.commerical_destroyed}</td>
                      <td>{item.earthquake_id}</td>
                      <td>{item.cost}</td>
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
                <Label for="editHousesDamaged">Houses Damaged:</Label>
                <Input
                  type="number"
                  defaultValue={editItem?.houses_damaged}
                  id="editHousesDamaged"
                  name="editHousesDamaged"
                  invalid={!!errors.houses_damaged}
                />
                <FormFeedback>{errors.houses_damaged}</FormFeedback>
              </FormGroup>
              <FormGroup>
                <Label for="editHousesDestroyed">Houses Destroyed:</Label>
                <Input
                  type="number"
                  defaultValue={editItem?.houses_destroyed}
                  id="editHousesDestroyed"
                  name="editHousesDestroyed"
                  invalid={!!errors.houses_destroyed}
                />
                <FormFeedback>{errors.houses_destroyed}</FormFeedback>
              </FormGroup>
              <FormGroup>
                <Label for="editCommericalDamaged">Commerical Damaged:</Label>
                <Input
                  type="number"
                  defaultValue={editItem?.commerical_damaged}
                  id="editCommericalDamaged"
                  name="editCommericalDamaged"
                  invalid={!!errors.commerical_damaged}
                />
                <FormFeedback>{errors.commerical_damaged}</FormFeedback>
              </FormGroup>
              <FormGroup>
                <Label for="editCommericalDestroyed">Commerical Destroyed:</Label>
                <Input
                  type="number"
                  defaultValue={editItem?.commerical_destroyed}
                  id="editCommericalDestroyed"
                  name="editCommericalDestroyed"
                  invalid={!!errors.commerical_destroyed}
                />
                <FormFeedback>{errors.commerical_destroyed}</FormFeedback>
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
              <FormGroup>
                <Label for="editCost">Cost:</Label>
                <Input
                  type="number"
                  step="0.1"
                  defaultValue={editItem?.cost}
                  id="editCost"
                  name="editCost"
                  invalid={!!errors.cost}
                />
                <FormFeedback>{errors.cost}</FormFeedback>
              </FormGroup>
            </ModalBody>
            <ModalFooter>
              <Button
                color="primary"
                onClick={() =>
                  handleEditFormSubmit({
                    houses_damaged: parseInt(document.getElementById("editHousesDamaged").value, 10),
                    houses_destroyed: parseInt(document.getElementById("editHousesDestroyed").value, 10),
                    commerical_damaged: parseInt(document.getElementById("editCommericalDamaged").value, 10),
                    commerical_destroyed: parseInt(document.getElementById("editCommericalDestroyed").value, 10),
                    earthquake_id: parseInt(document.getElementById("editEarthquakeId").value, 10),
                    cost: parseFloat(document.getElementById("editCost").value),
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

export default BuildingDamageTable;
