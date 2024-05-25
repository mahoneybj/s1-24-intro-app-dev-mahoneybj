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

const EarthquakeEarlyWarningInfoForm = ({ onFormSubmit }) => {
  const [formData, setFormData] = useState({
    alert_triggered: "",
    date: "",
    region: "",
    duration: "",
    accuracy: "",
    earthquake_id: "",
  });
  const [errors, setErrors] = useState({
    alert_triggered: "",
    date: "",
    region: "",
    duration: "",
    accuracy: "",
    earthquake_id: "",
    submitError: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    try {
      const payload = {
        alert_triggered: formData.alert_triggered,
        date: new Date(formData.date).toISOString(),
        region: formData.region,
        duration: parseFloat(formData.duration),
        accuracy: parseFloat(formData.accuracy),
        earthquake_id: parseInt(formData.earthquake_id, 10),
      };

      await earthquakeEarlyWarningSystemInstance.post("/eewinfo", payload);
      setFormData({
        alert_triggered: "",
        date: "",
        region: "",
        duration: "",
        accuracy: "",
        earthquake_id: "",
      });
      setErrors({
        alert_triggered: "",
        date: "",
        region: "",
        duration: "",
        accuracy: "",
        earthquake_id: "",
        submitError: "",
      });
      onFormSubmit(); 
    } catch (err) {
      
      if (err.response && err.response.data && err.response.data.msg) {
        const errorMsg = err.response.data.msg; 
        const field = errorMsg.split(" ")[0]; 
        setErrors((prevErrors) => ({
          ...prevErrors, 
          [field]: errorMsg, 
        }));
      } else {
        console.log(err);
      }
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <Label for="alert_triggered">Alert Triggered:</Label>
        <Input
          type="text"
          value={formData.alert_triggered}
          id="alert_triggered"
          name="alert_triggered"
          onChange={handleChange}
          invalid={!!errors.alert_triggered}
        />
        <FormFeedback>{errors.alert_triggered}</FormFeedback>
      </FormGroup>
      <FormGroup>
        <Label for="date">Date:</Label>
        <Input
          type="date"
          value={formData.date}
          id="date"
          name="date"
          onChange={handleChange}
          invalid={!!errors.date}
        />
        <FormFeedback>{errors.date}</FormFeedback>
      </FormGroup>
      <FormGroup>
        <Label for="region">Region:</Label>
        <Input
          type="text"
          value={formData.region}
          id="region"
          name="region"
          onChange={handleChange}
          invalid={!!errors.region}
        />
        <FormFeedback>{errors.region}</FormFeedback>
      </FormGroup>
      <FormGroup>
        <Label for="duration">Duration (seconds):</Label>
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
        <Label for="accuracy">Accuracy (%):</Label>
        <Input
          type="number"
          step="0.1"
          value={formData.accuracy}
          id="accuracy"
          name="accuracy"
          onChange={handleChange}
          invalid={!!errors.accuracy}
        />
        <FormFeedback>{errors.accuracy}</FormFeedback>
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
      {errors.submitError && (
        <div className="text-danger">{errors.submitError}</div>
      )}
      <Button type="submit">Submit</Button>
    </Form>
  );
};

EarthquakeEarlyWarningInfoForm.propTypes = {
  onFormSubmit: PropTypes.func.isRequired,
};

export default EarthquakeEarlyWarningInfoForm;