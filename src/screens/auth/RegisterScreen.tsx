import React from 'react';
import {Alert, StyleSheet, Text, View} from 'react-native';
import auth from '@react-native-firebase/auth';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import AppSafeArea from '../../components/shared/ui/AppSafeArea';
import FlatButton from '../../components/shared/ui/FlatButton';
import TextFormInput from '../../components/shared/ui/TextFormInput';

const RegisterScreen = () => {
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

  return (
    <AppSafeArea>
      <View style={styles.container}>
        <View style={styles.card}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Get Registered</Text>
          </View>
          <View style={styles.textInputContainer}>
            <TextFormInput placeholder="Full Name" />
            <TextFormInput placeholder="Phone Number" />
            <TextFormInput placeholder="Email Address" />
          </View>
          <FlatButton style={styles.button} onPress={signInWithGoogle}>
            Sign In With Google
          </FlatButton>
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
  button: {
    marginHorizontal: 20,
  },
  titleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 23,
    fontWeight: 'bold',
  },
});
