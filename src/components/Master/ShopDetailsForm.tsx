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
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit"; // Import the EditIcon
import { ShopDetailsService } from "../../Services/ShopDetailsService";
import { useNavigate, useParams } from "react-router-dom";
import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import { ProductDetailsService } from "../../Services/ProductDetailsService";
import Navbar from "../layout/Navbar";
import { ProductDetailsModel } from "../../models/ProductDetailsModel";
import { globalService } from "../../Services/GlobalService";
import ProductEditForm from "./ProductEditForm";

const ShopDetailsForm = (...props: any) => {
  const [Shopdetail, setShopdetail] = useState(
    ShopDetailsService.initialFieldValues
  );
  const [products, setProducts] = useState<ProductDetailsModel[]>([]);
  const [maxWidth, setMaxWidth] = React.useState<DialogProps["maxWidth"]>("md");

  const [editedRowIds, setEditedRowIds] = useState<Set<String>>(new Set());

  const theme = useTheme();
  const { shopNo } = useParams();
  const [productall, setProduct] = useState([]);
  const navigate = useNavigate();
  const [productId, setProductId] = useState<any>(null);
  const [open, setOpen] = React.useState(false);
  useEffect(() => {
    if (shopNo) {
      getSms();
    }
  }, [shopNo]);
  const handleOpen = (productId : any) => {
    debugger
    setProductId(productId);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);

    //getclientEmployeeMultiple();
  };

  const getSms = () => {
    ShopDetailsService.getShopdetailsByshopNo(
      parseInt(shopNo as string, 10)
    ).then((response) => {
      const result = response.data;
      debugger;

      if (result.isSuccess) {
        setShopdetail(result.data);
        globalService.success(result.message);
        getAllProducts();
      } else {
        globalService.error(result.message);
        navigate("/"); // Redirect if shop is not found
      }
    });
  };
  const getAllProducts = () => {
    ProductDetailsService.getAll().then((response) => {
      let result = response.data;
      setProduct(result.list);
    });
  };
  const refreshproduct = () => {
    getAllProducts();
  };
  const columns: GridColDef[] = [
    { field: "productName", headerName: "Product Name", flex: 1 },
    { field: "description", headerName: "Description", flex: 1 },
    {
      field: "quantity",
      headerName: "Quantity",
      flex: 1,
    },
    {
      field: "Actions",
      headerName: "Actions",
     
      flex: 1,
      renderCell: (params) => {
        return (
          <Stack direction="row" spacing={0}>
            <IconButton
              size="small"
              color="primary"
              aria-label="add an alarm"
              onClick={() => handleOpen(params.row.productId)}
            >
              <EditIcon fontSize="inherit" />
            </IconButton>
          </Stack>
        );
      },
    },
  ];
  // https://mui.com/x/react-data-grid/editing/
  return (
    <>
      {/* <Navbar /> */}

      {/* <Box sx={{ backgroundColor: "#f5f5f5", minHeight: "100vh", py: 4 }}>
           <Container maxWidth="md">
            
             <Box sx={{ textAlign: "center", mb: 4 }}>
               <Typography variant="h4" color="error" fontWeight="bold">
                 ACABC FARMER PRODUCER
               </Typography>
               <Typography variant="subtitle1" gutterBottom>
                 COMPANY LIMITED
               </Typography>
             </Box>
             </Container>
             </Box> */}
      <Box sx={{ width: "100%" }}>
        {Shopdetail && (
          <>
            <Box textAlign="center" my={4}>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Shop Details
              </Typography>
              <Typography variant="body1">
                <strong>Shop Name:</strong> {Shopdetail.shopName},&nbsp;
                <strong>Shop No.:</strong> {Shopdetail.shopNo},&nbsp;
                <strong>Village:</strong> {Shopdetail.village},&nbsp;
                <strong>City:</strong> {Shopdetail.city},&nbsp;
                <strong>Type of Card:</strong> {Shopdetail.typeOfCard}
              </Typography>
            </Box>
          </>
        )}
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
                checkboxSelection
                disableRowSelectionOnClick
                keepNonExistentRowsSelected
              
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
                    <Stack spacing={2} direction="row">
                      <Button  variant="contained" >Pay</Button>
                    </Stack>
        
                  </CardActions>
      </Box>
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
    </>
  );
};

export default ShopDetailsForm;
