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

const ShopDetailsForm = (...props: any) => {
  const [Shopdetail, setShopdetail] = useState(
    ShopDetailsService.initialFieldValues
  );
  const [products, setProducts] = useState<ProductDetailsModel[]>([]);
  const [maxWidth, setMaxWidth] = React.useState<DialogProps["maxWidth"]>("md");
  const [selectedRows, setSelectedRows] = useState<any[]>([]);
  //  const [selectedExpenseHdrsIds, setSelectedExpenseHdrsIds] = useState<
  //     string[]
  //   >([]);
  const [editedRowIds, setEditedRowIds] = useState<Set<String>>(new Set());

  const theme = useTheme();
  const { shopNo } = useParams();
  const [productall, setProduct] = useState([
    ProductDetailsService.initialFieldValues,
  ]);
  const [paymentdetails, setpaymentdetails] = useState([]);
  const navigate = useNavigate();
  const [productId, setProductId] = useState<any>(null);
  const [open, setOpen] = React.useState(false);
  useEffect(() => {
    if (shopNo) {
      getSms();
    }
  }, [shopNo]);
  const handleOpen = (productId: any) => {
    debugger;
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
  const { values, setValues, errors, setErrors, handleInputChange, resetForm } =
    useForm(ProductDetailsService.initialFieldValues, "", props.setCurrentId);

  // const getpayment = () => {
  //   values.selectedExpenseHdrsIds = Array.from(selectedExpenseHdrsIds?.ids ?? []);
  //    console.log("selectedExpenseHdrsIds", values.selectedExpenseHdrsIds);
  //   debugger
  //     ProductDetailsService.getByIds(values.selectedExpenseHdrsIds).then((response) => {
  //       if (response) {
  //         let result = response.data;
  //         console.log("result", result);
  //         if (result && Array.isArray(result.data)) {
  //           const totalRate = result.data.reduce((acc : any, item : any) => acc + item.rate, 0);  // Sum of all rates
  //           const totalQuantity = result.data.reduce((acc : any, item : any) => acc + item.quantity, 0);  // Sum of all quantities
  //           const totalValue = totalRate * totalQuantity;
  //         console.log('Total Value:', totalValue);
  //         }
  //       }
  //     })
  //   };
  const getpayment = () => {
    const selectedIdsArray = Array.from(selectedExpenseHdrsIds?.ids ?? []);
  
    // Filter selected rows
    const selectedRows = productall.filter((row) =>
      selectedIdsArray.includes(row.productId)
    );
  
    let totalValue = 0;
  
    selectedRows.forEach((item, index) => {
    
      const rate = Number(item.rate || 0);
      const quantity = Number(item.quantity || 0);
      const rowValue = rate * quantity;
      console.log(`Row ${index + 1}: Rate = ${rate}, Quantity = ${quantity}, Value = ${rowValue}`);
      totalValue += rowValue;
    });
  
    console.log("Total Value:", totalValue);
  };

  const getpaymentdetails = (productId: any) => {
    ProductDetailsService.getById(productId).then((response) => {
      if (response) {
        let result = response.data;
        //setValues(setFormValue(result.data));
        setpaymentdetails(result.list);
      }
    });
  };

  const AddPayment = () => {
    PaymentDetailsService.Post(PaymentDetailsService.initialFieldValues).then(
      (response: any) => {
        if (response) {
          let result = response.data;

          if (result.isSuccess) {
            globalService.success(result.message);

            navigate(-1);
          } else {
            globalService.error(result.message);
          }
        }
      }
    );
  };
  const [selectedExpenseHdrsIds, setSelectedExpenseHdrsIds] =
    useState<GridRowSelectionModel>();

  const handleConvertedmarkfortallySelectionChange = (
    newSelection: GridRowSelectionModel
  ) => {
    debugger;
    setSelectedExpenseHdrsIds(newSelection);
  };

  const columns: GridColDef[] = [
    { field: "productName", headerName: "Product Name", flex: 1 },
    { field: "description", headerName: "Description", flex: 1 },
    {
      field: "quantity",
      headerName: "Quantity",
      flex: 1,
      editable: true, // <-- Make editable
      type: "number", // Optional: better input type
    },
    {
      field: "rate",
      headerName: "Rate",
      flex: 1,
      editable: true, // <-- Make editable
      type: "number", // Optional
    },
    // {
    //   field: "Actions",
    //   headerName: "Actions",
    //   flex: 1,
    //   renderCell: (params) => (
    //     <Stack direction="row" spacing={0}>
    //       <IconButton
    //         size="small"
    //         color="primary"
    //         onClick={() => handleOpen(params.row.productId)}
    //       >
    //         <EditIcon fontSize="inherit" />
    //       </IconButton>
    //     </Stack>
    //   ),
    // },
  ];
  const handleCellEdit = (updatedRow: any) => {
    setProduct((prevProducts: any) =>
      prevProducts.map((product: any) =>
        product.productId === updatedRow.productId ? updatedRow : product
      )
    );
  };

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
                processRowUpdate={(newRow) => {
                  handleCellEdit(newRow);
                  return newRow; // Very Important! Otherwise DataGrid gives error
                }}
                disableRowSelectionOnClick
                checkboxSelection
                onRowSelectionModelChange={(newRowSelectionModel) => {
                  handleConvertedmarkfortallySelectionChange(
                    newRowSelectionModel
                  );
                }}
                rowSelectionModel={selectedExpenseHdrsIds}
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
        <CardActions sx={{ display: "flex", justifyContent: "center" }}>
          <Stack spacing={2} direction="row">
            <Button variant="contained" onClick={getpayment}>
              Pay
            </Button>
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
