import React, {useEffect, useState} from 'react';
import {Alert, StyleSheet, Text, View} from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import messaging from '@react-native-firebase/messaging';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import AppSafeArea from '../../components/shared/ui/AppSafeArea';
import FlatButton from '../../components/shared/ui/FlatButton';
import TextFormInput from '../../components/shared/ui/TextFormInput';

const RegisterScreen = () => {
  const [stepOne, setStepOne] = useState<boolean>(false);
  const [appToken, setAppToken] = useState('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [fullName, setFullName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  async function signInWithGoogle() {
    try {
      GoogleSignin.configure({
        webClientId:
          '898351724272-i38amlcvsgkp46d4mgre5ogdcumft41v.apps.googleusercontent.com',
        offlineAccess: true,
      });
      await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});

      const {idToken} = await GoogleSignin.signIn();

      const googleCred = auth.GoogleAuthProvider.credential(idToken);

      return auth().signInWithCredential(googleCred);
    } catch (error: any) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        Alert.alert('sign in error', 'sign in was canceled by user');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        Alert.alert('sign in error', 'sign in already in progress');
      } else {
        Alert.alert('sign in error', 'internal server error');
      }
    }
  }

  async function activateNotificationHandle() {
    await messaging().registerDeviceForRemoteMessages();
    const token = await messaging().getToken();
    setAppToken(token);
  }

  function continueRegistrationHandler() {
    if (email === '' || phoneNumber === '' || fullName === ' ') {
      Alert.alert('registration error', 'please fill in the registration form');
      return;
    }
    setLoading(true);
    firestore()
      .collection('Users')
      .add({
        fullname: fullName,
        phonenumber: phoneNumber,
        email: email,
        token: appToken,
      })
      .then(() => {
        setStepOne(true);
        setLoading(false);
      })
      .catch(error => console.log(error));
    setLoading(false);
  }
  function emailHandler(val: string) {
    setEmail(val);
  }
  function fullNameHandler(val: string) {
    setFullName(val);
  }
  function phoneNumberHandler(val: string) {
    setPhoneNumber(val);
  }
  useEffect(() => {
    activateNotificationHandle();
  }, []);

  return (
    <AppSafeArea>
      <View style={styles.container}>
        <View style={styles.card}>
          {stepOne ? (
            <View style={styles.stepTwo}>
              <View style={styles.titleContainer}>
                <Text style={styles.title}>Finish Registration</Text>
              </View>
              <FlatButton style={styles.button} onPress={signInWithGoogle}>
                Sign In With Google
              </FlatButton>
            </View>
          ) : (
            <View>
              <View style={styles.titleContainer}>
                <Text style={styles.title}>Get Registered</Text>
              </View>
              <View style={styles.textInputContainer}>
                <TextFormInput
                  placeholder="Full Name"
                  onChangeText={fullNameHandler}
                />
                <TextFormInput
                  keyboardType="number-pad"
                  placeholder="Phone Number"
                  onChangeText={phoneNumberHandler}
                />
                <TextFormInput
                  placeholder="Email Address"
                  onChangeText={emailHandler}
                />
              </View>
              <FlatButton onPress={continueRegistrationHandler}>
                {loading ? 'Processing...' : 'Continue'}
              </FlatButton>
            </View>
          )}
        </View>
      </View>
    </AppSafeArea>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInputContainer: {
    padding: 20,
    width: '100%',
  },

  card: {
    width: '90%',
    height: 500,
    borderRadius: 30,
    backgroundColor: '#fff',
    overflow: 'hidden',
    justifyContent: 'center',
  },

  titleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 23,
    fontWeight: 'bold',
  },
  button: {
    marginHorizontal: 20,
    marginVertical: 30,
  },
  stepTwo: {
    justifyContent: 'space-between',
  },
});
