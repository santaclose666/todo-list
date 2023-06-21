import React from 'react';
import AddEdit from '../components/AddEdit';
import {useRoute} from '@react-navigation/native';

const Edit = () => {
  const route = useRoute();
  const {item} = route.params;

  const title = item.todoName;
  const content = item.content;

  return <AddEdit name={'EDIT TASK'} taskTitle={title} taskContent={content} />;
};

export default Edit;
