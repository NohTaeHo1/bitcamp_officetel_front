"use client";
import axios from "axios";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { API } from "@/app/components/common/enums/API";
import AxiosConfig from "@/app/components/common/configs/axios-config";
import { PG } from "@/app/components/common/enums/PG";
import { NextPage } from "next";
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  Link,
  TextField,
  Typography,
} from "@mui/material";
const SERVER = "http://localhost:8081";

const JoinPage: NextPage = () => {
  const [userName, setuserName] = useState("");
  const [password, setpassword] = useState("");
  const [passwordConfirm, setpasswordConfirm] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [job, setjob] = useState("");
  const [height, setheight] = useState("");
  const [weight, setweight] = useState("");

  const handleUserName = (e: any) => {
    setuserName(e.target.value);
  };
  const handlePassword = (e: any) => {
    setpassword(e.target.value);
  };
  const handlePasswordConfirm = (e: any) => {
    setpasswordConfirm(e.target.value);
  };
  const handleName = (e: any) => {
    setName(e.target.value);
  };
  const handlePhone = (e: any) => {
    setPhone(e.target.value);
  };
  const handleJop = (e: any) => {
    setjob(e.target.value);
  };

  const router = useRouter();

  const handleCancel = () => {};

  const handleSignup = (e: any) => {
    e.preventDefault();

    console.log(userName + "님 회원가입 성공");

    const url = `${API.SERVER}/users`;
    const data = {
      userName,
      password,
      passwordConfirm,
      name,
      phone,
      job,
    };
    axios.post(url, data, AxiosConfig()).then((res) => {
      alert("리스핀스가 가져온 이름 : " + JSON.stringify(res.data));
      router.push(`${PG.USER}/login`);
    });
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" component="h1" gutterBottom>
        Sign Up
      </Typography>
      <Typography variant="body1" gutterBottom>
        Please fill in this form to create an account.
      </Typography>
      <Box component="form" noValidate autoComplete="off">
        <TextField
          fullWidth
          label="Username"
          name="email"
          required
          margin="normal"
          onChange={handleUserName}
        />
        <TextField
          fullWidth
          label="Password"
          name="psw"
          required
          type="password"
          margin="normal"
          onChange={handlePassword}
        />
        <TextField
          fullWidth
          label="Repeat Password"
          name="psw-repeat"
          required
          type="password"
          margin="normal"
          onChange={handlePasswordConfirm}
        />
        <TextField
          fullWidth
          label="Name"
          margin="normal"
          onChange={handleName}
        />
        <TextField
          fullWidth
          label="Phone"
          margin="normal"
          onChange={handlePhone}
        />
        <TextField fullWidth label="Job" margin="normal" onChange={handleJop} />
        <FormControlLabel
          control={<Checkbox defaultChecked name="remember" />}
          label="Remember me"
        />
        <Typography variant="body2" gutterBottom>
          By creating an account you agree to our{" "}
          <Link href="#" color="primary">
            Terms & Privacy
          </Link>
          .
        </Typography>
        <Box mt={2}>
          <Button variant="outlined" color="secondary" onClick={handleCancel}>
            Cancel
          </Button>{" "}
          <Button
            variant="contained"
            color="primary"
            onClick={handleSignup}
            type="submit"
          >
            Sign Up
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default JoinPage;
