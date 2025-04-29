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
  useTheme,
  IconButton,
  Dialog,
  DialogContent,
  DialogProps,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import { LoginService } from "../../Services/LoginService";
import { useNavigate } from "react-router-dom";

const ProductDetailsForm = (...props: any) => {
  const [products, setProduct] = useState<[]>([]);
    useEffect(() => {
      
        getAllProducts();
      
    }, []);
    let navigate = useNavigate();
     const getAllProducts = () => {
        LoginService.getAll().then((response) => {
          let result = response.data;
          setProduct(result.list);
        });
      };
  const columns: GridColDef[] = [
      { field: "paymentamount", headerName: "Payment Amount", flex: 1 },
      { field: "description", headerName: "Description", flex: 1 },
      { field: "personname", headerName: "Person Name", flex: 1 },
     
      
    ];
  return (
    <Card sx={{ boxShadow: 3, mx: "auto", width: "80%" }}>
    <CardContent>
    <Box
  display="flex"
  justifyContent="space-between"
  alignItems="center"
  sx={{ borderBottom: "2px solid #1976d2", paddingBottom: 1, mb: 2 }}
>
  <Typography variant="h6" fontWeight="bold" color="primary">
    Payment Details
  </Typography>
  <Button type="submit" variant="contained" onClick={() =>
               navigate("/productList" ) }>
    Edit Product Details
  </Button>
</Box>
       
      <Box sx={{ width: "100%" }}>
        <DataGrid
          getRowId={(row) => row.PaymentId}
          rows={products}
          columns={columns}
          slots={{ toolbar: GridToolbar }}
          slotProps={{
            toolbar: {
              showQuickFilter: true,
              quickFilterProps: { debounceMs: 500 },
            },
          }}
          pageSizeOptions={[10, 25, 50, 100]}
        />
      </Box>
    </CardContent>
    <CardActions sx={{ display: 'flex', justifyContent: 'center' }}>
      <Button
        variant="contained"
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate(-1)}
      >
        Back To List
      </Button></CardActions>
  </Card>
  
  )
}

export default ProductDetailsForm