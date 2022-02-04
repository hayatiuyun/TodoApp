/* eslint-disable prettier/prettier */
import createDataContext from './createDataContext';
import {getTodo, postTodo, editTodo, deleteTodo} from '../api/instance';

const initialState = {
  taskList: [],
  tasksFilter: [],
};

const taskReducer = (state, action) => {
  switch (action.type) {
    case 'GET-TODO':
      return {
        ...state,
        taskList: action.payload.taskList,
        tasksFilter: action.payload.tasksFilter,
      };
    case 'EDIT-TODO':
      let dupTaskList = [...state.taskList];
      const indexTaskList = findIdOfArray(state.taskList, action.payload._id);
      dupTaskList[indexTaskList] = action.payload;
      let duptasksFilter = [...state.tasksFilter];
      const indextasksFilter = findIdOfArray(
        state.tasksFilter,
        action.payload._id,
      );
      duptasksFilter[indextasksFilter] = action.payload;
      console.log(indexTaskList, indextasksFilter);
      return {
        ...state,
        taskList: dupTaskList,
        tasksFilter: duptasksFilter,
      };
    case 'POST-TODO':
      return {
        ...state,
        taskList: [...state.taskList, action.payload],
        tasksFilter: [action.payload, ...state.tasksFilter],
      };
    case 'LOAD-MORE':
      return {
        ...state,
        tasksFilter: action.payload.tasksFilter,
      };
    case 'DELETE-TODO':
      return {
        ...state,
        tasksFilter: state.tasksFilter.filter(
          value => value !== action.payload,
        ),
        taskList: state.taskList.filter(value => value !== action.payload),
      };
    default:
      return state;
  }
};

const findIdOfArray = (arr, _id) => {
  return arr.findIndex(item => item._id === _id);
};

const getTodos = dispatch => async (page, setPage, setIsLoading) => {
  await getTodo()
    .then(res => {
      const dataFilterFiveAmount = res.data.filter(
        (value, index) => index < 5 * page,
      );
      setPage();
      dispatch({
        type: 'GET-TODO',
        payload: {
          taskList: res.data,
          tasksFilter: dataFilterFiveAmount,
        },
      });
    })
    .finally(() => setIsLoading());
};

const postTask = dispatch => async (data, setTask, setIsLoading) => {
  await postTodo(data)
    .then(res => {
      dispatch({
        type: 'POST-TODO',
        payload: res.data,
      });
      setTask();
    })
    .finally(() => {
      setIsLoading();
    });
};

const loadMore = dispatch => async (page, tasksFilter, taskList, setPage) => {
  console.log(taskList);
  const taskWillDisplay = taskList.filter(
    (value, index) => index < 5 * page && !tasksFilter.includes(value),
  ); // filter taskList and show task another 5 items of taskList and the items is not included on taskFilter
  console.log(page, taskWillDisplay);
  if (taskWillDisplay.length > 0) {
    dispatch({
      type: 'LOAD-MORE',
      payload: {
        tasksFilter: [...tasksFilter, ...taskWillDisplay],
      },
    });
    setPage();
  }
};

const toggleCompletedTask = dispatch => async (data, setIsLoading) => {
  await editTodo(data)
    .then(res => {
      dispatch({
        type: 'EDIT-TODO',
        payload: res.data,
      });
    })
    .finally(() => {
      setIsLoading();
    });
};

const deleteTask = dispatch => async (data, doneDelete) => {
  await deleteTodo(data)
    .then(res => {
      dispatch({
        type: 'DELETE-TODO',
        payload: data,
      });
    })
    .finally(() => doneDelete());
};

const editTask = dispatch => async (data, cb) => {
  await editTodo(data).then(res => {
    console.log('UPDATING');
    dispatch({
      type: 'EDIT-TODO',
      payload: res.data,
    });
    cb();
  });
};

export const {Provider, Context} = createDataContext(
  taskReducer,
  {getTodos, toggleCompletedTask, postTask, loadMore, deleteTask, editTask},
  initialState,
);
