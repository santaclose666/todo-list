import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  Alert,
  FlatList,
} from 'react-native';
import {createTable, getAllTask, DelTask} from '../../dbservices';
import {useNavigation, useIsFocused} from '@react-navigation/native';

const Home = () => {
  const [todoArr, setTodoArr] = useState([]);
  const [count, setCount] = useState(0);

  const navigation = useNavigation();
  const isFocused = useIsFocused();

  const handleAdd = () => {
    navigation.navigate('Add');
  };

  const handleEdit = (item) => {
    navigation.navigate('Edit', {item: item});
  };

  const handleDelete = (item) => {
    Alert.alert('Confirmation!', 'Are you sure?', [
      {
        text: 'Yes',
        onPress: () => {
          const title = item.todoName;
          DelTask(title);
          setCount(count + 1);
        },
      },
      {
        text: 'No',
        style: 'cancel',
      },
    ]);
  };

  useEffect(() => {
    if (isFocused) {
      createTable();
      getAllTask()
        .then((data) => {
          setTodoArr(data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [isFocused, count]);

  return (
    <View style={styles.mainContainer}>
      <View style={styles.appNameContainer}>
        <Text style={styles.appNameText}>Todo List</Text>
      </View>

      <View style={styles.containerAllTask}>
        <FlatList
          data={todoArr}
          renderItem={({item, index}) => (
            <View style={styles.containerEachTask}>
              <View style={styles.indexContainer}>
                <Text
                  style={[
                    styles.indexText,
                    index % 2 === 0 ? styles.greenTask : styles.blueTask,
                  ]}>
                  {index + 1}
                </Text>
              </View>
              <View style={styles.taskContainer}>
                <TouchableOpacity
                  onPress={() => {
                    handleEdit(item);
                  }}>
                  <Text style={styles.TaskText}>{item.todoName}</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.btnContainer}>
                <TouchableOpacity onPress={() => handleEdit(item)}>
                  <Image
                    style={styles.editImg}
                    source={require('../../assets/icon/edit.png')}
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleDelete(item)}>
                  <Image
                    style={styles.delImg}
                    source={require('../../assets/icon/delete.png')}
                  />
                </TouchableOpacity>
              </View>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>

      <View style={styles.addTaskContainer}>
        <View style={styles.btnAddContainer}>
          <TouchableOpacity onPress={handleAdd}>
            <Image
              style={styles.addImg}
              source={require('../../assets/icon/add.png')}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#d5f5ff',
  },

  appNameContainer: {
    flex: 1,
  },

  appNameText: {
    fontSize: 22,
    fontWeight: 'bold',
    marginHorizontal: 20,
    color: '#277aae',
    paddingTop: 10,
  },

  containerAllTask: {
    flex: 10,
  },

  containerEachTask: {
    marginVertical: 8,
    marginHorizontal: 20,
    borderWidth: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    borderColor: 'rgba(255, 255, 255, 0.5)',
  },

  indexContainer: {
    marginLeft: 10,
  },

  indexText: {
    fontSize: 16,
    borderColor: 'rgba(255, 255, 255, 0.5)',
    alignItems: 'center',
    borderRadius: 10,
    padding: 10,
    paddingHorizontal: 20,
    fontWeight: 'bold',
    color: '#fff',
  },

  greenTask: {
    backgroundColor: '#4cef48',
  },

  blueTask: {
    backgroundColor: '#49d0ef',
  },

  editTaskContainer: {
    borderWidth: 1,
    borderColor: '#d5d6db',
    borderRadius: 30,
    width: 160,
    height: 40,
  },

  inputEdit: {
    alignItems: 'center',
  },

  taskContainer: {
    marginHorizontal: 16,
  },

  TaskText: {
    fontSize: 16,
    borderColor: 'rgba(255, 255, 255, 0.5)',
    alignItems: 'center',
    padding: 10,
  },

  btnContainer: {
    flexDirection: 'row',
    marginTop: 5,
  },

  editImg: {
    width: 30,
    height: 30,
  },

  delImg: {
    width: 30,
    height: 30,
    marginHorizontal: 3,
  },

  addTaskContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
  },

  btnAddContainer: {
    flex: 1,
    marginHorizontal: 6,
    alignItems: 'flex-end',
  },

  addImg: {
    width: 55,
    height: 55,
  },
});

export default Home;
