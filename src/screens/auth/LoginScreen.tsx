import {Alert, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {useNavigation} from '@react-navigation/native';
import TextFormInput from '../../components/shared/ui/TextFormInput';
import AppSafeArea from '../../components/shared/ui/AppSafeArea';
import FlatButton from '../../components/shared/ui/FlatButton';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../types/navigationTypes';

const LoginScreen = () => {
  const [stepOne, setStepOne] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const navigator =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

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
  function continueRegistrationHandler() {
    if (email === '') {
      Alert.alert('registration error', 'please fill in the registration form');
      return;
    }
    firestore()
      .collection('Users')
      .where('email', '==', email)
      .get()
      .then(snapshot => {
        if (snapshot.empty) {
          navigator.navigate('Register');
          return;
        } else {
          setStepOne(true);
        }
      })
      .catch(error => console.log(error));
  }
  function emailHandler(val: string) {
    setEmail(val);
  }
  return (
    <AppSafeArea>
      <View style={styles.container}>
        <View style={styles.card}>
          {stepOne ? (
            <View style={styles.stepTwo}>
              <View style={styles.titleContainer}>
                <Text style={styles.title}>Continue Login</Text>
              </View>
              <FlatButton style={styles.button} onPress={signInWithGoogle}>
                Sign In With Google
              </FlatButton>
            </View>
          ) : (
            <View>
              <View style={styles.titleContainer}>
                <Text style={styles.title}>Login</Text>
              </View>
              <View style={styles.textInputContainer}>
                <TextFormInput
                  placeholder="Email Address"
                  onChangeText={emailHandler}
                />
              </View>
              <FlatButton onPress={continueRegistrationHandler}>
                Continue
              </FlatButton>
            </View>
          )}
        </View>
      </View>
    </AppSafeArea>
  );
};

export default LoginScreen;

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
