import { Outlet, useLocation, useNavigate } from "react-router-dom";
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
import { ShopDetailsService } from "../../Services/ShopDetailsService";
import DatePicker from "react-datepicker";

function YojanaDetailsForm() {
  // const [YojanaDetailsList, setYojanaDetailsList] = useState<SelectListModel[]>(
  //   []
  // );
  const currentYear = new Date().getFullYear();
  const nextYear = currentYear + 1;

  const [Shopdetail, setShopdetail] = useState(
    ShopDetailsService.initialFieldValues
  );
  let navigate = useNavigate();

  const validate = (fieldValues = values) => {
    let temp: any = { ...errors };
    setErrors({ ...temp });

    if (fieldValues === values)
      return Object.values(temp).every((x) => x === "");
  };

  let showNavBar = true;
  const YojanaDetailsList = [
    { value: "C", label: "NFSA(Wheat&Rice)" },
    { value: "B", label: "ICDS" },
    { value: "S", label: "MDM" },
    { value: "D", label: "NFSA(Sugar)" },
  ];
  const { values, setValues, errors, setErrors, handleInputChange, resetForm } =
    useForm(YojanaDetailsService.initialFieldValues, validate, "");

  const newPaymmentTerms = () => {
    setValues(YojanaDetailsService.initialFieldValues);
  };
  const getSms = () => {
    ShopDetailsService.getShopdetailsByshopNo(parseInt(values.shopNumber, 10))
      .then((response) => {
        const result = response.data;

        if (result.isSuccess) {
          setShopdetail(result.data);
          globalService.success(result.message);
          navigate(`/shopDetails/${values.shopNumber}`);
        } else {
          globalService.error(result.message);
          navigate("/"); // optional fallback
        }
      })
      .catch((error) => {
        globalService.error("No Record Found Please Connect to Admin.");
        console.error("API Error:", error);
        navigate("/"); // optional fallback
      });
  };

  useEffect(() => {
    //  if (YojanaDetailsList.length === 0) getYojanaDetailsList();
  }, []);

  // const getYojanaDetailsList = () => {
  //   YojanaDetailsService.getYojanaDetailsListSelectList().then((response) => {
  //     setYojanaDetailsList(response.data);
  //   });
  // };
  // // const handleSubmit = (e: React.FormEvent) => {
  //
  //   e.preventDefault();
  //   if (validate()) {
  //
  //     navigate("/shopDetails/" + values.shopNumber);

  //   }
  // };

  const handleInputChange1 = (date: any) => {
    // No destructuring here, directly set the value
    setValues({
      ...values,
      financialYear: date,
    });
  };
  return (
    <>
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
          <CardActions sx={{ display: "flex", justifyContent: "right" }}>
            <Stack spacing={2} direction="row" alignItems="center">
              <Box
                sx={{
                  cursor: "pointer",
                  color: "text.primary",
                  "&:hover": {
                    color: "primary.main", // changes color on hover
                    textDecoration: "underline", // optional: underline on hover
                  },
                }}
                onClick={() => navigate("/login")}
              >
                {/* //  Go to Shop {values.shopNumber} */}
                Admin Login
              </Box>
            </Stack>
          </CardActions>

          {/* <form
          autoComplete="off"
          noValidate
          onSubmit={handleSubmit}
        > */}
          {/* Card */}
          <Card>
            <CardContent>
              <React.Fragment>
                <Typography
                  variant="body1"
                  align="center"
                  sx={{ mt: 2, mb: 3 }}
                >
                  Please select the Yojana, financial year and fill the shop
                  number
                </Typography>
                <Grid container spacing={3}>
                  <Grid size={4}>
                    <Controls.Select
                      required
                      // showEmptyItem={false}
                      name="yojanaName"
                      label="Yojana Name"
                      options={YojanaDetailsList}
                      value={
                        YojanaDetailsList.length > 0 ? values.yojanaName : ""
                      }
                      onChange={(e: any) => {
                        handleInputChange(e);
                      }}
                      error={errors.yojanaName}
                    />
                  </Grid>
                  <Grid size={4}>
                    <Controls.ReactDatePicker
                      selected={values.financialYear}
                      onChange={handleInputChange1}
                      showYearPicker
                      dateFormat="yyyy"
                      label="Financial Year"
                      minDate={new Date(currentYear, 0, 1)} // Setting the minimum date to the current year
                      maxDate={new Date(nextYear, 0, 1)} // Setting the maximum date to the next year
                      yearItemNumber={2}
                      placeholderText="Select Year"
                    />
                  </Grid>

                  <Grid size={4}>
                    <Controls.ReactDatePicker
                      label="Financial Month"
                      value={values.financialMonth}
                      onChange={(date: any) => {
                        handleInputChange({
                          target: {
                            value:
                              globalService.getISODateOnlyForDatePicker(date),
                            name: "financialMonth",
                          },
                        });
                      }}
                      error={errors.financialMonth}
                      showMonthYearPicker // <-- Important for month + year selection
                      dateFormat="MMM"
                    />
                  </Grid>

                  <Grid size={4}>
                    <Controls.Input
                      required
                      label="Shop No"
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
                disabled={
                  !values.shopNumber || !values.yojanaName || !values.financialYear}
                onClick={getSms} // 🔥 Call the method here
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
          {/* </form> */}

          {/* Footer */}
          {/* <Box sx={{ textAlign: 'center', mt: 4 }}>
            <Typography variant="body2">खाद्य एवं रसद विभाग, उत्तर प्रदेश सरकार</Typography>
          </Box> */}
        </Container>
      </Box>
      <Outlet />
    </>
  );
}

export default YojanaDetailsForm;
