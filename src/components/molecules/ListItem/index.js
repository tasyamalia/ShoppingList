import React, {useState} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {Button} from '../../atoms';
import CheckBox from '@react-native-community/checkbox';

const ListItem = ({item, onPressCheckBox, onDeleteItem}) => {
  const [toggleCheckBox, setToggleCheckBox] = useState(item.isDone);
  return (
    <View style={styles.container}>
      <CheckBox
        disabled={false}
        value={toggleCheckBox}
        tintColors={{false: '#4DAC73', true: '#4DAC73'}}
        onValueChange={newValue => setToggleCheckBox(newValue)}
        onChange={onPressCheckBox}
      />
      <View style={styles.container_value}>
        <Text style={styles.name(toggleCheckBox, item.description !== '')}>
          {item.name}
        </Text>
        <Text
          isVisible={item.description !== ''}
          style={styles.description(item.description !== '')}>
          {item.description}
        </Text>
      </View>
      <View style={styles.button_delete}>
        <Button
          type={'icon-only'}
          icon={'icon-delete'}
          onPress={onDeleteItem}
        />
      </View>
    </View>
  );
};
export default ListItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    margin: 1,
    backgroundColor: '#FFFFFF',
    borderColor: '#4DAC73',
    borderWidth: 1,
    borderRadius: 15,
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginBottom: 10,
  },
  container_value: {
    flex: 1,
    flexDirection: 'column',
  },
  name: (isDone, isDescVisible) => ({
    color: '#000000',
    fontSize: 16,
    fontWeight: 'bold',
    marginStart: 10,
    textDecorationLine: isDone ? 'line-through' : 'none',
    marginTop: isDescVisible ? 0 : 6,
  }),
  description: isDescVisible => ({
    color: '#808080',
    fontSize: isDescVisible ? 12 : 0,
    fontWeight: 'normal',
    marginStart: 10,
  }),
  button_delete: {
    marginTop: 8,
  },
});
