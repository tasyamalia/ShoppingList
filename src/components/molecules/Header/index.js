import React from 'react';
import {StyleSheet, View, Image} from 'react-native';
import {ILLogoWhite} from '../../../assets';

const Header = () => {
  return (
    <View>
      <View style={styles.container}>
        <View style={styles.container_image}>
          <Image source={ILLogoWhite} style={styles.banner_image} />
        </View>
      </View>
    </View>
  );
};
export default Header;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: '#4DAC73',
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    color: '#4DAC73',
    flex: 1,
    textTransform: 'capitalize',
  },
  gapView: {
    backgroundColor: '#D9D9D9',
  },
  container_image: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  banner_image: {
    width: 100,
    height: 20,
    resizeMode: 'contain',
  },
});
