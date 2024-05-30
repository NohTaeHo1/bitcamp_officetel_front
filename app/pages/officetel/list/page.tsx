"use client";

import CardButton from "@/app/atom/button/CardButton";
import LinkButton, { linkButtonTitles } from "@/app/atom/button/LinkButton";
import CommonHeader from "@/app/atom/button/header";
import { OfficetelModel } from "@/app/components/officetel/model/officetel-model";
import { OfficetelSearch } from "@/app/components/officetel/model/officetel-search";
import { findAllOfficetelsAPI } from "@/app/components/officetel/service/officetel.api";
import { findAllOfficetels, findOfficetelsBoundary } from "@/app/components/officetel/service/officetel.service";
import { getOfficetelJSON } from "@/app/components/officetel/service/officetel.slice";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  Input,
  InputLabel,
  ListItemText,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function OfficetelCards() {
  const dispatch = useDispatch();
  const allOfficetels = useSelector(getOfficetelJSON);

  console.log;

  useEffect(() => {
    dispatch(findAllOfficetels());
  }, []);

  const [OTValues, setOTValues] = useState<number[]>([]);
  const [PTValues, setPTValues] = useState<number[]>([]);
  const [lowCost, setLowCost] = useState('0');
  const [maxCost, setMaxCost] = useState('999999');
  const [cost, setCost] = useState([0, 999999]);
  const [searchInfo, setSearchInfo] = useState<OfficetelSearch>( {cost: [0, 999999]})

  const handleOTCheckboxChange = (value: number) => {
    if (value === 4) {
      if (OTValues.length === 3) {
        setOTValues([]);
      } else {
        setOTValues([1, 2, 3]);
      }
    } else {
      if (OTValues.includes(value)) {
        setOTValues(OTValues.filter((item) => item !== value));
      } else {
        setOTValues([...OTValues, value]);
      }
    }
  };

  const handleOTSelectChange = (event: SelectChangeEvent<number[]>) => {
    const { value } = event.target;
    setOTValues(value as number[]);
  };

  const handlePTCheckboxChange = (value: number) => {
    if (value === 3) {
      if (PTValues.length === 2) {
        setPTValues([]);
      } else {
        setPTValues([1, 2]);
      }
    } else {
      if (PTValues.includes(value)) {
        setPTValues(PTValues.filter((item) => item !== value));
      } else {
        setPTValues([...PTValues, value]);
      }
    }
  };

  const handlePTSelectChange = (event: SelectChangeEvent<number[]>) => {
    const { value } = event.target;
    setPTValues(value as number[]);
  };

  const isAllChecked = (value: number) => {
    if (value === 4) {
      return OTValues.length === 3;
    } else {
      return OTValues.includes(value);
    }
  };
  const isPTAllChecked = (value: number) => {
    if (value === 3) {
      return PTValues.length === 2;
    } else {
      return PTValues.includes(value);
    }
  };

  useEffect(() => {
    dispatch(findOfficetelsBoundary(searchInfo));
  }, [OTValues, PTValues, searchInfo]);

  const handleLowCost = (e:any) => {
      setLowCost(e.target.value)
  }

  const handleMaxCost = (e:any) => {
      setMaxCost(e.target.value)
  }

  const handleCost = (e:any) => {
    try {
      console.log("OTValues"+ OTValues+ "PTValues"+ PTValues+ "cost"+ cost)
      setCost([parseInt(lowCost), parseInt(maxCost)])
      setSearchInfo({"OTValues": OTValues, "PTValues": PTValues, "cost": cost})
    } catch (error) {
      alert("잘못된 금액입니다.")
    }
  }

  return (
    <>
      <table
        className="table-auto w-11/12 border-x-black"
        style={{ margin: "1px auto" }}
      >
        <tbody>
          <CommonHeader />
          <div className="flex justify-center items-center h-full">
            {linkButtonTitles.map((button) => (
              <LinkButton
                key={button.id}
                id={button.id}
                title={button.title}
                path={button.path}
              />
            ))}
          </div>

          <tr>
            <td
              align="left"
              className="w-full bg-white border-b-2 border-gray-200 p-3 h-10 text-[20px]"
            >
              <FormControl fullWidth sx={{ width: "10%", marginRight: "20px" }}>
                <InputLabel id="checkbox-select-label">매물 종류</InputLabel>
                <Select
                  labelId="checkbox-select-label"
                  id="checkbox-select"
                  multiple
                  value={OTValues}
                  onChange={handleOTSelectChange}
                  renderValue={(selected) => {
                    if (selected.length === 0) {
                      return <em>None</em>;
                    }
                    return (
                      <div>
                        {selected.includes(4) && <span>모두</span>}
                        {selected.includes(1) && <span>매매</span>}
                        {selected.includes(3) && <span>전세</span>}
                        {selected.includes(2) && <span>월세</span>}
                      </div>
                    );
                  }}
                  inputProps={{
                    "aria-label": "Select options",
                  }}
                >
                  <MenuItem value={4}>
                    <Checkbox
                      checked={OTValues.length === 3}
                      onChange={() => handleOTCheckboxChange(4)}
                    />
                    <ListItemText primary="모두" />
                  </MenuItem>
                  <MenuItem value={1}>
                    <Checkbox
                      checked={isAllChecked(1)}
                      onChange={() => handleOTCheckboxChange(1)}
                    />
                    <ListItemText primary="매매" />
                  </MenuItem>
                  <MenuItem value={3}>
                    <Checkbox
                      checked={isAllChecked(3)}
                      onChange={() => handleOTCheckboxChange(3)}
                    />
                    <ListItemText primary="전세" />
                  </MenuItem>
                  <MenuItem value={2}>
                    <Checkbox
                      checked={isAllChecked(2)}
                      onChange={() => handleOTCheckboxChange(2)}
                    />
                    <ListItemText primary="월세" />
                  </MenuItem>
                </Select>
              </FormControl>

              <FormControl fullWidth sx={{ width: "10%", marginRight: "20px" }}>
                <InputLabel id="checkbox-select-label2">판매인</InputLabel>
                <Select
                  labelId="checkbox-select-label2"
                  id="checkbox-select2"
                  multiple
                  value={PTValues}
                  onChange={handlePTSelectChange}
                  renderValue={(selected) => {
                    if (selected.length === 0) {
                      return <em>None</em>;
                    }
                    return (
                      <div>
                        {selected.includes(3) && <span>모두</span>}
                        {selected.includes(1) && <span>공인중개사</span>}
                        {selected.includes(2) && <span>개인</span>}
                      </div>
                    );
                  }}
                  inputProps={{
                    "aria-label": "Select options",
                  }}
                >
                  <MenuItem value={3}>
                    <Checkbox
                      checked={PTValues.length === 2}
                      onChange={() => handlePTCheckboxChange(3)}
                    />
                    <ListItemText primary="모두" />
                  </MenuItem>
                  <MenuItem value={1}>
                    <Checkbox
                      checked={isPTAllChecked(1)}
                      onChange={() => handlePTCheckboxChange(1)}
                    />
                    <ListItemText primary="공인중개사" />
                  </MenuItem>
                  <MenuItem value={2}>
                    <Checkbox
                      checked={isPTAllChecked(2)}
                      onChange={() => handlePTCheckboxChange(2)}
                    />
                    <ListItemText primary="개인" />
                  </MenuItem>
                </Select>
              </FormControl>
              <FormControl fullWidth sx={{ width: "5%", marginLeft: "30px" }}>
                <TextField
                  required
                  id="outlined-required"
                  label="최소가격"
                  onChange={handleLowCost}
                />
              </FormControl>
              <span
                style={{
                  fontSize: "24px",
                  fontWeight: "bold",
                  marginLeft: "30px",
                }}
              >
                ~
              </span>

              <FormControl fullWidth sx={{ width: "5%", marginLeft: "30px" }}>
                <TextField
                  required
                  id="outlined-required"
                  label="최대가격"
                  onChange={handleMaxCost}

                />
              </FormControl>

              <FormControl
                fullWidth
                sx={{ width: "5%", marginLeft: "10px", marginTop: "8px" }}
              >
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "#1E82FF", // 배경색 설정
                    color: "white", // 글자색 설정
                  }}
                  onClick={handleCost}
                >
                  검색
                </Button>
              </FormControl>
              <FormControl>
              <span
                style={{
                  fontSize: "15px",
                  paddingTop: "15px",
                  marginLeft: "5px"
                }}
              >
                (단위:천만원)
              </span>
              </FormControl>
            </td>
          </tr>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
            {allOfficetels?.map((officetel: OfficetelModel) => {
              return (
                <CardButton
                  key={officetel.id}
                  id={officetel.id}
                  buildingName={officetel.buildingName}
                  propertyType={officetel.propertyType}
                  price={officetel.price}
                  monthlyRent={officetel.monthlyRent}
                  area={officetel.area}
                  floor={officetel.floor}
                  description={officetel.description}
                  listingDate={officetel.listingDate}
                />
              );
            })}
          </div>
          <tr>
            <td
              align="left"
              className="w-full bg-white border-b-2 border-gray-200 p-3 h-10 text-[20px]"
            ></td>
          </tr>
        </tbody>
      </table>
    </>
  );
}
