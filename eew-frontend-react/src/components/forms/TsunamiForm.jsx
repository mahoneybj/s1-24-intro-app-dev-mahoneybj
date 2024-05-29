/**
 * @file Tsunami info form component.
 * @author Ben Mahoney
 */

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

const TsunamiForm = ({ onFormSubmit }) => {
  const [formData, setFormData] = useState({
    region: "",
    date: "",
    size: "",
    duration: "",
    earthquake_id: "",
  });
  const [errors, setErrors] = useState({
    region: "",
    date: "",
    size: "",
    duration: "",
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
        region: formData.region,
        date: new Date(formData.date).toISOString(),
        size: parseFloat(formData.size),
        duration: parseFloat(formData.duration),
        earthquake_id: parseInt(formData.earthquake_id, 10),
      };

      await earthquakeEarlyWarningSystemInstance.post("/tsunamis", payload);
      setFormData({
        region: "",
        date: "",
        size: "",
        duration: "",
        earthquake_id: "",
      });
      setErrors({
        region: "",
        date: "",
        size: "",
        duration: "",
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
        alert(errorMsg);
      } else {
        console.log(err);
      }
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
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
        <Label for="size">Size:</Label>
        <Input
          type="number"
          step="0.1"
          value={formData.size}
          id="size"
          name="size"
          onChange={handleChange}
          invalid={!!errors.size}
        />
        <FormFeedback>{errors.size}</FormFeedback>
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
      <Button type="submit">Add Tsunami</Button>
    </Form>
  );
};

TsunamiForm.propTypes = {
  onFormSubmit: PropTypes.func.isRequired,
};

export default TsunamiForm;
