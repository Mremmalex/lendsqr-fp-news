import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import auth from '@react-native-firebase/auth';
import {
  GoogleSignin,
  GoogleSigninButton,
} from '@react-native-google-signin/google-signin';
import AppSafeArea from '../../components/shared/ui/AppSafeArea';
// import FlatButton from '../../components/shared/ui/FlatButton';
import TextFormInput from '../../components/shared/ui/TextFormInput';

GoogleSignin.configure({
  webClientId:
    '700454714565-5hpl4cikjnvv7cdqvve45kq2i7n9htti.apps.googleusercontent.com',
  // '468633750146-6pdp4d9h1qn3j5j65nmtlhtumcfdsi5v.apps.googleusercontent.com',
  offlineAccess: true,
});

const RegisterScreen = () => {
  async function signInWithGoogle() {
    await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});

    const {idToken, user} = await GoogleSignin.signIn();
    console.log(user);

    const googleCred = auth.GoogleAuthProvider.credential(idToken);

    return auth().signInWithCredential(googleCred);
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
          <GoogleSigninButton
            style={styles.button}
            onPress={() =>
              signInWithGoogle()
                .then(() => console.log('logged in'))
                .catch(e => console.log(e))
            }
          />
          {/* <FlatButton style={styles.button} onPress={signInWithGoogle}> */}
          {/* Sign In With Google
          </FlatButton> */}
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
