import "./App.css";

import TaskList from "./components/taskList";
import AddTask from "./components/addTask";
import { Layout } from "antd";

import { Amplify } from '@aws-amplify/core';
import awsconfig from './aws-exports';

Amplify.configure({
  ...awsconfig,
  DataStore: {
    ...awsconfig.DataStore,
    models: [
      {
        name: "tasks",
        attributes: {
          ID: { type: "string", required: true },
          task: { type: "string" },
        }
      }
    ]
  }
});

const { Header, Content, Footer } = Layout;

function App() {
  return (
    <div className="container">
      <Layout>
      <Header>
        <h1 style={{color:'white'}}>
        My Task Tracker
        </h1>
      </Header>
      <Content style={{height:'670px'}}>
        <TaskList />
      </Content>
      <Footer>
        <AddTask />
      </Footer>
    </Layout>
    </div>
  );
}

export default App;
