"use client";
import { PG } from "@/app/components/common/enums/PG";
import { IUser } from "@/app/components/user/model/user";
import {
  deleteById,
  findUserById,
  modify,
} from "@/app/components/user/service/user.service";
import { getAllUsers } from "@/app/components/user/service/user.slice";
import { Input, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

export default function UserDetail({ params }: any) {
  const router = useRouter();
  const dispatch = useDispatch();
  const user: IUser = useSelector(getAllUsers);

  useEffect(() => {
    dispatch(findUserById(params.id));
  }, []);

  //const [users, setUsers] = useState(user);
  const users = {...user}

  function deleteHandle(event: any) {
    dispatch(deleteById(params.id), [dispatch]);
    router.push(`${PG.USER}/list`);
  }

  function newPhone(e: any): void {
    //setUsers({ ...users, phone: users.phone || user.phone });
    users.phone = e.target.value;
  }

  function newPassword(e: any): void {
    users.password = e.target.value;
  }
  function newJob(e: any): void {
    users.job = e.target.value;
  }

  function modifyHandle(e: any): void {
    dispatch(modify(users), []);
  }

  const inputStyle = {
    borderRadius: "5px",
    padding: "0.5rem",
    border: "1px solid #ccc",
    outline: "none",
    "&:focus": {
      border: "1px solid #4CAF50",
    },
  };

  const buttonStyle = {
    backgroundColor: "#4CAF50", // 녹색 배경색
    color: "white", // 흰색 글자색
    padding: "10px 20px", // 패딩
    border: "none", // 테두리 없음
    borderRadius: "5px", // 5px 만큼의 둥근 테두리
    cursor: "pointer", // 커서 모양 변경
    outline: "none", // 포커스 시 테두리 없음
  };

  return (
    <>
       <h2 style={{ textAlign: "center" }}>{user.name}님 상세 정보</h2>
  <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
    <div style={{ marginBottom: "1rem" }}>
      <span>ID :</span>
      <Typography textAlign="center" sx={{ fontSize: "1.5rem" }}>
        {params.id}
      </Typography>
    </div>
    {user && (
      <>
        <div style={{ marginBottom: "1rem" }}>
          <span>아이디 :</span>
          <Typography textAlign="center" sx={{ fontSize: "1.5rem" }}>
            {user.id}
          </Typography>
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <span>이름 :</span>
          <Typography textAlign="center" sx={{ fontSize: "1.5rem" }}>
            {user.name}
          </Typography>
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <span>비밀번호 :</span>
          <Typography textAlign="center" sx={{ fontSize: "1.5rem" }}>
            {user.password}
            <br />
            <Input
              type="text"
              onChange={newPassword}
              sx={{
                ...inputStyle,
              }}
            />
          </Typography>
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <span>전화번호 :</span>
          <Typography textAlign="center" sx={{ fontSize: "1.5rem" }}>
            {user.phone}
            <br />
            <Input
              type="text"
              onChange={newPhone}
              sx={{
                ...inputStyle,
              }}
            />
          </Typography>
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <span>직업 :</span>
          <Typography textAlign="center" sx={{ fontSize: "1.5rem" }}>
            {user.job}
            <br />
            <Input
              type="text"
              onChange={newJob}
              sx={{
                ...inputStyle,
              }}
            />
          </Typography>
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <span>이메일 :</span>
          <Typography textAlign="center" sx={{ fontSize: "1.5rem" }}>
            {user.email}
          </Typography>
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <span>등록일 :</span>
          <Typography textAlign="center" sx={{ fontSize: "1.5rem" }}>
            {user.regDate}
          </Typography>
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <span>수정일 :</span>
          <Typography textAlign="center" sx={{ fontSize: "1.5rem" }}>
            {user.modDate}
          </Typography>
        </div>
        <div>
          <button onClick={deleteHandle} style={{ ...buttonStyle, backgroundColor: "#f44336" }}>
            삭제
          </button>
          <button onClick={modifyHandle} style={{ ...buttonStyle, backgroundColor: "#4CAF50" }}>
            수정
          </button>
          <button  style={{ ...buttonStyle, backgroundColor: "#f44336" }}>
            탈퇴
          </button>
        </div>
      </>
    )}
  </div>
    </>
  );
}
