/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  Alert,
  View,
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from 'react-native';
import {useForm} from '../../utils';
import Header from '../../components/molecules/Header';
import {Input, ListItem} from '../../components';
import Modal from 'react-native-modal';
import {Button, Gap} from '../../components/atoms';
import {RealDatabase, Auth} from '../../config/Fire';
import {getData} from '../../utils';
import {child, get, ref, push, update, remove} from 'firebase/database';
import {useDispatch} from 'react-redux';
import {signOut} from 'firebase/auth';

const Home = ({navigation}) => {
  const [dataUser, setDataUser] = useState([]);
  const [firstHitDataUser, setHitDataUser] = useState(true);
  const [hitShopList, setHitShopList] = useState(true);
  const [isModal, setIsModal] = useState(false);
  const [form, setForm] = useForm({
    name: '',
    description: '',
    error: false,
    errMsg: '',
  });
  const [shopList, setShopList] = useState([]);
  const dispatch = useDispatch();

  //LOGOUT
  const handleLogout = () => {
    dispatch({type: 'SET_LOADING', value: true});
    signOut(Auth)
      .then(() => {
        navigation.replace('Login');
        dispatch({type: 'SET_LOADING', value: false});
      })
      .catch(_error => {
        console.log(_error);
        dispatch({type: 'SET_LOADING', value: false});
      });
  };
  //GET ALL DATA LIST
  const handleGetDataList = async () => {
    const user_uid = await getData('user_uid');
    const dbRef = ref(RealDatabase);
    dispatch({type: 'SET_LOADING', value: true});
    get(child(dbRef, `shopping/${user_uid}/lists`))
      .then(async snapshot => {
        if (snapshot.exists()) {
          const oldData = snapshot.val();
          const datas = [];
          const promises = await Object.keys(oldData).map(key => {
            datas.push({
              id: oldData[key].id,
              name: oldData[key].name,
              description: oldData[key].description,
              isDone: oldData[key].isDone,
            });
          });
          await Promise.all(promises);
          setShopList(datas);
          dispatch({type: 'SET_LOADING', value: false});
        } else {
          setShopList([]);
          console.log('No data list available');
          dispatch({type: 'SET_LOADING', value: false});
        }
        if (firstHitDataUser) {
          getDataUser();
        }
        setHitShopList(false);
      })
      .catch(error => {
        console.error(error);
        dispatch({type: 'SET_LOADING', value: false});
      });
  };
  //ADD LIST
  const handleAddShopList = async () => {
    if (form.name === '') {
      setForm('error', true);
      setForm('errMsg', 'at least fill in the name');
    } else {
      setForm('error', false);
      setForm('errMsg', '');
      dispatch({type: 'SET_LOADING', value: true});
      const user_uid = await getData('user_uid');
      const newPostKey = push(child(ref(RealDatabase), 'lists')).key;
      const postData = {
        id: newPostKey,
        name: form.name,
        description: form.description,
        isDone: false,
      };
      const updates = {};
      updates[`shopping/${user_uid}/lists/${newPostKey}`] = postData;
      update(ref(RealDatabase), updates);
      closeModal();
      dispatch({type: 'SET_LOADING', value: false});
      setHitShopList(true);
    }
  };
  //UPDATE LIST
  const handleUpdateList = async item => {
    dispatch({type: 'SET_LOADING', value: true});
    const user_uid = await getData('user_uid');
    const postData = {
      id: item.id,
      name: item.name,
      description: item.description,
      isDone: !item.isDone,
    };
    const updates = {};
    updates[`shopping/${user_uid}/lists/${item.id}`] = postData;

    update(ref(RealDatabase), updates);
    dispatch({type: 'SET_LOADING', value: false});
    setHitShopList(true);
  };
  //DELETE ITEM LIST
  const handleDeleteItem = async item => {
    dispatch({type: 'SET_LOADING', value: true});
    const user_uid = await getData('user_uid');
    remove(ref(RealDatabase, `shopping/${user_uid}/lists/${item.id}`));
    dispatch({type: 'SET_LOADING', value: false});
    setHitShopList(true);
  };
  //ALERT DELETE ITEM
  const alertDeleteItem = item => {
    Alert.alert('', 'Are you sure you want to delete this list?', [
      {
        text: 'Cancel',
        onPress: () => null,
        style: 'cancel',
      },
      {
        text: 'YES',
        onPress: () => {
          handleDeleteItem(item);
        },
      },
    ]);
  };
  //ALERT LOGOUT
  const alertLogout = item => {
    Alert.alert('', 'Are you sure you want to logout?', [
      {
        text: 'Cancel',
        onPress: () => null,
        style: 'cancel',
      },
      {
        text: 'YES',
        onPress: () => {
          handleLogout();
        },
      },
    ]);
  };
  //SHOW MODAL ADD LIST
  const showModal = () => {
    setForm('reset');
    setIsModal(true);
  };
  //CLOSE MODAL ADD LIST
  const closeModal = () => {
    setIsModal(false);
  };
  //GET DATA USER
  const getDataUser = async () => {
    dispatch({type: 'SET_LOADING', value: true});
    const user_uid = await getData('user_uid');
    const dbRef = ref(RealDatabase);
    get(child(dbRef, `users/${user_uid}`))
      .then(snapshot => {
        if (snapshot.exists()) {
          setDataUser(snapshot.val());
          setHitDataUser(false);
          dispatch({type: 'SET_LOADING', value: false});
        } else {
          console.log('No data available');
          dispatch({type: 'SET_LOADING', value: false});
        }
      })
      .catch(error => {
        console.error(error);
        dispatch({type: 'SET_LOADING', value: false});
      });
  };
  //REFRESH DATA LIST
  useEffect(() => {
    handleGetDataList();
  }, [hitShopList]);
  return (
    <View style={styles.page}>
      <Header />
      <View style={styles.container_name}>
        <Text style={styles.text_fullName}>Hi, {dataUser.fullName}</Text>
        <View style={styles.btnLogout}>
          <Button title={'Logout'} onPress={() => alertLogout()} />
        </View>
      </View>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
        }}
        style={styles.scrollView}
        keyboardShouldPersistTaps="handled">
        <View style={styles.tasksWrapper}>
          <View style={styles.items}>
            {shopList.map((item, index) => {
              return (
                <ListItem
                  item={item}
                  key={index}
                  onPressCheckBox={() => handleUpdateList(item)}
                  onDeleteItem={() => alertDeleteItem(item)}
                />
              );
            })}
            {shopList.length === 0 && (
              <Text style={styles.text_empty}>You don't have a list yet</Text>
            )}
          </View>
        </View>
      </ScrollView>
      {/* Button Add List */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.writeTaskWrapper}>
        <TouchableOpacity onPress={() => showModal()}>
          <View style={styles.addWrapper}>
            <Text style={styles.addText}>+</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
      {/* Modal Add List */}
      <Modal
        isVisible={isModal}
        animationIn={'fadeIn'}
        animationOut={'fadeOut'}
        onBackdropPress={() => false}>
        <View style={styles.containerModalPopUp}>
          <Text style={styles.text_title}>Add New List</Text>
          <Gap height={24} />
          <Input
            label="Name"
            value={form.name}
            onChangeText={value => setForm('name', value)}
          />
          <Gap height={24} />
          <Input
            label="Description"
            value={form.description}
            onChangeText={value => setForm('description', value)}
          />
          <Text isVisible={form.error} style={styles.text_alert}>
            {form.errMsg}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingLeft: 10,
              paddingRight: 10,
            }}>
            <TouchableOpacity
              style={styles.btnCancel}
              onPress={() => closeModal()}>
              <Text style={{color: 'black'}}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.btnSave}
              onPress={() => handleAddShopList()}>
              <Text style={{color: 'white'}}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};
export default Home;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  text_fullName: {
    fontSize: 16,
    color: '#000000',
    marginStart: 20,
    marginTop: 20,
  },
  text_title: {
    fontSize: 16,
    color: '#000000',
    alignSelf: 'center',
  },
  tasksWrapper: {
    paddingHorizontal: 20,
  },
  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: '#4DAC73',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#D8D8D8',
    borderWidth: 1,
  },
  addText: {
    color: 'white',
    fontSize: 25,
  },
  writeTaskWrapper: {
    position: 'absolute',
    bottom: 10,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerModalPopUp: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
  },
  btnCancel: {
    marginTop: 15,
    marginBottom: 5,
    borderRadius: 10,
    backgroundColor: '#DDDDDD',
    width: '30%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnSave: {
    marginTop: 15,
    marginBottom: 5,
    borderRadius: 10,
    backgroundColor: '#4DAC73',
    width: '30%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalTitle: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#00000',
  },
  text: {
    marginBottom: 10,
  },
  items: {
    marginTop: 10,
  },
  scrollView: {
    marginBottom: 60,
  },
  text_alert: {
    fontSize: 12,
    color: '#FF2C2C',
  },
  container_name: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  btnLogout: {
    width: 70,
    height: 50,
    marginTop: 10,
    marginRight: 20,
  },
  text_empty: {
    fontSize: 16,
    color: '#000000',
    alignSelf: 'center',
    marginTop: 50,
  },
});
