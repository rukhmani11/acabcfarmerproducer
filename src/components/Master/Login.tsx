import React, { useContext, useState } from "react";
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  Paper,
  CardActions,
} from "@mui/material";
import { LoginService } from "../../Services/LoginService";
import { globalService } from "../../Services/GlobalService";
import useForm from "../../utility/controls/useForm";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { AuthContext } from "../../utility/context/AuthContext";
import { ROLES } from "../../utility/Config";

function Login() {
  const { auth, setAuth } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  let navigate = useNavigate();
  const validate = (fieldValues = values) => {
    let temp: any = { ...errors };
    if ("Username" in fieldValues)
      temp.Username = fieldValues.Username ? "" : "User name is required.";
    if ("Password" in fieldValues)
      temp.Password = fieldValues.Password ? "" : "Password is required.";

    // if ("Abrv" in fieldValues)
    // temp.Abrv = fieldValues.Abrv ? "" : "Abbreviation is required.";
    setErrors({
      ...temp,
    });

    if (fieldValues === values)
      return Object.values(temp).every((x) => x === "");
  };
  const { values, setValues, errors, setErrors, handleInputChange, resetForm } =
    useForm(LoginService.initialFieldValues, validate, "");

  const newUser = () => {
    setValues(LoginService.initialFieldValues);
  };

  //   const handleSubmit = (e: React.FormEvent) => {
  //     e.preventDefault();
  //     if (validate()) {
  //         debugger
  //         var username = values.Username;
  //         var password = values.Password;
  //         LoginService.UserGet(username, password)
  //         .then((response: any) => {
  //           if (response) {
  //             let result = response.data;

  //             if (result.isSuccess) {
  //               globalService.success(result.message);
  //               navigate("/paymentDetails");
  //             } else {
  //               globalService.error(result.message);
  //               navigate("/");
  //             }
  //           }
  //         })
  //         .catch((error) => {
  //           globalService.error("No Record Found.");
  //           console.error("API Error:", error);
  //           navigate("/");
  //         });
  //     }
  // }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const username = values.Username;
    const password = values.Password;
  
    LoginService.UserGet(username, password)
      .then((response: any) => {
        if (response) {
          const result = response.data;
          console.log("Login result:", result.data);
  
          if (result?.isSuccess) {
            const accessToken = result?.data?.token;
            const rolesString = result?.data?.role || "";
            const roles = rolesString ? rolesString.split(",") : [];
  
            localStorage.setItem("currentUser", JSON.stringify(result.data));
            setAuth({
              Roles: roles,
              Token: accessToken,
              UserId: result?.data?.userId,
              UserName: result?.data?.username,
            });
  
            localStorage.setItem("token", accessToken);
  
            // Navigate based on the role
            if (roles.includes(ROLES.admin)) {
              debugger
              navigate("/productDetails");
            } else {
              navigate("/");
            }
          } else {
            globalService.error(result.message || "Invalid credentials");
          }
        }
      })
      .catch((error) => {
        console.error("Error during login:", error);
        globalService.error("An error occurred. Please try again.");
      });
  };
  
  
  
  return (
    <Container maxWidth="xs" sx={{ paddingTop: 4 }}>
      <Paper sx={{ padding: 4, borderRadius: 2, boxShadow: 3 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="h5" sx={{ fontWeight: "bold", marginBottom: 3 }}>
            User Login
          </Typography>
          <form onSubmit={handleSubmit} style={{ width: "100%" }}>
            <TextField
              required
              label="User Name"
              variant="standard"
              name="Username"
              value={values.Username}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
              sx={{
                "& .MuicontainedInput-root": {
                  borderRadius: "20px",
                },
                marginBottom: 2,
              }}
            />
            <TextField
              label="Password"
              name="Password"
              value={values.Password}
              variant="standard"
              fullWidth
              margin="normal"
              onChange={handleInputChange}
              required
              sx={{
                "& .MuicontainedInput-root": {
                  borderRadius: "20px",
                },
                marginBottom: 2,
              }}
            />
            {error && (
              <Typography
                color="error"
                variant="body2"
                sx={{ marginTop: 1, textAlign: "center" }}
              >
                {error}
              </Typography>
            )}
            <Box display="flex" justifyContent="center" gap={2} mt={3}>
              <Button type="submit" variant="contained" color="primary">
                Login
              </Button>
              <Button
                variant="contained"
                startIcon={<ArrowBackIcon />}
                onClick={() => navigate(-1)}
              >
                Back To List
              </Button>
            </Box>
          </form>
        </Box>
      </Paper>
      <CardActions
        sx={{ display: "flex", justifyContent: "center" }}
      ></CardActions>
    </Container>
  );
}

export default Login;
