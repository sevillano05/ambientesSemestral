import "./App.css";
import { useState, useEffect } from "react";

import { Layout, Button, message, Form, Input } from "antd";

import { Amplify } from "aws-amplify";
import config from "./aws-exports";
import { Authenticator } from "@aws-amplify/ui-react";
import { listTodos } from "./graphql/queries";
import { generateClient } from "aws-amplify/api";
import { createTodo } from "./graphql/mutations";
import Task from "./components/task";

const client = generateClient();

Amplify.configure(config);

const { Header, Content, Footer } = Layout;

function App() {
  const [messageApi, contextHolder] = message.useMessage();
  const [tasks, setTasks] = useState([]);

  const handleSubmit = async (values) => {
    try {
      const result = await client.graphql({
        query: createTodo,
        variables: {
          input: {
            taskName: values.task,
            description: values.description,
            state: "completedn't",
            catergory: values.category,
            important: false,
            owner: values.user.username,
          },
        },
      });

      setTasks((prevTasks) => [...prevTasks, result.data.createTodo]);
    } catch (error) {
      messageApi.open({
        type: "error",
        content: "error adding task",
      });
      console.log(error);
    }
  };

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
                <Task
                  data={tasks.filter((data) => (data.owner = user.username))}
                />
              </Content>
              <Footer>
                <Form
                  onFinish={handleSubmit}
                  style={{ display: "flex", justifyContent: "space-evenly" }}
                >
                  <Form.Item
                    name="task"
                    label="new task?"
                    rules={[
                      {
                        required: true,
                        message: "Please input your username!",
                      },
                    ]}
                    initialValue={""}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    name="description"
                    label="Descripcion"
                    initialValue={""}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    name="category"
                    label="Categoria"
                    initialValue={""}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item name="user" initialValue={user}>
                    <Button type="primary" htmlType="submit">
                      submit
                    </Button>
                  </Form.Item>
                </Form>
              </Footer>
            </div>
          )}
        </Authenticator>
      </Layout>
    </>
  );
}

export default App;
