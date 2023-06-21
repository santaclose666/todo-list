import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {addTask, updateTask} from '../../dbservices';

const AddEdit = ({name, taskTitle, taskContent}) => {
  const rootTitle = taskTitle;
  const [title, setTitle] = useState(taskTitle);
  const [content, setContent] = useState(taskContent);

  const navigation = useNavigation();

  const handleSave = () => {
    if (title.length === 0 || content.length === 0) {
      return Alert.alert('Missing value!');
    }

    if (name === 'ADD TASK') {
      addTask(title, content)
        .then((data) => {
          console.log(data);
          if (data === false) {
            return Alert.alert('Task is exist already!');
          } else {
            navigation.navigate('Home');
          }
        })
        .catch((err) => {
          return console.log(err);
        });
    } else {
      updateTask(rootTitle, title, content)
        .then((data) => {
          if (data === false) {
            return Alert.alert('Task is exist already!');
          } else {
            navigation.navigate('Home');
          }
        })
        .catch((err) => {
          return console.log(err);
        });
    }
  };

  const handleBack = () => {
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <View style={styles.backBtnContainer}>
        <TouchableOpacity onPress={handleBack}>
          <Image
            source={require('../../assets/icon/back.png')}
            style={styles.backBtn}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.nameContainer}>
        <Text style={styles.nameText}>{name}</Text>
      </View>

      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>Title:</Text>
        <TextInput
          style={styles.titleInput}
          placeholder="Type your title"
          onChangeText={(e) => setTitle(e)}
          value={title}
        />
      </View>

      <View style={styles.contentContainer}>
        <Text style={styles.contentText}>Content:</Text>
        <TextInput
          style={styles.contentInput}
          placeholder="Type your content"
          multiline={true}
          onChangeText={(e) => setContent(e)}
          value={content}
        />
      </View>

      <View style={styles.btnContainer}>
        <View style={styles.saveBtnContainer}>
          <TouchableOpacity onPress={handleSave} style={styles.touchSave}>
            <Text style={styles.save}>Save</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.cancleBtnContainer}>
          <TouchableOpacity onPress={handleBack} style={styles.touchCancle}>
            <Text style={styles.cancle}>Cancle</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d5f5ff',
  },

  backBtnContainer: {
    flex: 1,
  },

  backBtn: {
    width: 80,
    height: 80,
  },

  nameContainer: {
    flex: 1,
    alignItems: 'center',
  },

  nameText: {
    fontSize: 28,
    fontWeight: 'bold',
  },

  titleContainer: {
    flex: 2,
    alignItems: 'center',
  },

  titleText: {
    fontSize: 18,
    fontWeight: 'bold',
  },

  titleInput: {
    borderWidth: 1,
    borderRadius: 16,
    backgroundColor: '#fff',
    width: '80%',
  },

  contentContainer: {
    flex: 5,
    alignItems: 'center',
  },

  contentText: {
    fontSize: 18,
    fontWeight: 'bold',
  },

  contentInput: {
    borderWidth: 1,
    borderRadius: 16,
    backgroundColor: '#fff',
    width: '80%',
    height: '80%',
  },

  btnContainer: {
    flex: 2,
    flexDirection: 'row',
  },

  saveBtnContainer: {
    flex: 1,
  },

  touchSave: {
    marginHorizontal: 16,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'blue',
    padding: 16,
    borderRadius: 30,
  },

  save: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
  },

  cancleBtnContainer: {
    flex: 1,
  },

  touchCancle: {
    marginHorizontal: 16,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'pink',
    padding: 16,
    borderRadius: 30,
  },

  cancle: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default AddEdit;
