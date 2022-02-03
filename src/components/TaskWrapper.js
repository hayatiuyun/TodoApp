/* eslint-disable prettier/prettier */
import React from 'react';
import {
  View,
  FlatList,
  TouchableOpacity,
  Text,
  StyleSheet,
  Dimensions,
} from 'react-native';
import TaskItems from './TaskItems';

const TaskWrapper = ({
  navigation,
  taskList,
  getTodoList,
  onLoadMore,
  toggleCompletedTask,
}) => {
  const FooterList = () => {
    return (
      <View style={styles.viewLoadMore}>
        <TouchableOpacity style={styles.buttonLoadMore} onPress={onLoadMore}>
          <Text style={styles.textLoadMore}>Load More</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const RenderItem = ({item, index}) => {
    return (
      <TouchableOpacity onPress={() => navigation.navigate('Detail', {item})}>
        <TaskItems
          item={item}
          toggleCompletedTask={toggleCompletedTask}
          index={index}
        />
      </TouchableOpacity>
    );
  };
  const styles = StyleSheet.create({
    flatListView: {
      maxHeight: Dimensions.get('screen').height - 320,
    },
    buttonLoadMore: {
      backgroundColor: '#EA921089',
      paddingHorizontal: 8,
      paddingVertical: 4,
    },
    textLoadMore: {textAlign: 'center', fontWeight: 'bold', color: '#000000'},
    viewLoadMore: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
  return (
    <View>
      <FlatList
        data={taskList}
        keyExtractor={item => item._id}
        renderItem={RenderItem} //* RenderItem */
        ListFooterComponent={FooterList}
        style={styles.flatListView}
        initialNumToRender={10}
        maxToRenderPerBatch={10}
      />
    </View>
  );
};

export default TaskWrapper;
