import "./App.css";
import { useState, useEffect } from "react";
import AddTask from "./components/addTask";
import { Layout, Button, message } from "antd";

import { Amplify } from "aws-amplify";
import config from "./aws-exports";
import { Authenticator } from "@aws-amplify/ui-react";
import { listTodos } from "./graphql/queries";
import Task from "./components/task";
import { generateClient } from "aws-amplify/api";

const client = generateClient();

Amplify.configure(config);

const { Header, Content, Footer } = Layout;

function App() {
  const [messageApi, contextHolder] = message.useMessage();
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    try {
      const allTasks = await client.graphql({ query: listTodos });
      
      const listTasks = allTasks.data.listTodos.items;
      setTasks(listTasks);
    } catch (error) {
      messageApi.open({
        type: "error",
        content: "error fetching tasks",
      });
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <>
      {contextHolder}
      <Layout>
        <Authenticator>
          {({ signOut, user }) => (
            <div>
              <Header
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <h1 style={{ color: "white" }}>
                  My Task Tracker - {user.username}
                </h1>
                <Button type="primary" onClick={signOut}>
                  Cerrar Session
                </Button>
              </Header>
              <Content style={{ height: "490px" }}>
                <Task data={tasks.filter((data)=>data.owner=user.username)} />
              </Content>
              <Footer>
                <AddTask />
              </Footer>
            </div>
          )}
        </Authenticator>
      </Layout>
    </>
  );
}

export default App;
