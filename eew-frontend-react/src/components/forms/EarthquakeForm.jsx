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

const EarthquakeForm = ({ onFormSubmit }) => {
  const [formData, setFormData] = useState({
    date: "",
    magnitude: "",
    depth: "",
    duration: "",
    intensity: "",
    fault_line: "",
    after_shock_id: "",
  });
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
        const payload = {
          date: new Date(formData.date).toISOString(),
          magnitude: parseFloat(formData.magnitude),
          depth: parseFloat(formData.depth, 10),
          duration: parseFloat(formData.duration),
          intensity: parseInt(formData.intensity),
          fault_line: formData.fault_line,
          after_shock_id: parseInt(formData.after_shock_id, 10),
        };

      await earthquakeEarlyWarningSystemInstance.post("/earthquakes", payload);
      setFormData({
        date: "",
        magnitude: "",
        depth: "",
        duration: "",
        intensity: "",
        fault_line: "",
        after_shock_id: "",
      });
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
        <Label for="date">Date:</Label>
        <Input
          type="datetime-local"
          value={formData.date}
          id="date"
          name="date"
          onChange={handleChange}
          invalid={!!errors.date}
        />
        <FormFeedback>{errors.date}</FormFeedback>
      </FormGroup>
      <FormGroup>
        <Label for="magnitude">Magnitude:</Label>
        <Input
          type="number"
          step="0.1"
          value={formData.magnitude}
          id="magnitude"
          name="magnitude"
          onChange={handleChange}
          invalid={!!errors.magnitude}
        />
        <FormFeedback>{errors.magnitude}</FormFeedback>
      </FormGroup>
      <FormGroup>
        <Label for="depth">Depth:</Label>
        <Input
          type="number"
          step="0.1"
          value={formData.depth}
          id="depth"
          name="depth"
          onChange={handleChange}
          invalid={!!errors.depth}
        />
        <FormFeedback>{errors.depth}</FormFeedback>
      </FormGroup>
      <FormGroup>
        <Label for="duration">Duration:</Label>
        <Input
          type="number"
          step="0.1"
          value={formData.duration}
          id="duration"
          name="duration"
          onChange={handleChange}
          invalid={!!errors.duration}
        />
        <FormFeedback>{errors.duration}</FormFeedback>
      </FormGroup>
      <FormGroup>
        <Label for="intensity">Intensity:</Label>
        <Input
          type="number"
          value={formData.intensity}
          id="intensity"
          name="intensity"
          onChange={handleChange}
          invalid={!!errors.intensity}
        />
        <FormFeedback>{errors.intensity}</FormFeedback>
      </FormGroup>
      <FormGroup>
        <Label for="fault_line">Fault Line:</Label>
        <Input
          type="text"
          value={formData.fault_line}
          id="fault_line"
          name="fault_line"
          onChange={handleChange}
          invalid={!!errors.fault_line}
        />
        <FormFeedback>{errors.fault_line}</FormFeedback>
      </FormGroup>
      <FormGroup>
        <Label for="after_shock_id">After Shock ID:</Label>
        <Input
          type="number"
          value={formData.after_shock_id}
          id="after_shock_id"
          name="after_shock_id"
          onChange={handleChange}
          invalid={!!errors.after_shock_id}
        />
        <FormFeedback>{errors.after_shock_id}</FormFeedback>
      </FormGroup>
      {errors.submitError && (
        <div className="text-danger">{errors.submitError}</div>
      )}
      <Button type="submit">Add Earthquake</Button>
    </Form>
  );
};

EarthquakeForm.propTypes = {
  onFormSubmit: PropTypes.func.isRequired,
};

export default EarthquakeForm;
