import instance from "@/app/components/common/configs/axios-config";
import { OfficetelModel } from "../model/officetel-model";
import { OfficetelSearch } from "../model/officetel-search";
import qs from "qs";
import { parseCookies } from "nookies";

export const findAllOfficetelsAPI = async (page: number, size: number) => {
  try {
    const response = await instance().get(`/officetel/search/`, {
      params: { q: "3" },
    });
    console.log("개수확인용.." + JSON.stringify(response.data.list));
    return response.data.list;
  } catch (error) {
    return error;
  }
};

export const findOfficetelsBoundaryAPI = async (
  searchInfo: OfficetelSearch
) => {
  const queryString = qs.stringify({
    q: "2",
    oTvalue: searchInfo.OTValues,
    pTvalue: searchInfo.PTValues,
    cost: searchInfo.cost,
  }, { arrayFormat: 'repeat' });

  const url = `/officetel/search?${queryString}`;
  try {
    const response = await instance().get(url);
    console.log("개수확인용바운더리.." + JSON.stringify(response.data.list));

    return response.data.list;
  } catch (error) {
    return error;
  }
};

export const findOfficetelsByIdAPI = async (id: number) => {
  console.log("API"+id)
  try {
    const response = await instance().get(`/officetel/search/${id}`, {
      params: { q: "4", id: id },
    });
    console.log("response : "+response.data.list)
    return response.data.list;
  } catch (error) {
    console.log("안가나..?")
    return error;
  }
}; // 이거 전체가 axios

export const deleteOfficetelsByIdAPI = async (id: number) => {
  try {
    const response = await instance().post(`/officetel/remove/${id}`);
    return response.data.list;
  } catch (error) {
    return error;
  }
}; // 이거 전체가 axios

export const modifyOfficetelByIdAPI = async (row: OfficetelModel) => {
  console.log(JSON.stringify(row))
  try {
    const response = await instance().post(`/officetel/modify`, {
      params: { row },
    });
    return response.data.list;
  } catch (error) {
    return error;
  }
};


export const findOfficetelsByUsernameAPI = async () => {
  const user = parseCookies().username

  try {
    const response = await instance().get(`/officetel/search/`, {params: {q: "5", user: user}});
    console.log("response : "+response.data.list)
    return response.data.list;
  } catch (error) {
    console.log("안가나..?")
    return error;
  }
};