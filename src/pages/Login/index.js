import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {Input, Button, Link, Gap} from '../../components';
import {storeData, useForm} from '../../utils';
import {ScrollView} from 'react-native-gesture-handler';
import {useDispatch} from 'react-redux';
import {signInWithEmailAndPassword} from 'firebase/auth';
import {Auth} from '../../config/Fire';
import {ILLogo} from '../../assets';

const Login = ({navigation}) => {
  const [form, setForm] = useForm({
    email: '',
    password: '',
    error: false,
    errMsg: '',
  });
  const dispatch = useDispatch();

  const login = () => {
    if (form.name === '' || form.password === '') {
      setForm('error', true);
      setForm('errMsg', 'Please fill out all fields');
    } else {
      setForm('error', false);
      setForm('errMsg', '');
      console.log('form: ', form);
      dispatch({type: 'SET_LOADING', value: true});
      signInWithEmailAndPassword(Auth, form.email, form.password)
        .then(res => {
          console.log('success: ', res);
          dispatch({type: 'SET_LOADING', value: false});
          storeData('user_uid', res.user.uid);
          storeData('user', res.user);
          navigation.replace('Home');
        })
        .catch(err => {
          console.log('error: ', err);
          dispatch({type: 'SET_LOADING', value: false});
        });
    }
  };
  return (
    <>
      <View style={styles.page}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Gap height={40} />
          <View style={styles.container_image}>
            <Image source={ILLogo} style={styles.banner_image} />
          </View>
          <Gap height={20} />
          <Text style={styles.title}>Login</Text>
          <Input
            label="Email"
            value={form.email}
            onChangeText={value => setForm('email', value)}
          />
          <Gap height={24} />
          <Input
            label="Password"
            value={form.password}
            onChangeText={value => setForm('password', value)}
            secureTextEntry
          />
          <Gap isVisible={form.error} height={20} />
          <Text isVisible={form.error} style={styles.text_alert}>
            {form.errMsg}
          </Text>
          <Gap height={form.error ? 40 : 20} />
          <Button title="Sign In" onPress={login} />
          <Gap height={30} />
          <Link
            title="Create New Account"
            size={16}
            align="center"
            onPress={() => navigation.navigate('Register')}
          />
          <Text style={styles.text_copyright}>
            Copyright @Tasya Amalia Salsabila
          </Text>
        </ScrollView>
      </View>
    </>
  );
};

export default Login;

const styles = StyleSheet.create({
  page: {
    paddingHorizontal: 40,
    backgroundColor: '#FFFFFF',
    flex: 1,
  },
  title: {
    fontSize: 20,
    color: '#4DAC73',
    marginTop: 40,
    marginBottom: 40,
    maxWidth: 153,
  },
  container_image: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  banner_image: {
    width: 150,
    height: 100,
    resizeMode: 'contain',
  },
  text_alert: {
    fontSize: 12,
    color: '#FF2C2C',
    alignSelf: 'center',
  },
  text_copyright: {
    fontSize: 12,
    color: '#808080',
    alignSelf: 'center',
    marginTop: 40,
  },
});
