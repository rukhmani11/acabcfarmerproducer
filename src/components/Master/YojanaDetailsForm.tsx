import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../layout/Navbar";
import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardActions,
  Grid,
  TextField,

  MenuItem,
  InputLabel,
  FormControl,
  Button,
  Stack,
  Typography,
  Box,
  Container,
} from "@mui/material";
import Controls from "../../utility/controls/Controls";
import useForm from "../../utility/controls/useForm";
import { YojanaDetailsService } from "../../Services/YojanaDetailsService";
import { SelectListModel } from "../../models/ApiResponse";
import { globalService } from "../../Services/GlobalService";

function YojanaDetailsForm() {
  // const [YojanaDetailsList, setYojanaDetailsList] = useState<SelectListModel[]>(
  //   []
  // );
  let navigate = useNavigate();

  const validate = (fieldValues = values) => {
    let temp: any = { ...errors };
    setErrors({ ...temp });

    if (fieldValues === values)
      return Object.values(temp).every((x) => x === "");
  };

  let showNavBar = true;
  const YojanaDetailsList = [
    { Value: "C", Text: "Cash" },
    { Value: "B", Text: "Bank" },
    { Value: "S", Text: "Creditor" },
    { Value: "D", Text: "Debtor" },
    { Value: "T", Text: "TDS" },
    { Value: "F", Text: "Year End Closing Transaction" },
  ];
  const { values, setValues, errors, setErrors, handleInputChange, resetForm } =
    useForm(YojanaDetailsService.initialFieldValues, validate, "");

  const newPaymmentTerms = () => {
    setValues(YojanaDetailsService.initialFieldValues);
  };

  useEffect(() => {
    // if (YojanaDetailsList.length === 0) getYojanaDetailsList();
  }, []);
 
  // const getYojanaDetailsList = () => {
  //   YojanaDetailsService.getYojanaDetailsListSelectList().then((response) => {
  //     setYojanaDetailsList(response.data);
  //   });
  // };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      // Navigate to another form/component via route
      navigate(`/shopDetails/${values.shopNumber}`);
    }
  };
  return (
    <>
      {/* {showNavBar && <Navbar />} */}
      <Box sx={{ backgroundColor: "#f5f5f5", minHeight: "100vh", py: 4 }}>
        <Container maxWidth="md">
          {/* Header */}
          <Box sx={{ textAlign: "center", mb: 4 }}>
            <Typography variant="h4" color="error" fontWeight="bold">
              ACABC FARMER PRODUCER
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              COMPANY LIMITED
            </Typography>
          </Box>
          <form
        autoComplete="off"
        noValidate
        onSubmit={handleSubmit}
      >
          {/* Card */}
          <Card>
            <CardContent>
              <React.Fragment>
              <Typography
                      variant="body1"
                      align="center"
                      sx={{ mt: 2, mb: 3 }}
                    >
                      Please select the Yojana,  financial year
                      and fill the shop number
                    </Typography>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={14}>
                    <Controls.Select
                      required
                      // showEmptyItem={false}
                      name="yojanaName"
                      label="yojanaName"
                      options={YojanaDetailsList}
                      value={
                        YojanaDetailsList.length > 0 ? values.yojanaName : ""
                      }
                      onChange={(e: any) => {
                        handleInputChange(e);
                      }}
                      // error={errors.yojanaName}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Controls.ReactDatePicker
                      label="Date Of Leaving"
                      min={values.financialYear}
                      max={new Date()}
                      value={values.financialYear}
                      onChange={(date: any) => {
                        handleInputChange({
                          target: {
                            value:
                              globalService.getISODateOnlyForDatePicker(date),
                            name: "financialYear",
                          },
                        });
                      }}
                    />
                  </Grid>

                  <Grid item xs={12} sm={4}>
                    <Controls.Input
                      required
                      label="shopNumber"
                      name="shopNumber"
                      value={values.shopNumber}
                      onChange={handleInputChange}
                      error={errors.shopNumber}
                    />
                  </Grid>
                </Grid>
              </React.Fragment>
            </CardContent>

            <CardActions sx={{ justifyContent: "center", mb: 2 }}>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#f44336",
                  color: "#fff",
                  px: 4,
                  py: 1,
                  borderRadius: "20px",
                }}
              >
                Submit
              </Button>
            </CardActions>
          </Card>
          </form>

          {/* Footer */}
          {/* <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Typography variant="body2">खाद्य एवं रसद विभाग, उत्तर प्रदेश सरकार</Typography>
        </Box> */}
        </Container>
      </Box>
    </>
  );
}

export default YojanaDetailsForm;
