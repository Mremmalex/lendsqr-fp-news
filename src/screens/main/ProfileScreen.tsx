import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import AppSafeArea from '../../components/shared/ui/AppSafeArea';
import auth from '@react-native-firebase/auth';
import {useAppDispatch, useAppSelector} from '../../store/hook';
import FlatButton from '../../components/shared/ui/FlatButton';
import Colors from '../../constants/color';
import {userLogoutState} from '../../store/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

const ProfileScreen = () => {
  const loggedInUserData = useAppSelector(state => state.auth.user);
  const dispatch = useAppDispatch();

  function logoutHandler() {
    auth()
      .signOut()
      .then(async () => {
        await GoogleSignin.signOut();
        // Alert.alert('logout', 'logged out successful');
        dispatch(userLogoutState());
      });
  }
  return (
    <AppSafeArea>
      <View style={styles.container}>
        <View style={styles.infoContainer}>
          <Text>You are logged in as</Text>
          <Text style={styles.nameText}>{loggedInUserData.first_name}</Text>
          <Text style={styles.nameText}>{loggedInUserData.email}</Text>
        </View>

        <FlatButton style={styles.logoutButton} onPress={logoutHandler}>
          Logout
        </FlatButton>
      </View>
    </AppSafeArea>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  infoContainer: {
    alignItems: 'center',
  },
  logoutButton: {
    margin: 10,
    backgroundColor: Colors.secondaryColor,
  },
  nameText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
