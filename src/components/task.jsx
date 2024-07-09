import React from "react";
import { Table } from "antd";

const Column = [
  { title: "Task", dataIndex: "taskName", key: "taskName" , filtered:true, sorter:true},
  { title: "Descripcion", dataIndex: "description", key: "description" },
  { title: "categoria", dataIndex: "catergory", key: "catergory" , filtered:true, sorter:true},
];

const Task = (props) => {
  return (
    <div>
      <Table dataSource={props.data} columns={Column} />
    </div>
  );
};

export default Task;
