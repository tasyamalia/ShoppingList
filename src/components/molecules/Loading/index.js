import React from 'react';
import {StyleSheet, Text, View, ActivityIndicator} from 'react-native';

const Loading = () => {
  return (
    <View style={styles.wrapper}>
      <ActivityIndicator size="large" />
      <Text style={styles.text}>Loading...</Text>
    </View>
  );
};
export default Loading;
const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    position: 'absolute',
    backgroundColor: '#E2E2E2',
    opacity: 0.25,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%',
  },
  text: {
    fontSize: 18,
    color: '#000000',
    marginTop: 16,
  },
});
