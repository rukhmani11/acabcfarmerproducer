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
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit"; // Import the EditIcon
import { ShopDetailsService } from "../../Services/ShopDetailsService";
import { useNavigate, useParams } from "react-router-dom";
import {
  DataGrid,
  GridCellEditStopParams,
  GridColDef,
  GridRowSelectionModel,
  GridToolbar,
} from "@mui/x-data-grid";
import { ProductDetailsService } from "../../Services/ProductDetailsService";
import Navbar from "../layout/Navbar";
import { ProductDetailsModel } from "../../models/ProductDetailsModel";
import { globalService } from "../../Services/GlobalService";
import ProductEditForm from "./ProductEditForm";
import { PaymentDetailsService } from "../../Services/PaymentDetailService";
import useForm from "../../utility/controls/useForm";

const ProductList = (...props: any) => {
  const [maxWidth, setMaxWidth] = React.useState<DialogProps["maxWidth"]>("md");
  const [productall, setProduct] = useState([]);
  const [productId, setProductId] = useState<any>(null);
  const [open, setOpen] = React.useState(false);

  let navigate = useNavigate();

  const handleOpen = (productId: any) => {
    setProductId(productId);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);

    //getclientEmployeeMultiple();
  };
  useEffect(() => {
    getAllProducts();
  }, []);

  const refreshproduct = () => {
    getAllProducts();
  };
  const getAllProducts = () => {
    ProductDetailsService.getAll().then((response) => {
      let result = response.data;
      setProduct(result.list);
    });
  };
  const columns: GridColDef[] = [
    { field: "productName", headerName: "Product Name", flex: 1 },
    { field: "description", headerName: "Description", flex: 1 },
    {
      field: "quantity",
      headerName: "Quantity",
      flex: 1,
      type: "number",
    },
    {
      field: "rate",
      headerName: "Rate",
      flex: 1,
      type: "number",
    },
    {
      field: "Actions",
      headerName: "Actions",
      flex: 1,
      renderCell: (params) => (
        <Stack direction="row" spacing={0}>
          <IconButton
            size="small"
            color="primary"
            onClick={() => handleOpen(params.row.productId)}
          >
            <EditIcon fontSize="inherit" />
          </IconButton>
        </Stack>
      ),
    },
  ];
  return (
    <div>
      <Card sx={{ boxShadow: 3, mx: "auto", width: "80%" }}>
        <CardContent>
          <Typography
            variant="h6"
            gutterBottom
            fontWeight="bold"
            color="primary"
            sx={{ borderBottom: "2px solid #1976d2", paddingBottom: 1 }}
          >
            Product Details
          </Typography>
          <Box sx={{ width: "100%" }}>
            <DataGrid
              getRowId={(row) => row.productId}
              rows={productall}
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
      <CardActions sx={{ display: 'flex', justifyContent: 'center' }}>
      <Button
        variant="contained"
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate(-1)}
      >
        Back To List
      </Button></CardActions>
      <Dialog
        fullWidth={true}
        maxWidth={maxWidth}
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme: any) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <Box>
            <ProductEditForm
              callFrom={"meeting"}
              productId={productId}
              onCloseDialog={handleClose}
              refreshproduct={refreshproduct}
            />
          </Box>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProductList;
