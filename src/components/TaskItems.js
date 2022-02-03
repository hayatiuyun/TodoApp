/* eslint-disable prettier/prettier */
import React from 'react';
import {Text, StyleSheet, View, TouchableOpacity} from 'react-native';

const TaskItems = ({item, index, navigation, toggleCompletedTask}) => {
  return (
    <View style={styles.container}>
      <View style={styles.viewTask}>
        <TouchableOpacity
          style={item.completed ? styles.squareCompleted : styles.square}
          onPress={() => toggleCompletedTask(index)}
        />
        <Text>{item.task}</Text>
      </View>
      <View style={styles.bullet} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 12,
    backgroundColor: '#F8F4FD',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: 'rgba(186, 177, 182, 1)',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.5,
    shadowRadius: 8.3,
    elevation: 13,
  },
  square: {
    width: 24,
    height: 24,
    borderWidth: 1,
    borderRadius: 24,
    borderColor: '#333333',
    marginRight: 8,
  },
  squareCompleted: {
    width: 24,
    height: 24,
    backgroundColor: '#EA9210',
    borderRadius: 24,
    marginRight: 8,
  },
  viewTask: {
    flex: 1,
    flexDirection: 'row',
  },
  bullet: {
    borderColor: '#EA9210',
    borderRadius: 8,
    width: 8,
    height: 8,
    borderWidth: 1,
  },
});

export default TaskItems;
