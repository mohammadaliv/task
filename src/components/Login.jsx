import { Button, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import styles from "./Login.module.css";

function Login() {
  const [usernameUser, setUsernameUser] = useState("");
  const [passwordUser, setPasswordUser] = useState("");
  const navigate = useNavigate(); // useNavigate hook for redirection

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const authenticateUser = async () => {
      const url = "http://rezayari.ir:5050/Auth/Login";
      const credentials = {
        username: usernameUser,
        password: passwordUser,
      };

      try {
        const response = await fetch(url, {
          method: "POST",
          headers: {
            accept: "*/*",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(credentials),
          signal: signal,
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log(data);
        const token = data.token;
        localStorage.setItem("token", token);
        navigate("/cities"); // Redirect to the "/cities" route
      } catch (error) {
        if (error.name === "AbortError") {
          console.log("Fetch aborted");
        } else {
          console.error("Authentication Error:", error.message);
        }
      }
    };

    authenticateUser();

    return () => controller.abort();
  }, [passwordUser, usernameUser, navigate]);

  function loginHandler(e) {
    e.preventDefault();
    // Call authenticateUser here or add your additional login logic if needed
  }

  return (
    <div dir="rtl">
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "25ch" },
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
        autoComplete="off"
      >
        <TextField
          label="نام کاربری"
          onChange={(e) => setUsernameUser(e.target.value)}
        />
        <TextField
          label="پسورد"
          type="password"
          onChange={(e) => setPasswordUser(e.target.value)}
        />

        <Button variant="text" onClick={loginHandler}>
          ورود
        </Button>
      </Box>
    </div>
  );
}

export default Login;
