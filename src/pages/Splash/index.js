import React, {useEffect} from 'react';
import {StyleSheet, View, Image} from 'react-native';
import {ILLogo} from '../../assets';
import {onAuthStateChanged} from 'firebase/auth';
import {Auth} from '../../config/Fire';
import {storeData} from '../../utils/localstorage';

const Splash = ({navigation}) => {
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(Auth, user => {
      setTimeout(async () => {
        if (user) {
          const uid = user.uid;
          storeData('user_uid', uid);
          storeData('user', user);
          navigation.replace('Home');
        } else {
          // User is signed out
          navigation.replace('Login');
        }
      }, 3000);
    });
    return () => unsubscribe();
  }, [navigation]);
  return (
    <View style={styles.page}>
      <Image source={ILLogo} style={styles.banner_image} />
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  banner_image: {
    width: 200,
    height: 130,
    resizeMode: 'contain',
  },
});
