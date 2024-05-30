import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  deleteOfficetelsByIdAPI,
  findAllOfficetelsAPI,
  findOfficetelsBoundaryAPI,
  findOfficetelsByIdAPI,
} from "./officetel.api";
import { OfficetelSearch } from "../model/officetel-search";

export const findAllOfficetels: any = createAsyncThunk(
  "officetel/findAllOfficetelsAPI",
  async (page: number) => {
    const data: any = await findAllOfficetelsAPI(1, 10);
    const { message, result }: any = data;
    return data;
  }
);// 카드 페이지에 넣을거

export const findOfficetelsBoundary: any = createAsyncThunk(
  "officetel/findOfficetelsBoundaryAPI",
  async (searchInfo:OfficetelSearch) => {
    const data: any = await findOfficetelsBoundaryAPI(searchInfo);
    const { message, result }: any = data;

    return data;
  }
); // 디테일 페이지에 체크박스로 넣을거

export const findOfficetelsById: any = createAsyncThunk(
  "officetel/findOfficetelsByIdAPI",
  async (id: number) => {
    const data: any = await findOfficetelsByIdAPI(id);
    const { message, result }: any = data;
    return data;
  }
);

export const deleteOfficetelsById: any = createAsyncThunk(
  "officetel/deleteOfficetelsByIdAPI",
  async (id: number) => {
    const data: any = await deleteOfficetelsByIdAPI(id);
    const { message, result }: any = data;
    return data;
  }
);

