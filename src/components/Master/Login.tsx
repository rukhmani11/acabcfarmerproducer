import React, { useState } from "react";
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  Paper,
} from "@mui/material";
import { LoginService } from "../../Services/LoginService";
import { globalService } from "../../Services/GlobalService";
import useForm from "../../utility/controls/useForm";
import { useNavigate } from "react-router-dom";

function Login() {
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
        debugger
        var username = values.Username;
        var password = values.Password;
        LoginService.UserGet(username, password)
        .then((response: any) => {
          if (response) {
            let result = response.data;
      
            if (result.isSuccess) {
              globalService.success(result.message);
              navigate("/productDetails");
            } else {
              globalService.error(result.message);
              navigate("/"); 
            }
          }
        })
        .catch((error) => {
          globalService.error("No Record Found.");
          console.error("API Error:", error);
          navigate("/"); 
        });
    }
}
    
      
    

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
                "& .MuiOutlinedInput-root": {
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
                "& .MuiOutlinedInput-root": {
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
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{
                marginTop: 3,
                padding: "10px",
                borderRadius: "20px",
                fontWeight: "bold",
              }}
            >
              Login
            </Button>
          </form>
        </Box>
        {/* <Box sx={{ marginTop: 2, textAlign: 'center' }}>
            <Typography variant="body2" color="textSecondary">
              Don't have an account? <a href="/register">Sign up</a>
            </Typography>
          </Box> */}
      </Paper>
    </Container>
  );
}

export default Login;
