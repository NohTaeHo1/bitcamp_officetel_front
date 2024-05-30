import instance from "@/app/components/common/configs/axios-config";
import { OfficetelModel } from "../model/officetel-model";
import { OfficetelSearch } from "../model/officetel-search";
import qs from "qs";


export const findAllOfficetelsAPI = async (page: number, size: number) => {
  try {
    const response = await instance().get(`/officetel/search/`, {
      params: { q: "3"},
    });
    return response.data.list;
  } catch (error) {

    return error;
  }
}; // 이거 전체가 axios

export const findOfficetelsBoundaryAPI = async (searchInfo:OfficetelSearch) => {
  console.log("searchInfo.OTValues"+searchInfo.OTValues)

  try {
    const params = {
      q: "3",
      cost: [0, 999999],
      page: 1,
      size: 10
  };
  const queryString = qs.stringify(params, { arrayFormat: 'repeat' });

    console.log('oTvalue: '+searchInfo.OTValues + 'pTValue: '+searchInfo.PTValues+ 'cost: '+searchInfo.cost)
    const response = await instance().get(`/api/officetel/search/?${queryString}`);
    console.log("response : " + JSON.stringify(response.data.list))
    return response.data.list;
  } catch (error) {
    console.log("API까지 오는가...")

    return error;
  }
};

export const findOfficetelsByIdAPI = async (id: number) => {
  try {
    const response = await instance().get(`/officetel/search/${id}`, {
      params: { q: "4", id: id},
    });
    return response.data.list;
  } catch (error) {

    return error;
  }
}; // 이거 전체가 axios

export const deleteOfficetelsByIdAPI = async (id: number) => {
  try {
    const response = await instance().get(`/officetel/remove`, {
      params: {id: id},
    });
    return response.data.list;
  } catch (error) {

    return error;
  }
}; // 이거 전체가 axios



