import { Badge, Calendar } from "antd";
import './Calendar2.module.css';

const getListData = (value, selectedDate, selectedDateData) => {
  if (value.toDate().getTime() === selectedDate.getTime()) {
    return selectedDateData;
  }
  return [];
};

const getMonthData = (value) => {
  if (value.month() === 8) {
    return 1394;
  }
};

const Calender2 = ({ onChange, data, date }) => {
  const monthCellRender = (value) => {
    const num = getMonthData(value);
    return num ? (
      <div className="notes-month">
        <section>{num}</section>
        <span>Backlog number</span>
      </div>
    ) : null;
  };

  const dateCellRender = (value) => {
    const listData = getListData(value, date, data);

    return (
      <ul className="events">
        {listData.map((item) => (
          <li key={item.content}>
            <Badge status={item.type} text={item.content} />
          </li>
        ))}
      </ul>
    );
  };
  const cellRender = (current, info) => {
    if (info.type === "date") return dateCellRender(current);
    if (info.type === "month") return monthCellRender(current);
    return info.originNode;
  };

  const handleDateSelect = (date) => {
    onChange(date.toDate());
  };

  return <Calendar cellRender={cellRender} onSelect={handleDateSelect} mode='month' />;
};

export default Calender2;
