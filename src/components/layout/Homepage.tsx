import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import {
  Box,
  TextField,
  CardActions,
  CardHeader,
  Card,
  CardContent,
  FormControlLabel,
  Checkbox,
  Button,
  Container,
  CssBaseline,
  Paper,
  ThemeProvider,
  Toolbar,
  Typography,
  createTheme,
  Stack,
  Switch,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import Controls from "../../utility/controls/Controls";
import useForm from "../../utility/controls/useForm";
import { Homemodel } from "../../models/Homemodel";
import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";

const Homepage = (...props: any) => {
  //const { societyBuildingId, societyBuildingUnitId }: any = useParams();
  const [title, setTitle] = useState<any>({});
  const [showCard, setShowCard] = useState(false); // Initially hidden
  //   const { goToHome } = useSharedNavigation();
  // let navigate = useNavigate();
  //const [UnitType, setUnitType] = useState<SelectListModel[]>([]);

  const validate = (fieldValues: Homemodel = values) => {
    let temp: any = { ...errors };
    // if ("Unit" in fieldValues)
    //   temp.Unit = fieldValues.Unit ? "" : "Unit is required.";
    // if ("UnitTypeId" in fieldValues)
    //   temp.UnitTypeId = fieldValues.UnitTypeId ? "" : "UnitType is required.";
    // if ("FloorNo" in fieldValues)
    //   temp.FloorNo = fieldValues.FloorNo >= 0 ? "" : "FloorNo is required.";
    // if ("TerraceArea" in fieldValues)
    //   temp.TerraceArea = fieldValues.TerraceArea ? (temp.TerraceArea = /^[0-9]*(\.[0-9]{0,3})?$/.test(fieldValues.TerraceArea.toString()) ? "" : "") : ""

    setErrors({
      ...temp,
    });

    if (fieldValues === values)
      return Object.values(temp).every((x) => x === "");
  };
  const aadharCardColumns: GridColDef[] = [
    {
      field: "aadharNumber",
      headerName: "Aadhaar Number",
      width: 180,
    },
    {
      field: "fullName",
      headerName: "Full Name",
      width: 200,
    },
    {
      field: "dob",
      headerName: "Date of Birth",
      width: 150,
    },
    {
      field: "gender",
      headerName: "Gender",
      width: 120,
    },
  ];
  const aadharCardRows = [
    {
      id: 1,
      aadharNumber: "1234-5678-9012",
      fullName: "Rajesh Kumar",
      dob: "1990-05-15",
      gender: "Male",
    },
    {
      id: 2,
      aadharNumber: "2345-6789-0123",
      fullName: "Sita Sharma",
      dob: "1985-12-01",
      gender: "Female",
    },
  ];

  const { values, setValues, errors, setErrors, handleInputChange, resetForm } =
    useForm(" ", validate, props.SocietyBuildingUnitId);
  const Yojanalist = [
    { Value: "C", Text: "Yojana1" },
    { Value: "B", Text: "Yojana2" },
    { Value: "S", Text: "Yojana3" },
    { Value: "D", Text: "Yojana4" },
    { Value: "T", Text: "Yojana5" },
    // { Value: "F", Text: "Year End Closing Transaction" },
  ];
  //   const newsocietyBuildingUnits = () => {
  //     setValues(societyBuildingUnitsService.initialFieldValues);
  //   };

  //   function setFormValue(model: SocietyBuildingUnitsModel) {
  //     let newModel = {
  //       SocietyBuildingUnitId: model.SocietyBuildingUnitId,
  //       SocietyBuildingId: model.SocietyBuildingId,
  //       Unit: model.Unit,
  //       UnitTypeId: model.UnitTypeId,

  //     };
  //     return newModel;
  //   }

  useEffect(() => {
    // if (societyBuildingUnitId) {
    //   getSocietyBuildingUnit(societyBuildingUnitId);
    // } else {
    //   newsocietyBuildingUnits();
    //   setErrors({});
    // }
  }, []);

  return (
    <>
      <>
        {/* /<Stack direction="row" spacing={0} justifyContent="space-between">
        <Typography variant="h5" align="center">
          Building Units
        </Typography>
        <Typography variant="body1"><b>Building : </b>{title.Building} </Typography>
      </Stack> */}

        <form autoComplete="off" noValidate>
          <Card>
            {/* <CardHeader title="Building Unit" /> */}
            <CardContent>
              <React.Fragment>
                <Grid container spacing={5}>
                  <Grid size={4}>
                    <Controls.Select
                      name="All Yojana List"
                      label="All Yojana List"
                      value={Yojanalist.length > 0 ? values.Nature : ""}
                      onChange={handleInputChange}
                      options={Yojanalist}
                      error={errors.Yojanalist}
                    />
                  </Grid>

                  <Grid size={4}>
                    <Controls.Input
                      required
                      label="Financial Year"
                      name="Financial"
                      //  value={values.Unit}
                      onChange={handleInputChange}
                      error={errors.Financial}
                    />
                  </Grid>

                  <Grid size={4}>
                    <Controls.Input
                      required
                      label="Shop No"
                      name="ShopNo"
                      type="number"
                      value={values.ShopNo || 55}
                      onChange={handleInputChange}
                      error={errors.ShopNo}
                    />
                  </Grid>

                  {/* <Grid size={4}>
                  <Controls.Input
                    label="Wing"
                    name="Wing"
                    value={values.Wing}
                    onChange={handleInputChange}
                    error={errors.Wing}
                  />
                </Grid>

                <Grid size={4}>
                  <Controls.Input
                    label="CarpetArea"
                    name="CarpetArea"
                    type="number"
                    value={values.CarpetArea}
                    onChange={handleInputChange}
                    error={errors.CarpetArea}
                  />
                </Grid>

                <Grid size={4}>
                  <Controls.Input
                    label="ChargeableArea"
                    name="ChargeableArea"
                    type="number"
                    value={values.ChargeableArea}
                    onChange={handleInputChange}
                    error={errors.ChargeableArea}
                  />
                </Grid>

                <Grid size={4}>
                  <Controls.Input
                    label="TerraceArea"
                    name="TerraceArea"
                    type="number"
                    value={values.TerraceArea}
                    onChange={handleInputChange}
                    error={errors.TerraceArea}
                  />
                </Grid>
                <Grid size={4}>
                  <Controls.ReactDatePicker
                    label="StartDate"
                    name="StartDate"
                    value={values.StartDate}
                    //onChange={(date: Date) => handleInputChange({ target: { value: globalService.convertLocalToUTCDate(date), name: 'StartDate' } })}
                    error={errors.StartDate}
                  />
                </Grid>
                <Grid size={4}>
                  <Controls.ReactDatePicker
                    label="EndDate"
                    name="EndDate"
                    value={values.EndDate}
                    //  onChange={(date: Date) => handleInputChange({ target: { value: globalService.convertLocalToUTCDate(date), name: 'EndDate' } })}
                    error={errors.EndDate}
                  />
                </Grid> */}
                </Grid>
              </React.Fragment>
            </CardContent>
          </Card>

          {/* <Card>
          <CardHeader title="Share Certificate Details" />
          <CardContent>
            <React.Fragment>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={4}>
                  <Controls.Input
                    label="CertificateNo"
                    type="number"
                    name="CertificateNo"
                    value={values.CertificateNo}
                    onChange={handleInputChange}
                    error={errors.CertificateNo}
                  />
                </Grid>

                <Grid item xs={12} sm={4}>
                  <Controls.Input
                    label="NoOfShares"
                    type="number"
                    name="NoOfShares"
                    value={values.NoOfShares}
                    onChange={handleInputChange}
                    error={errors.NoOfShares}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Controls.Input
                    label="DistinctiveFrom"
                    name="DistinctiveFrom"
                    type="number"
                    value={values.DistinctiveFrom}
                    onChange={handleInputChange}
                    error={errors.DistinctiveFrom}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Controls.Input
                    label="DistinctiveTo"
                    name="DistinctiveTo"
                    type="number"
                    value={values.DistinctiveTo}
                    onChange={handleInputChange}
                    error={errors.DistinctiveTo}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Controls.Input
                    label="Value"
                    name="Value"
                    type="number"
                    value={values.Value}
                    onChange={handleInputChange}
                    error={errors.Value}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Controls.Input
                    label="AmountAtAllotment"
                    name="AmountAtAllotment"
                    type="number"
                    value={values.AmountAtAllotment}
                    onChange={handleInputChange}
                    error={errors.AmountAtAllotment}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Controls.ReactDatePicker
                    label="PayDate"
                    name="PayDate"
                    value={values.PayDate}
                    onChange={(date: Date) => handleInputChange({ target: { value: globalService.convertLocalToUTCDate(date), name: 'PayDate' } })}
                    error={errors.PayDate}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Controls.ReactDatePicker
                    fullWidth
                    label="IssueDate"
                    name="IssueDate"
                    value={values.IssueDate}
                    onChange={(date: Date) => handleInputChange({ target: { value: globalService.convertLocalToUTCDate(date), name: 'IssueDate' } })}
                    error={errors.IssueDate}
                  />
                </Grid>

              </Grid>
            </React.Fragment>
          </CardContent>
        </Card> */}

          <CardActions sx={{ display: "flex", justifyContent: "center" }}>
            <Stack spacing={2} direction="row">
              {!showCard && (
                <Button
                  type="submit"
                  variant="contained"
                  onClick={() => setShowCard(true)}
                >
                  NEXT PAGE
                </Button>
              )}
            </Stack>
          </CardActions>
        </form>
      </>
      <>
      {showCard && (
  <Card>
    <CardHeader title="Building Unit" />
    <CardContent>
      <Grid container spacing={5}>
        <Grid size={4}>
          <Controls.Input
            label="Name"
            name="Name"
            value={values.Name || "Ashutosh"}
            onChange={handleInputChange}
            error={errors.Name}
          />
        </Grid>
        <Grid size={4}>
          <Controls.Input
            label="Village"
            name="Village"
            value={values.Village || "Basti"}
            onChange={handleInputChange}
            error={errors.Village}
          />
        </Grid>
        <Grid size={4}>
          <Controls.Input
            label="Mobile No."
            name="Village"
            value={values.Village || "9168535464"}
            onChange={handleInputChange}
            error={errors.Village}
          />
        </Grid>
      </Grid>

      <div style={{ marginTop: 24 ,width: '50%' }}>
        <DataGrid
          rows={aadharCardRows}
          columns={aadharCardColumns}
          autoHeight
          columnHeaderHeight={30}
          initialState={{
            pagination: { paginationModel: { pageSize: 10 } },
          }}
          slots={{ toolbar: GridToolbar }}
          slotProps={{
            toolbar: {
              showQuickFilter: true,
              quickFilterProps: { debounceMs: 500 },
            },
          }}
          pageSizeOptions={[10, 25, 50, 100]}
        />
      </div>
    </CardContent>
  </Card>
)}

      </>
    </>
  );
};

export default Homepage;
