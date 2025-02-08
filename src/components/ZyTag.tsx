import { Tag } from "antd";
import { TagProps } from "antd/lib";
import React, {
  forwardRef,
  LegacyRef,
  useEffect,
  useMemo,
  useState,
} from "react";

export type ZyTagProps = {
  colorList?: string[];
  zyColor?: string | ((colorList: string[]) => string);
} & TagProps;
const ZyTag = forwardRef(
  (props: ZyTagProps, ref: LegacyRef<HTMLSpanElement>) => {
    const { colorList, children, zyColor, color } = props;
    const colorArr = useMemo(() => {
      return (
        colorList || [
          "#108ee9",
          "#2db7f5",
          "#f50",
          "green",
          "#87d068",
          "blue",
          "red",
          "purple",
        ]
      );
    }, [colorList]);

    const [curColor, setCurColor] = useState<string>("");
    useEffect(() => {
      let curColor = "";
      if (color) {
        curColor = color;
      }
      if (zyColor) {
        if (typeof zyColor === "function") {
          curColor = zyColor(colorArr);
        } else {
          curColor = zyColor;
        }
      }
      setCurColor(curColor);
    }, [zyColor, colorArr, color]);
    return (
      <Tag color={curColor} ref={ref} {...props}>
        {children}
      </Tag>
    );
  }
);

export default ZyTag;
