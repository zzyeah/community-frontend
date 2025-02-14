import { TypeInfo } from "@/types/type/typeInfo.interface";
import { Select as AntdSelect } from "antd";

export enum FormDatePart {
  year = "year",
  time = "time",
  yearTime = "year-time",
  timeWeek = "time-week",
}

/**
 * 格式化时间戳
 * @param {*} timestamp
 * @returns
 */
export function formatDate(timestamp: string, part?: FormDatePart) {
  if (!timestamp) {
    return;
  }
  let date = new Date(parseInt(timestamp));

  let year: number | string = date.getFullYear(); // 年
  let month: number | string = date.getMonth() + 1; // 月
  let day: number | string = date.getDate(); // 日

  let hour: number | string = date.getHours(); // 时
  let minutes: number | string = date.getMinutes(); // 分
  let seconds: number | string = date.getSeconds(); // 秒

  let weekArr = [
    "星期日",
    "星期一",
    "星期二",
    "星期三",
    "星期四",
    "星期五",
    "星期六",
  ];
  let week = weekArr[date.getDay()];

  // 需要给一位数前面加 0
  // 9 点 ----> 09:45:03

  if (month >= 1 && month <= 9) {
    // month += '0'; // a += b ----> a = a + b
    month = "0" + month;
  }

  if (day >= 0 && day <= 9) {
    day = "0" + day;
  }

  if (hour >= 0 && hour <= 9) {
    hour = "0" + hour;
  }

  if (minutes >= 0 && minutes <= 9) {
    minutes = "0" + minutes;
  }

  if (seconds >= 0 && seconds <= 9) {
    seconds = "0" + seconds;
  }

  var str = "";

  switch (part) {
    case FormDatePart.year: {
      str = `${year}-${month}-${day}`;
      break;
    }
    case FormDatePart.time: {
      str = `${hour}:${minutes}:${seconds} `;
      break;
    }
    case FormDatePart.yearTime: {
      str = `${year}-${month}-${day} ${hour}:${minutes}:${seconds}`;
      break;
    }
    case FormDatePart.timeWeek: {
      str = `${hour}:${minutes}:${seconds} ${week}`;
      break;
    }
    default: {
      str = `${year}-${month}-${day} ${hour}:${minutes}:${seconds} ${week}`;
    }
  }

  return str;
}

/**
 * 批量生成下拉列表的 options
 */
export function typeOptionCreator(
  Select: typeof AntdSelect,
  typeList: TypeInfo[]
) {
  const { Option: SelectOption } = Select;
  return typeList.map((type) => {
    return (
      <SelectOption key={type.id} value={type.id}>
        {type.typeName}
      </SelectOption>
    );
  });
}
