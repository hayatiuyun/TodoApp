/* eslint-disable prettier/prettier */
import {useFocusEffect, useIsFocused} from '@react-navigation/native';
import React, {useState, useCallback, useContext} from 'react';
import {Context} from '../context/taskContext';

const useTask = () => {
  const [task, setTask] = useState('');
  const [page, setPage] = useState(1);
  const [errorMessage, setErrorMessage] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const isFocused = useIsFocused();
  console.log(task);

  const {
    state,
    getTodos,
    toggleCompletedTask: toggleCompleteContext,
    postTask,
    loadMore,
  } = useContext(Context);

  const {taskList, tasksFilter} = state;
  const getTodoList = async () => {
    setIsLoading(true);
    getTodos(
      page,
      () => setPage(page + 1),
      () => setIsLoading(false),
    );
  };

  const onLoadMore = () => {
    if (tasksFilter.length <= taskList.length) {
      // if length of taskFilter less than all taskList then do this
      loadMore(page, tasksFilter, taskList, () => setPage(page + 1));
    } else {
      return;
    }
  };

  useFocusEffect(
    useCallback(() => {
      let isActive = false;
      setPage(1);
      if (isFocused) {
        getTodoList();
      }
      return () => {
        isActive = true;
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isFocused]),
  );

  const addTaskToTaskList = async () => {
    setIsLoading(true);
    const regexTask = new RegExp(/\s/g);
    if (task !== '' && regexTask.test(task)) {
      const dataTask = {
        task,
        completed: false,
      };
      postTask(
        dataTask,
        () => setTask(''),
        () => setIsLoading(false),
      );
    }
  };
  console.log(tasksFilter);
  const toggleCompletedTask = async index => {
    setIsLoading(true);
    const taskFilterDup = [...tasksFilter];
    taskFilterDup[index] = {
      ...tasksFilter[index],
      completed: !tasksFilter[index].completed,
    };
    toggleCompleteContext(taskFilterDup[index], () => setIsLoading(false));
  };

  return {
    taskList,
    getTodoList,
    task,
    setTask,
    tasksFilter,
    errorMessage,
    isLoading,
    onLoadMore,
    addTaskToTaskList,
    toggleCompletedTask,
  };
};

export default useTask;
