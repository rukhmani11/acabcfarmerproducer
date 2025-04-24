import React, { useEffect, useState } from 'react'
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
import { ShopDetailsService } from '../../Services/ShopDetailsService';
import { useNavigate, useParams } from 'react-router-dom';
import { DataGrid, GridColDef, GridToolbar } from '@mui/x-data-grid';
import { ProductDetailsService } from '../../Services/ProductDetailsService';

function ShopDetailsForm() {
  const [Shopdetail, setShopdetail] = useState(null);
  const { shopNo } = useParams();
  const [products, setProduct] = useState([]);
  const navigate = useNavigate();
  
  useEffect(() => {
      getSms();
  }, []);

      const getSms = () => {
          ShopDetailsService.getShopdetailsByshopNo(shopNo ? parseInt(shopNo, 10) : 0)
              .then((response: { data: any; }) => {
                  let result = response.data;
                  setShopdetail(result.row);
              });
      };
      const getProduct = () => {
        ProductDetailsService.getAll().then((response) => {
          let result = response.data;
          setProduct(result.list);
        });
      };
    
      const columns: GridColDef[] = [
        { field: "Product", headerName: "Products Name", width: 130, flex: 1 },
        { field: "description", headerName: "Description", width: 130, flex: 1 },
        { field: "quantity", headerName: "Quantity", width: 130, flex: 1 },
        
    
      ];
      // https://mui.com/x/react-data-grid/editing/
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
             </Container>
             </Box>
              <Box sx={{ width: "100%" }}>
              {Shopdetail &&
                  <>
                   <Typography variant="h4" color="error" fontWeight="bold">
                   {Shopdetail.shopName},{Shopdetail.shopNo},{Shopdetail.village},{Shopdetail.city},{Shopdetail.typeOfCard},
               </Typography>
                      
                          </>}
                          <Card>
        <CardContent>
         
          <div style={{width: "100%" }}>
            <DataGrid
              getRowId={(row) => row.ProductId}
              rows={products}
              columns={columns}
              columnHeaderHeight={30}
              //rowHeight={30}
              autoHeight={true}
              getRowHeight={() => "auto"}
              getEstimatedRowHeight={() => 200}
              //loading={loading}
              initialState={{
                columns: {
                  columnVisibilityModel: {
                    // Hide columns Id, the other columns will remain visible
                    ProductId: false,
                  },
                },
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
                          </Box>
                   </>       
                          
  )
}

export default ShopDetailsForm