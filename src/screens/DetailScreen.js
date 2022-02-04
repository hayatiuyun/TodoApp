/* eslint-disable prettier/prettier */
import React, {useState, useContext} from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  TextInput,
} from 'react-native';
import {Context} from '../context/taskContext';

const DetailScreen = ({route, navigation}) => {
  // const {toggleCompletedTask, tasksFilter} = useTask();
  const {state, toggleCompletedTask, deleteTask, editTask} =
    useContext(Context);
  const {item} =
    route.params; /* get params of route. params is passed from previous screen */
  const [taskDetail, setTaskDetail] = useState(item);
  const [titleTask, setTitleTask] = useState(item.task);

  const completedTask = () => {
    const updateTaskDetail = {
      ...taskDetail,
      completed: !taskDetail.completed,
    };
    toggleCompletedTask(updateTaskDetail, () =>
      setTaskDetail(updateTaskDetail),
    );
  };

  const onChangeTitleTask = text => {
    setTitleTask(text);
    // setTaskDetail({task: text, ...taskDetail});
  };

  const editTitleTask = () => {
    const data = {
      ...taskDetail,
      task: titleTask,
    };
    console.log('call context editTask', data, titleTask);
    editTask(data, () => setTaskDetail(data));
  };

  const onDelete = () => {
    Alert.alert(
      'Delete Todo ' + taskDetail.task,
      'Are you sure to delete this todo?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => deleteTask(taskDetail, () => navigation.goBack()),
        },
      ],
    );
  };
  return (
    <View style={styles.container}>
      {/*
       * Parent of Components Screen
       * View with padding horizontal 24 & vertical 32
       */}

      {/* Close Button Wrapper
       * Flex end and width 100% for positioning to the right of screen */}
      <View style={styles.closeWrapper}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          //* navigation.goBack() for navigating to previous route or screen */
          style={styles.closeButton}>
          <Text>X</Text>
        </TouchableOpacity>
      </View>

      {/* title of task. style font size 24, and bold. */}
      {/* <Text style={styles.taskTitle}>{taskDetail.task}</Text> */}
      <KeyboardAvoidingView>
        <TextInput
          value={titleTask}
          style={styles.taskTitle}
          onChangeText={onChangeTitleTask}
          onSubmitEditing={editTitleTask}
        />
      </KeyboardAvoidingView>
      {/* View or div or ViewGroup of status task.
       * set flex = 2 to make height 2x bigger than other item of parent flex */}
      <View style={styles.wrapperStatus}>
        {/*
         * Children of wrapperStatus
         */}
        <Text>Status</Text>

        {/* Button Complete or Uncomplete.  */}
        <TouchableOpacity
          style={styles.toggleCompletedButton}
          onPress={completedTask}>
          {/* Bullet complete.
           * if property completed of item is true, then bullet has backgroundColor #EA9210
           * if property completed of item is false, then bullet has no backgroundColor style property, but has border property
           *  */}
          <View
            style={{
              ...styles.bullet,
              ...(taskDetail.completed && styles.bulletCompleted),
            }}
          />

          {/* Status task text.
           * if property completed of item is true then Text will display "Completed"
           * if property completed of item is not true, then Text will display "Ongoing"
           */}
          <Text>{taskDetail.completed ? 'Completed' : 'Ongoing'}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{marginTop: 24}} onPress={onDelete}>
          <Text style={{color: 'red'}}>Delete Task</Text>
        </TouchableOpacity>
      </View>
      {/* Button Done. Position in bottom of screen. positioning with flex end */}
      <TouchableOpacity onPress={completedTask} style={styles.doneButton}>
        <Text>Done</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 32,
    backgroundColor: '#F6F6F6',
  },
  closeWrapper: {
    width: '100%',
    display: 'flex',
    alignItems: 'flex-end',
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 100,
    display: 'flex',
    borderWidth: 1,
    borderColor: '#888',
    alignItems: 'center',
    justifyContent: 'center',
  },
  taskTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  wrapperStatus: {
    marginVertical: 24,
    flex: 2,
  },
  toggleCompletedButton: {display: 'flex', flexDirection: 'row', marginTop: 8},
  bullet: {
    width: 24,
    height: 24,
    borderRadius: 100,
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#888888',
  },
  bulletCompleted: {
    backgroundColor: '#EA9210',
    borderWidth: 0,
  },
  doneButton: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: '#EA9210',
    paddingVertical: 12,
    borderRadius: 12,
  },
});

export default DetailScreen;
