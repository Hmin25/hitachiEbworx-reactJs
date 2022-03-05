import './App.css';
import {
  MenuItem,
  Select,
  Button,
  TextField,
  InputLabel,
  FormControl,
  Box
} from "@material-ui/core";
import * as yup from "yup";
import { useFormik } from 'formik';
import { useState, useEffect } from 'react';
import Axios from 'axios';
import './Css/form.css'

function App() {

  const [result, setResult] = useState(false);
  const [celciusValue, setCelciusValue] = useState("");
  const [fahrenheitValue, setFahrenheitValue] = useState("");

  async function getResult() {
    await Axios.get(
      `http://api.weatherapi.com/v1/current.json?key=${formik.values.apiKey}&q=${formik.values.cityName}  `
    )
      .catch((err) => {
        console.log(err);
      })
      .then((res) => {
        // console.log(res.data)
        setCelciusValue(res.data.current.temp_c);
        setFahrenheitValue(res.data.current.temp_f);
      });
  }

  const validationSchema = yup.object({
    apiKey: yup
      .string('Please enter your API key')
      .min(30)
      .required(),
    cityName: yup
      .string('Select a city name')
      .oneOf(['Kuala Lumpur', 'Singapore'])
      .required(),
  });

  const formik = useFormik({
    initialValues: {
      apiKey: 'ff9f895b2e884d6680530135202710',
      cityName: '',
      celciusValue: '',
      fahrenheitValue: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      getResult();
      setResult(true);
    },
  });

  return (
    <div>
      {result === false
        ?
        <>
          <div id="displayFormCon">
            <form onSubmit={formik.handleSubmit} id="form">
              <TextField
                fullWidth
                id="apiKey"
                name="apiKey"
                label="Your API Key"
                value={formik.values.apiKey}
                onChange={formik.handleChange}
                style={{ marginBottom: "4%" }}
              />
              <FormControl fullWidth>
                <InputLabel id="cityNameLabel">City Name</InputLabel>
                <Select
                  fullWidth
                  labelId="cityNameLabel"
                  variant="standard"
                  id="cityName"
                  name="cityName"
                  value={formik.values.cityName}
                  onChange={formik.handleChange}
                  margin="dense"
                >
                  <MenuItem value="Kuala Lumpur">Kuala Lumpur</MenuItem>
                  <MenuItem value="Singapore">Singapore</MenuItem>
                </Select>
              </FormControl>
              {formik.values.apiKey && formik.values.cityName
                ?
                <Button style={{ backgroundColor: '#f00056', color: "white", marginTop: '4%' }} variant="contained" fullWidth type="submit">
                  Submit
                </Button>
                : <Button disabled style={{ backgroundColor: '#f00056', color: "white", opacity: '50%', marginTop: '4%' }} variant="contained" fullWidth type="submit">
                  Submit
                </Button>
              }
            </form>
          </div>
        </>
        :
        <Box id="displayResultCon">
          <Box id="result">
            <TextField
              fullWidth
              disabled
              id="celcius"
              label="Celcius"
              value={celciusValue}
              style={{ marginBottom: "4%" }}
            />
            <TextField
              fullWidth
              disabled
              id="fahrenheit"
              label="Fahrenheit"
              value={fahrenheitValue}
              style={{ marginBottom: "4%" }}
            />
          </Box>
        </Box>}
    </div>
  );
}

export default App;
