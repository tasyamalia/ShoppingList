import React from 'react';
import {StyleSheet, View, ScrollView, Image, Text} from 'react-native';
import {Input, Button, Gap} from '../../components';
import {useDispatch} from 'react-redux';
import {useForm} from '../../utils';
import {storeData} from '../../utils';
import {createUserWithEmailAndPassword} from 'firebase/auth';
import {Auth, RealDatabase} from '../../config/Fire';
import {ILLogo} from '../../assets';
import {ref, set} from 'firebase/database';

const Register = ({navigation}) => {
  const [form, setForm] = useForm({
    fullName: '',
    email: '',
    password: '',
    error: false,
    errMsg: '',
  });
  const dispatch = useDispatch();

  const onContinue = () => {
    if (form.name === '' || form.password === '' || form.fullName === '') {
      setForm('error', true);
      setForm('errMsg', 'Please fill out all fields');
    } else {
      setForm('error', false);
      setForm('errMsg', '');
      console.log(form);
      dispatch({type: 'SET_LOADING', value: true});
      createUserWithEmailAndPassword(Auth, form.email, form.password)
        .then(async success => {
          dispatch({type: 'SET_LOADING', value: false});
          navigation.replace('Home');
          const data = {
            fullName: form.fullName,
            email: form.email,
            uid: success.user.uid,
          };
          storeData('user', data);
          storeData('user_uid', success.user.uid);
          set(ref(RealDatabase, `users/${success.user.uid}/`), {
            fullName: form.fullName,
            email: form.email,
            uid: success.user.uid,
          });
        })
        .catch(error => {
          const errorMessage = error.message;
          dispatch({type: 'SET_LOADING', value: false});
          console.log(errorMessage);
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
          <Gap height={10} />
          <Text style={styles.title}>Register Account</Text>
          <Gap height={20} />
          <Input
            label="Full Name"
            value={form.fullName}
            onChangeText={value => setForm('fullName', value)}
          />
          <Gap height={24} />
          <Input
            label="Email "
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
          <Button title="Register" onPress={onContinue} />
          <Text style={styles.text_copyright}>
            Copyright @Tasya Amalia Salsabila
          </Text>
        </ScrollView>
      </View>
    </>
  );
};

export default Register;

const styles = StyleSheet.create({
  page: {
    paddingHorizontal: 40,
    backgroundColor: '#FFFFFF',
    flex: 1,
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
  title: {
    fontSize: 20,
    color: '#4DAC73',
    maxWidth: 153,
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
