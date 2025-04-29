import React, { useEffect } from "react";
import { Grid, TextField, CardActions, Card, CardContent, Button, Typography, Stack } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import useForm from "../../utility/controls/useForm";
import { ProductDetailsService } from "../../Services/ProductDetailsService";
import { ProductDetailsModel } from "../../models/ProductDetailsModel";
import { globalService } from "../../Services/GlobalService";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const ProductEditForm = (...props: any) => {

  const productId = props[0].productId
  
  let navigate = useNavigate();

  const validate = (fieldValues = values) => {
    let temp: any = { ...errors };

    setErrors({
      ...temp,
    });



    if (fieldValues === values)
      return Object.values(temp).every((x) => x === "");
  };

  const { values, setValues, errors, setErrors, handleInputChange, resetForm } =
    useForm(ProductDetailsService.initialFieldValues, validate, props.setCurrentId);

  const newUser = () => {
    setValues(ProductDetailsService.initialFieldValues);
  };
  //This is used since in get the null property is not returned
  function setFormValue(model: ProductDetailsModel) {
    let newModel = {
      productId: model.productId,
      description: model.description,
      productName: model.productName,
      rate: model.rate,
      quantity: model.quantity,
   
  
    }
    return newModel;
  }

  useEffect(() => {
    if (productId) {
      getpayment(productId);
      setErrors({});
    } else newUser();
  }, [productId]);

  const getpayment = (productId: any) => {
    ProductDetailsService.getById(productId).then((response) => {
      if (response) {

        let result = response.data;
        setValues(setFormValue(result.data));
      }
    })
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {

      if (productId) {
        ProductDetailsService.put(values).then((response: any) => {
          let result = response.data;
          if (response) {
            globalService.success(result.message);
            if (props[0].callFrom === "meeting") {
              props[0].onCloseDialog();
              props[0].refreshproduct();}
          } else {
            globalService.error(result.message);
          }
        });
      }
    
    }
  };

  return (
    <>
      <Typography variant="h5" align="center">
        Edit Product
      </Typography>
      <form
        autoComplete="off"
        noValidate
        onSubmit={handleSubmit}
      >
        <Card>
          <CardContent>
            <React.Fragment>
              <Grid container spacing={3}>
                <Grid size={4}>
                  <TextField
                    required
                    label="Product Name"
                   disabled
                    variant="standard"
                    name="productName"
                    value={values.productName}
                    onChange={handleInputChange}

                  />
                </Grid>
                <Grid size={4}>
                  <TextField
                    required
                    label="Description"
                   disabled
                    variant="standard"
                    name="description"
                    value={values.description}
                    onChange={handleInputChange}

                  />
                </Grid>
               
                <Grid size={4}>
                  <TextField
                    required
                    disabled
                    label="Quantity"
                    variant="standard"
                    name="quantity"
                    value={values.quantity}
                    onChange={handleInputChange}

                  />
                </Grid>
                <Grid size={4}>
                  <TextField
                    required
                  
                    label="Rate"
                    variant="standard"
                    name="rate"
                    value={values.rate}
                    onChange={handleInputChange}

                  />
                </Grid>
                
               
              </Grid>
            </React.Fragment>
          </CardContent>
          <CardActions sx={{ display: 'flex', justifyContent: 'center' }}>
            <Stack spacing={2} direction="row">
              <Button type="submit" variant="contained" >Submit</Button>
             
            </Stack>

          </CardActions>
        </Card>
      </form>
    </>
  );
};

export default ProductEditForm;