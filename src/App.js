import React, { useState } from "react";
import { StatusBar, Dimensions, Button } from "react-native";
import styled, { ThemeProvider } from "styled-components/native";
import PropTypes from "prop-types";
import { TouchableOpacity } from "react-native";

import Input from "./components/Input";
import Task from "./components/Task";
import { theme } from "./theme";

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${(props) => props.theme.background};
  align-items: center;
  justify-content: flex-start;
`;

const Title = styled.Text`
  width: ${({ width }) => width - 40}px;
  height: 60px;
  font-size: 30px;
  color: ${(props) => props.theme.main};
  margin: 20px 20px 0;
  background-color: ${(props) => props.theme.done};
  padding: 5px 10px;
  border-radius: 10px;
  text-align: center;
`;

const List = styled.ScrollView`
  flex: 1;
  width: ${({ width }) => width - 40}px;
`;

const DeleteButton = styled(TouchableOpacity)`
  width: ${({ width }) => width - 40}px;
  padding: 10px;
  background-color: ${(props) => props.theme.background};
  border-radius: 10px;
  align-items: center;
`;

const DeleteButtonText = styled.Text`
  color: white;
  font-size: 30px;
  font-weight: 300;
`;

const App = () => {
  const [newTask, setNewTask] = useState("");
  const [tasks, setTasks] = useState({});
  const [showCompletedTasks, setShowCompletedTasks] = useState(false);

  const h_onChangeText = (text) => setNewTask(text);

  const h_onSubmitEditing = () => {
    const key = Date.now().toString();
    const newTaskObject = {
      [key]: { id: key, text: newTask, completed: false },
    };
    setNewTask("");
    setTasks({ ...tasks, ...newTaskObject });
  };

  const { width } = Dimensions.get("window");

  const h_deleteTask = (id) => {
    const currentTasks = { ...tasks };
    delete currentTasks[id];
    setTasks(currentTasks);
  };

  const h_toggleTask = (id) => {
    const currentTasks = { ...tasks };
    currentTasks[id]["completed"] = !currentTasks[id]["completed"];
    setTasks(currentTasks);
  };

  const h_updateTask = (task) => {
    const currentTasks = { ...tasks };
    currentTasks[task.id] = task;
    setTasks(currentTasks);
  };

  const h_onBlur = () => {
    setNewTask("");
  };

  const toggleShowCompletedTasks = () => {
    setShowCompletedTasks(!showCompletedTasks);
  };

  const h_deleteCompletedTasks = () => {
    const currentTasks = { ...tasks };

    for (const taskId in currentTasks) {
      if (currentTasks[taskId].completed) {
        delete currentTasks[taskId];
      }
    }

    setTasks(currentTasks);
  };

  const filteredTasks = showCompletedTasks
    ? Object.values(tasks).filter((task) => task.completed)
    : Object.values(tasks);

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <StatusBar
          barStyle="light-content"
          backgroundColor={theme.background}
        />
        <Title width={width}>버킷 리스트</Title>
        <Input
          placeholder="     +항목추가"
          value={newTask}
          onChangeText={h_onChangeText}
          onSubmitEditing={h_onSubmitEditing}
          onBlur={h_onBlur}
        />
        <List width={width}>
          {filteredTasks.reverse().map((task) => (
            <Task
              key={task.id}
              task={task}
              deleteTask={h_deleteTask}
              toggleTask={h_toggleTask}
              updateTask={h_updateTask}
            />
          ))}
        </List>
        <DeleteButton onPress={h_deleteCompletedTasks}>
          <DeleteButtonText>완료항목 전체삭제</DeleteButtonText>
        </DeleteButton>
      </Container>
    </ThemeProvider>
  );
};

export default App;
