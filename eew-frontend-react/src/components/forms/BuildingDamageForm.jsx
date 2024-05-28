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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        houses_damaged: parseInt(formData.houses_damaged, 10),
        houses_destroyed: parseInt(formData.houses_destroyed, 10),
        commerical_damaged: parseInt(formData.commerical_damaged, 10),
        commerical_destroyed: parseInt(formData.commerical_destroyed, 10),
        earthquake_id: parseInt(formData.earthquake_id, 10),
        cost: parseFloat(formData.cost),
      };

      await earthquakeEarlyWarningSystemInstance.post("/buildings", payload);
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
