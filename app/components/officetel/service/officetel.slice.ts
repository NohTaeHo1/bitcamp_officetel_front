import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "./officetel.init";
import {
  findAllOfficetels,
  findOfficetelsBoundary,
  findOfficetelsById,
} from "./officetel.service";

const officetelThunks = [
  findAllOfficetels,
  findOfficetelsBoundary,
  findOfficetelsById,
];

const status = {
  pending: "pending",
  fulfilled: "fulfilled",
  rejected: "rejected",
};

export const officetelSlice = createSlice({
  name: "officetels",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    const { pending, rejected } = status;

    builder
      .addCase(findAllOfficetels.fulfilled, (state: any, { payload }: any) => ({
        ...state,
        JSON: payload,
      }))
      .addCase(
        findOfficetelsBoundary.fulfilled,
        (state: any, { payload }: any) => ({ ...state, Json: payload })
      )
      .addCase(findOfficetelsById.fulfilled, (state: any, { payload }: any) => ({
        ...state,
        Json: payload,
      }))
  },
});

export const getOfficetelJSON = (state: any) => state.officetel.JSON; 
 
export const getOfficetelArray = (state: any) => state.officetel.array;


export const {} = officetelSlice.actions;

export default officetelSlice.reducer;
