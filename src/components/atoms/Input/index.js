import React, {useState} from 'react';
import {StyleSheet, Text, View, TextInput} from 'react-native';

const Input = ({label, value, onChangeText, secureTextEntry, disable}) => {
  const [border, setBorder] = useState('#D8D8D8');
  const onFocusForm = () => {
    setBorder('#4DAC73');
  };
  const onBlurForm = () => {
    if (value !== '') {
      setBorder('#4DAC73');
    } else {
      setBorder('#D9D9D9');
    }
  };
  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input(border)}
        onFocus={onFocusForm}
        onBlur={onBlurForm}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        editable={!disable}
        selectTextOnFocus={!disable}
      />
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  input: border => ({
    borderWidth: 1,
    borderColor: border,
    borderRadius: 10,
    padding: 12,
    color: '#000000',
  }),
  label: {
    fontSize: 16,
    color: '#000000',
    marginBottom: 6,
  },
});
