import { useState } from "react";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormFeedback,
} from "reactstrap";
import PropTypes from "prop-types";

import { earthquakeEarlyWarningSystemInstance } from "../../utils/axios";

const BuildingDamageForm = ({ onFormSubmit }) => {
  const [formData, setFormData] = useState({
    houses_damaged: "",
    houses_destroyed: "",
    commerical_damaged: "",
    commerical_destroyed: "",
    earthquake_id: "",
    cost: "",
  });
  const [errors, setErrors] = useState({
    houses_damaged: "",
    houses_destroyed: "",
    commerical_damaged: "",
    commerical_destroyed: "",
    earthquake_id: "",
    cost: "",
    submitError: "",
  });

  // This function is called when the input fields change
  const handleChange = (e) => {
    const { name, value } = e.target; // name refers to the name attribute of the input field, value refers to the value of the input field
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  // This function is called when the form is submitted
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission
    try {
      await earthquakeEarlyWarningSystemInstance.post("/buildings", formData);
      setFormData({
        houses_damaged: "",
        houses_destroyed: "",
        commerical_damaged: "",
        commerical_destroyed: "",
        earthquake_id: "",
        cost: "",
      });
      setErrors({
        houses_damaged: "",
        houses_destroyed: "",
        commerical_damaged: "",
        commerical_destroyed: "",
        earthquake_id: "",
        cost: "",
        submitError: "",
      });
      onFormSubmit(); // Call the onFormSubmit prop
    } catch (err) {
      // Handle validation errors
      if (err.response && err.response.data && err.response.data.msg) {
        const errorMsg = err.response.data.msg; // Get the error message
        const field = errorMsg.split(" ")[0]; // Get the field name from the error message, i.e., "date should be a string" -> "date"
        setErrors((prevErrors) => ({
          ...prevErrors, // Keep the other errors
          [field]: errorMsg, // Set the error for the field
        }));
      } else {
        console.log(err);
      }
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <Label for="houses_damaged">Houses Damaged:</Label>
        <Input
          type="number"
          value={formData.houses_damaged}
          id="houses_damaged"
          name="houses_damaged"
          onChange={handleChange}
          invalid={!!errors.houses_damaged}
        />
        <FormFeedback>{errors.houses_damaged}</FormFeedback>
      </FormGroup>
      <FormGroup>
        <Label for="houses_destroyed">Houses Destroyed:</Label>
        <Input
          type="number"
          value={formData.houses_destroyed}
          id="houses_destroyed"
          name="houses_destroyed"
          onChange={handleChange}
          invalid={!!errors.houses_destroyed}
        />
        <FormFeedback>{errors.houses_destroyed}</FormFeedback>
      </FormGroup>
      <FormGroup>
        <Label for="commerical_damaged">Commerical Damaged:</Label>
        <Input
          type="number"
          value={formData.commerical_damaged}
          id="commerical_damaged"
          name="commerical_damaged"
          onChange={handleChange}
          invalid={!!errors.commerical_damaged}
        />
        <FormFeedback>{errors.commerical_damaged}</FormFeedback>
      </FormGroup>
      <FormGroup>
        <Label for="commerical_destroyed">Commerical Destroyed:</Label>
        <Input
          type="number"
          value={formData.commerical_destroyed}
          id="commerical_destroyed"
          name="commerical_destroyed"
          onChange={handleChange}
          invalid={!!errors.commerical_destroyed}
        />
        <FormFeedback>{errors.commerical_destroyed}</FormFeedback>
      </FormGroup>
      <FormGroup>
        <Label for="earthquake_id">Earthquake Id:</Label>
        <Input
          type="number"
          value={formData.earthquake_id}
          id="earthquake_id"
          name="earthquake_id"
          onChange={handleChange}
          invalid={!!errors.earthquake_id}
        />
        <FormFeedback>{errors.earthquake_id}</FormFeedback>
      </FormGroup>
      <FormGroup>
        <Label for="cost">Cost:</Label>
        <Input
          type="number"
          step="0.1"
          value={formData.cost}
          id="cost"
          name="cost"
          onChange={handleChange}
          invalid={!!errors.cost}
        />
        <FormFeedback>{errors.cost}</FormFeedback>
      </FormGroup>
      {errors.submitError && (
        <div className="text-danger">{errors.submitError}</div>
      )}
      <Button type="submit">Add Building Damage</Button>
    </Form>
  );
};

BuildingDamageForm.propTypes = {
  onFormSubmit: PropTypes.func.isRequired,
};

export default BuildingDamageForm;
