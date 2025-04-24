import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Menu,
  MenuItem,
  Box,
} from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Link as RouterLink } from 'react-router-dom';

const SimpleNavbar: React.FC = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: '#1976d2' }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        {/* Company Name */}
        <Typography variant="h6" sx={{ fontStyle: 'italic' }}>
          ACABC FARMER PRODUCER COMPANY LIMITED
        </Typography>

        {/* Dropdown Button */}
        <Box>
          {/* <Button
            color="inherit"
            onClick={handleClick}
            endIcon={<KeyboardArrowDownIcon />}
          >
            Common
          </Button> */}
          {/* <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          >
            <MenuItem component={RouterLink} to="/banks" onClick={handleClose}>
              Bank
            </MenuItem>
            <MenuItem component={RouterLink} to="/parkingTypes" onClick={handleClose}>
              Parking Type
            </MenuItem>
          </Menu> */}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default SimpleNavbar;
