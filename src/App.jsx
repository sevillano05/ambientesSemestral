import "./App.css";
import { useState, useEffect } from "react";
import AddTask from "./components/addTask";
import { Layout, Button, message } from "antd";

import { Amplify } from "aws-amplify";
import awsconfig from "./aws-exports";
import { Authenticator } from "@aws-amplify/ui-react";
import { listTodos } from "./graphql/queries";
import Task from "./components/task";
import { generateClient } from "aws-amplify/api";

const clientTasks = generateClient();

Amplify.configure(awsconfig);

const { Header, Content, Footer } = Layout;

function App() {
  const [messageApi, contextHolder] = message.useMessage();
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    try {
      const allTasks = await clientTasks.graphql({ query: listTodos });
      const listTasks = allTasks.data.listTodos.items;
      setTasks(listTasks);
    } catch (error) {
      messageApi.open({
        type: "error",
        content: "error fetching tasks: " + error.errors[0].message,
      });
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <>
      {contextHolder}
      <Layout>
        <Content
          style={{
            alignSelf: "center ",
            height: "715px",
            alignContent: "center",
          }}
        >
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
                  <h1 style={{ color: "white" }}>My Task Tracker - {user.username}</h1>
                  <Button type="primary" onClick={signOut}>
                    Cerrar Session
                  </Button>
                </Header>
                <Content style={{ height: "490px" }}>
                  <div className="task-list">
                    <h2>Tasks</h2>
                    {tasks.map((task) => (
                      <Task key={task.id} task={task} />
                    ))}
                  </div>
                </Content>
                <Footer>
                  <AddTask />
                </Footer>
              </div>
            )}
          </Authenticator>
        </Content>
      </Layout>
    </>
  );
}

export default App;
