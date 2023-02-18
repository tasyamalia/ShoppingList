import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import IconOnly from './IconOnly';

const Button = ({type, title, onPress, disable, icon}) => {
  if (type === 'icon-only') {
    return <IconOnly icon={icon} onPress={onPress} />;
  }
  if (disable) {
    return (
      <View style={styles.disableBg}>
        <Text style={styles.disableText}>{title}</Text>
      </View>
    );
  }
  return (
    <TouchableOpacity style={styles.container(type)} onPress={onPress}>
      <Text style={styles.text(type)}>{title}</Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  container: () => ({
    backgroundColor: '#4DAC73',
    paddingVertical: 10,
    borderRadius: 10,
  }),
  text: () => ({
    fontSize: 18,
    color: '#FFFFFF',
    textAlign: 'center',
  }),
  disableBg: {
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: '#F4DBE0',
  },
  disableText: {
    fontSize: 18,
    color: '#838383',
    textAlign: 'center',
  },
});
