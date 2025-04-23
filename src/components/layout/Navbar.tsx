import { alpha, Button, Link, Menu, MenuProps, styled, Toolbar, Typography } from '@mui/material'
import React from 'react'
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import MenuItem from "@mui/material/MenuItem";
import Homepage from './Homepage';
const StyledMenu = styled((props: MenuProps) => (
    <Menu
      elevation={0}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      {...props}
    />
  ))(({ theme }) => ({
    "& .MuiPaper-root": {
      borderRadius: 6,
      marginTop: theme.spacing(1),
      minWidth: 180,
      color:
        theme.palette.mode === "light"
          ? "rgb(55, 65, 81)"
          : theme.palette.grey[300],
      boxShadow:
        "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
      "& .MuiMenu-list": {
        padding: "4px 0",
      },
      "& .MuiMenuItem-root": {
        "& .MuiSvgIcon-root": {
          fontSize: 18,
          color: theme.palette.text.secondary,
          marginRight: theme.spacing(1.5),
        },
        "&:active": {
          backgroundColor: alpha(
            theme.palette.primary.main,
            theme.palette.action.selectedOpacity
          ),
        },
      },
    },
  }));
  
const Navbar: React.FC = () =>  {
    const handleClick = (
        event: React.MouseEvent<HTMLElement>,
        mainMenu: string
      ) => {
        if (mainMenu === "common") setCommonAnchorEl(event.currentTarget);
        // else if (mainMenu === "adminSociety")
        //   setAdminSocietyAnchorEl(event.currentTarget);
      
      };
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
  
      const [commonAnchorEl, setCommonAnchorEl] =
          React.useState<null | HTMLElement>(null);

          const openCommon = Boolean(commonAnchorEl);
       const handleClose = () => {
          setCommonAnchorEl(null);
         // setAdminSocietyAnchorEl(null);
        
        };
    
  return (
    <div>
       <>
      <React.Fragment>
      <Toolbar
  component="nav"
  variant="dense"
  sx={{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "var(--primary-color)",
    color: "white",
    textDecoration: "none",
    overflowX: "auto",
    paddingInline: 2,
  }}
>
  {/* Left-aligned Typography */}
  <Typography
  sx={{
    fontSize: "1.2rem",
    fontWeight: 500,
    fontStyle: "italic",
    color: "white",
    letterSpacing: "0.03em",
  }}
>
ACABC FARMER PRODUCER COMPANY LIMITED
</Typography>



  {/* Right-aligned Common button */}
  <Button
    id="common-button"
    aria-controls={open ? "common-menu" : undefined}
    aria-haspopup="true"
    aria-expanded={open ? "true" : undefined}
    sx={{
      color: "white",
      '& .MuiSvgIcon-root': {
        color: 'white',
      },
    }}
    disableElevation
    onClick={(e) => handleClick(e, "common")}
    endIcon={<KeyboardArrowDownIcon />}
  >
    Common
  </Button>

  {/* Menu */}
  <StyledMenu
    id="common-menu"
    MenuListProps={{
      "aria-labelledby": "common-button",
    }}
    anchorEl={commonAnchorEl}
    open={openCommon}
    onClose={handleClose}
  >
    <Link color="inherit" href={"/banks"} className="nav-link">
      <MenuItem onClick={handleClose} disableRipple>
        Bank
      </MenuItem>
    </Link>
    <Link color="inherit" href={"/parkingTypes"} className="nav-link">
      <MenuItem onClick={handleClose} disableRipple>
        Parking Type
      </MenuItem>
    </Link>
  </StyledMenu>
</Toolbar>

      </React.Fragment>
    </>
    <Homepage/>
    </div>
  )
}

export default Navbar;
