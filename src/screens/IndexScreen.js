/* eslint-disable prettier/prettier */
/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import TaskWrapper from '../components/TaskWrapper';
import {getTodo, postTodo, editTodo} from '../api/instance';
import useTask from '../hooks/useTask';
const IndexScreen = ({navigation}) => {
  const {
    taskList,
    getTodoList,
    setTask,
    task,
    tasksFilter,
    errorMessage,
    isLoading,
    onLoadMore,
    addTaskToTaskList,
    toggleCompletedTask,
  } = useTask();
  return (
    <View style={styles.container}>
      {/** children of View  */}
      <View style={styles.viewOfText}>
        <Text style={styles.title}>Today</Text>
        {errorMessage !== '' && <Text>ERROR API</Text>}
        <TaskWrapper
          navigation={navigation}
          taskList={tasksFilter}
          getTodoList={getTodoList}
          onLoadMore={onLoadMore}
          toggleCompletedTask={toggleCompletedTask}
        />
        {isLoading && <ActivityIndicator style={{marginBottom: 10}} />}
      </View>
      <KeyboardAvoidingView style={styles.containerInput}>
        <TextInput
          placeholder="Input Task"
          style={styles.inputText}
          value={task}
          onChangeText={text =>
            setTask(text)
          } /* to change state of task on text value change */
        />
        <TouchableOpacity style={styles.buttonAdd} onPress={addTaskToTaskList}>
          <Text>+</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    paddingHorizontal: 24,
    paddingVertical: 12,
    flex: 1,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
  },
  viewOfText: {
    flex: 1,
  },
  containerInput: {
    flexDirection: 'row',
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  inputText: {
    borderWidth: 1,
    borderColor: '#000000',
    paddingHorizontal: 16,
    flex: 2,
    marginRight: 8,
  },
  buttonAdd: {
    borderRadius: 100,
    width: 56,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
});
export default IndexScreen;
