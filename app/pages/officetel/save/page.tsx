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
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import instance from "@/app/components/common/configs/axios-config";
import { OfficetelModel } from "@/app/components/officetel/model/officetel-model";
import Addr from "@/app/components/common/api/KakaoPostNum";
import { parseCookies } from "nookies";

const SERVER = "http://localhost:8081";

declare global {
  interface Window {
    daum: any;
  }
}

interface IAddr {
  address: string;
  zonecode: string;
}

const JoinPage: NextPage = () => {
  console.log("쿠키e" + JSON.stringify(parseCookies()));
  const [newOfficetel, setNewOfficetel] = useState<OfficetelModel>({
    user: parseCookies().username,
  });

  const handleOwnerType = (e: any) => {
    setNewOfficetel({ ...newOfficetel, ownerType: e.target.value });
  };
  const handleBuildingName = (e: any) => {
    setNewOfficetel({ ...newOfficetel, buildingName: e.target.value });
  };
  const handlePropertyType = (e: any) => {
    setNewOfficetel({ ...newOfficetel, propertyType: e.target.value });
  };
  const handlePrice = (e: any) => {
    setNewOfficetel({ ...newOfficetel, price: e.target.value });
    console.log("왜 안담겨"+JSON.stringify(newOfficetel))

  };
  const handleMonthlyRent = (e: any) => {
    setNewOfficetel({ ...newOfficetel, monthlyRent: e.target.value });
  };
  const handleArea = (e: any) => {
    setNewOfficetel({ ...newOfficetel, area: e.target.value });
  };
  const handleFloor = (e: any) => {
    setNewOfficetel({ ...newOfficetel, floor: e.target.value });
  };

  const router = useRouter();

  const handleCancel = () => {};

  const handleSignup = (e: any) => {
    console.log("확인하자.." + JSON.stringify(newOfficetel));
    e.preventDefault();

    const url = `${API.SERVER}/officetel/insert`;

    instance()
      .post(url, newOfficetel)
      .then((res) => {
        alert("매물등록 : " + JSON.stringify(res.data.message));
        router.push(`/pages/officetel/list`);
      });
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" component="h1" gutterBottom>
        매물등록
      </Typography>
      <Typography variant="body1" gutterBottom>
        아래 항목을 채워주세요.
      </Typography>
      <Box component="form" noValidate autoComplete="off">
        <TextField
          fullWidth
          label="중개사는 1, 개인은 2 를 기입해주세요."
          name="ownerType"
          type="ownerType"
          required
          margin="normal"
          onChange={handleOwnerType}
        />
        <TextField
          fullWidth
          label="건물이름"
          name="psw"
          required
          type="buildingName"
          margin="normal"
          onChange={handleBuildingName}
        />

            <Addr />

        <script
          src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"
          async
        />
        <TextField
          fullWidth
          label="매매는 1, 월세는 2, 전세는 3을 기입해 주세요."
          name="psw-repeat"
          required
          type="propertyType"
          margin="normal"
          onChange={handlePropertyType}
        />
        <TextField
          fullWidth
          label="가격"
          margin="normal"
          onChange={handlePrice}
        />
        <TextField
          fullWidth
          label="월세(월세인 경우만)"
          margin="normal"
          onChange={handleMonthlyRent}
        />
        <TextField
          fullWidth
          label="면적"
          margin="normal"
          onChange={handleArea}
        />
        <TextField
          fullWidth
          label="층수"
          margin="normal"
          onChange={handleFloor}
        />
        <Box mt={2}>
          <Button variant="outlined" color="secondary" onClick={handleCancel}>
            취소
          </Button>{" "}
          <Button
            variant="contained"
            color="primary"
            onClick={handleSignup}
            type="submit"
          >
            등록
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default JoinPage;
