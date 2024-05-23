import { useState } from "react";
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await earthquakeEarlyWarningSystemInstance.post("/earthquakes", formData);
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
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="date">Date:</label>
        <input
          type="datetime-local"
          value={formData.date}
          id="date"
          name="date"
          onChange={handleChange}
          invalid={!!errors.date}
        />
        <label htmlFor="magnitude">Magnitude:</label>
        <input
          type="number"
          step="0.1"
          value={formData.magnitude}
          id="magnitude"
          name="magnitude"
          onChange={handleChange}
          invalid={!!errors.magnitude}
        />
        <label htmlFor="depth">Depth:</label>
        <input
          type="number"
          step="0.1"
          value={formData.depth}
          id="depth"
          name="depth"
          onChange={handleChange}
          invalid={!!errors.depth}
        />
        <label htmlFor="duration">Duration:</label>
        <input
          type="number"
          step="0.1"
          value={formData.duration}
          id="duration"
          name="duration"
          onChange={handleChange}
          invalid={!!errors.duration}
        />
        <label htmlFor="intensity">Intensity:</label>
        <input
          type="number"
          value={formData.intensity}
          id="intensity"
          name="intensity"
          onChange={handleChange}
          invalid={!!errors.intensity}
        />
        <label htmlFor="fault_line">Fault Line:</label>
        <input
          type="text"
          value={formData.fault_line}
          id="fault_line"
          name="fault_line"
          onChange={handleChange}
          invalid={!!errors.fault_line}
        />
        <label htmlFor="after_shock_id">After Shock ID:</label>
        <input
          type="number"
          value={formData.after_shock_id}
          id="after_shock_id"
          name="after_shock_id"
          onChange={handleChange}
          invalid={!!errors.after_shock_id}
        />
        {errors.submitError && (
          <div className="text-danger">{errors.submitError}</div>
        )}
        <button type="submit">Add Earthquake</button>
      </form>
      <span>{errors.date}</span>
      <span>{errors.magnitude}</span>
      <span>{errors.depth}</span>
      <span>{errors.duration}</span>
      <span>{errors.intensity}</span>
      <span>{errors.fault_line}</span>
      <span>{errors.after_shock_id}</span>
    </>
  );
};

EarthquakeForm.propTypes = {
  onFormSubmit: PropTypes.func.isRequired,
};

export default EarthquakeForm;
