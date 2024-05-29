/**
 * @file Landslide infomation form component.
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

const LandslideForm = ({ onFormSubmit }) => {
  const [formData, setFormData] = useState({
    smallest: "",
    largest: "",
    region: "",
    number: "",
    earthquake_id: "",
  });
  const [errors, setErrors] = useState({
    smallest: "",
    largest: "",
    region: "",
    number: "",
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
        smallest: parseFloat(formData.smallest),
        largest: parseFloat(formData.largest),
        region: formData.region,
        number: parseInt(formData.number, 10),
        earthquake_id: parseInt(formData.earthquake_id, 10),
      };

      await earthquakeEarlyWarningSystemInstance.post("/landslides", payload);
      setFormData({
        smallest: "",
        largest: "",
        region: "",
        number: "",
        earthquake_id: "",
      });
      setErrors({
        smallest: "",
        largest: "",
        region: "",
        number: "",
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
        <Label for="smallest">Smallest Landslide:</Label>
        <Input
          type="number"
          step="0.1"
          value={formData.smallest}
          id="smallest"
          name="smallest"
          onChange={handleChange}
          invalid={!!errors.smallest}
        />
        <FormFeedback>{errors.smallest}</FormFeedback>
      </FormGroup>
      <FormGroup>
        <Label for="largest">Largest Landslide:</Label>
        <Input
          type="number"
          step="0.1"
          value={formData.largest}
          id="largest"
          name="largest"
          onChange={handleChange}
          invalid={!!errors.largest}
        />
        <FormFeedback>{errors.largest}</FormFeedback>
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
        <Label for="number">Number of Landslides:</Label>
        <Input
          type="number"
          value={formData.number}
          id="number"
          name="number"
          onChange={handleChange}
          invalid={!!errors.number}
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
      {errors.submitError && (
        <div className="text-danger">{errors.submitError}</div>
      )}
      <Button type="submit">Add Landslide</Button>
    </Form>
  );
};

LandslideForm.propTypes = {
  onFormSubmit: PropTypes.func.isRequired,
};

export default LandslideForm;
