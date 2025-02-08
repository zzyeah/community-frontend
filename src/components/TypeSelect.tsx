import { useTypes } from "@/hook/useTypes";
import {
  getTypeList,
  updateBookTypeId,
  updateIssueTypeId,
} from "@/redux/type/typeSlice";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import ZyTag from "./ZyTag";
import { useLocation } from "react-router-dom";

/**
 * 分类组件
 * @returns
 */
function TypeSelect() {
  const { typeList } = useTypes();
  const dispatch = useDispatch();
  const location = useLocation();
  const [tagContainer, setTagContainer] = useState([]);

  const changeType = useCallback(
    (typeId) => {
      // 更新issueTypeId或者bookTypeId
      if (location.pathname.includes("issues")) {
        dispatch<any>(updateIssueTypeId(typeId));
      } else if (location.pathname.includes("books")) {
        dispatch<any>(updateBookTypeId(typeId));
      }
    },
    [dispatch, location.pathname]
  );

  useEffect(() => {
    if (!typeList?.length) {
      dispatch<any>(getTypeList());
    }
    if (typeList.length) {
      let arr = [];
      arr.push(
        <ZyTag
          color="magenta"
          key={"all"}
          style={{ cursor: "pointer" }}
          onClick={() => {
            changeType("all");
          }}
        >
          全部
        </ZyTag>
      );
      const types = typeList.map((type, i) => {
        return (
          <ZyTag
            zyColor={(colorArr) => colorArr[i % colorArr.length]}
            key={type.id}
            style={{ cursor: "pointer" }}
            onClick={() => {
              changeType(type.id);
            }}
          >
            {type.typeName}
          </ZyTag>
        );
      });
      arr = arr.concat(types);
      setTagContainer(arr);
    }
  }, [changeType, dispatch, typeList]);

  return <div>{tagContainer}</div>;
}

export default TypeSelect;
