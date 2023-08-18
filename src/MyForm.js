import React, { useState } from "react";
import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup
} from "@mui/material";
import * as yup from "yup";

const validationSchema = yup.object().shape({
  selectedOption: yup.string().required("Please select an option")
});

const MyForm = () => {
  const [selectedOption, setSelectedOption] = useState("");
  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    validationSchema
      .validate({ selectedOption }, { abortEarly: false })
      .then(() => {
        // Validation successful, handle form submission
        console.log("Form submission successful");
      })
      .catch((validationErrors) => {
        const newErrors = {};
        validationErrors.inner.forEach((error) => {
          newErrors[error.path] = error.message;
        });
        setErrors(newErrors);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormControl component="fieldset" error={!!errors.selectedOption}>
        <FormLabel component="legend">Select an option</FormLabel>
        <RadioGroup
          name="selectedOption"
          value={selectedOption}
          onChange={handleChange}
        >
          <FormControlLabel
            value="option1"
            control={<Radio />}
            label="Option 1"
          />
          <FormControlLabel
            value="option2"
            control={<Radio />}
            label="Option 2"
          />
          <FormControlLabel
            value="option3"
            control={<Radio />}
            label="Option 3"
          />
        </RadioGroup>
        {errors.selectedOption && <div>{errors.selectedOption}</div>}
      </FormControl>

      <Button type="submit" variant="contained" color="primary">
        Submit
      </Button>
    </form>
  );
};

export default MyForm;
