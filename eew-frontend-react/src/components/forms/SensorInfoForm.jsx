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

const SensorInfoForm = ({ onFormSubmit }) => {
  const [formData, setFormData] = useState({
    location: "",
    region: "",
    sensor_type: "",
    activate: "",
    earthquake_id: "",
  });
  const [errors, setErrors] = useState({
    location: "",
    region: "",
    sensor_type: "",
    activate: "",
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
        location: formData.houses_damaged,
        region: formData.houses_destroyed,
        sensor_type: formData.commerical_damaged, // ENUM!!!
        activate: formData.commerical_destroyed, // BOOLEAN!!!!
        earthquake_id: parseInt(formData.earthquake_id, 10),
      };

      await earthquakeEarlyWarningSystemInstance.post("/sensorinfo", payload);
      setFormData({
        location: "",
        region: "",
        sensor_type: "",
        activate: "",
        earthquake_id: "",
      });
      setErrors({
        location: "",
        region: "",
        sensor_type: "",
        activate: "",
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
        <Label for="location">Sensor Location:</Label>
        <Input
          type="text"
          value={formData.location}
          id="location"
          name="location"
          onChange={handleChange}
          invalid={!!errors.location}
        />
        <FormFeedback>{errors.location}</FormFeedback>
      </FormGroup>
      <FormGroup>
        <Label for="region">Sensor Region:</Label>
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
        <Label for="sensor_type">Sensor Type:</Label>
        
        <Input
          type="select"
          value={formData.sensor_type}
          id="sensor_type"
          name="sensor_type"
          onChange={handleChange}
          invalid={!!errors.sensor_type}
        >
          <option value="">Select Sensor Type</option>
          <option value="ACCELEROMETER">Accelerometer</option>
          <option value="GEOPHONE">Geophone</option>
          <option value="OTHER">Other</option>
        </Input>
        <FormFeedback>{errors.sensor_type}</FormFeedback>
      </FormGroup>
      <FormGroup>
        <Label for="commerical_destroyed">Sensor Active?:</Label>
        <Input
          type="number" //Change to work with booleans
          value={formData.activate}
          id="activate"
          name="activate"
          onChange={handleChange}
          invalid={!!errors.activate}
        />
        <FormFeedback>{errors.activate}</FormFeedback>
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
      <Button type="submit">Add Sensor Info</Button>
    </Form>
  );
};

SensorInfoForm.propTypes = {
  onFormSubmit: PropTypes.func.isRequired,
};

export default SensorInfoForm;
