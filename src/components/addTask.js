import React, { useState } from 'react';
import { DataStore } from '@aws-amplify/datastore';
import { Form, Input, Button } from 'antd';

const AddTask = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newTask = {
      id: Math.random().toString(36).substring(2, 15), // Generate a random ID
      title,
      description,
      completed: false,
    };

    await DataStore.save(newTask);

    setTitle('');
    setDescription('');
  };

  return (

      <Form onFinish={handleSubmit}>
        <Form.Item label="Field A">
            <Input placeholder="input placeholder" onChange={setTitle}/>
        </Form.Item>
       <Form.Item > 
        <Button type="primary" htmlType='submit'>submit</Button>
        
       </Form.Item>
    </Form>




    
    
  );
};

export default AddTask;
