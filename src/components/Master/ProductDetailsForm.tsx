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
import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import { LoginService } from "../../Services/LoginService";

const ProductDetailsForm = (...props: any) => {
  const [products, setProduct] = useState<[]>([]);
    useEffect(() => {
      
        getAllProducts();
      
    }, []);

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
      <Typography
        variant="h6"
        gutterBottom
        fontWeight="bold"
        color="primary"
        sx={{ borderBottom: "2px solid #1976d2", paddingBottom: 1 }}
      >
        Payment Details
      </Typography>
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
  </Card>
  )
}

export default ProductDetailsForm