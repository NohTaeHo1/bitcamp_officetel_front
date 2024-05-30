"use client";

import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { DataGrid } from "@mui/x-data-grid";
import { NextPage } from "next";
import MoveButton from "@/app/atom/button/MoveButton";
import { PG } from "@/app/components/common/enums/PG";
import OfficetelColumns from "@/app/components/officetel/module/columns";
import { findOfficetelsById } from "@/app/components/officetel/service/officetel.service";
import LinkButton, { linkButtonTitles } from "@/app/atom/button/LinkButton";
import CommonHeader from "@/app/atom/button/header";
import { getOfficetelJSON } from "@/app/components/officetel/service/officetel.slice";

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

const names = ["전부", "매매", "전세", "월세"];

const OfficeListPage: NextPage = ({ params }: any) => {
  const dispatch = useDispatch();

  const [size, setSize] = useState(10);
  const [number, setNumber] = useState(0);

  const allOfficetels: [] = useSelector(getOfficetelJSON);

  useEffect(() => {
    dispatch(findOfficetelsById(params.id));
  }, []);


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
          <tr></tr>
         
          <tr>
            <td align="center" className="h-300">
              {allOfficetels && (
                <DataGrid
                  rows={allOfficetels}
                  columns={OfficetelColumns()}
                  initialState={{
                    pagination: {
                      paginationModel: {
                        pageSize: size,
                      },
                    },
                  }}
                  pageSizeOptions={[5, 10, 20]}
                  //checkboxSelection
                  disableRowSelectionOnClick
                  disableColumnResize
                />
              )}
            </td>
          </tr>
          <td>
            <button>수정</button>
          </td>
          <td>
            <button>삭제</button>
          </td>
          <thead>
            <tr>
              <td colSpan={3}>
                <MoveButton text={"글쓰기"} path={`${PG.ARTICLE}/save`} />
              </td>
            </tr>
          </thead>
        </tbody>
      </table>
    </>
  );
};

export default OfficeListPage;
