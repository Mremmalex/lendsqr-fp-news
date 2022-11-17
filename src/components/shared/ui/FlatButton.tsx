import {
  Pressable,
  PressableProps,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import React, {ReactNode} from 'react';
import Colors from '../../../constants/color';

interface FlatButtonProps extends PressableProps {
  children: ReactNode;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

const FlatButton: React.FC<FlatButtonProps> = ({
  children,
  style,
  textStyle,
  ...rest
}): JSX.Element => {
  return (
    <View style={[styles.buttonContainer, style]}>
      <Pressable
        {...rest}
        style={({pressed}) => [styles.button, pressed ? styles.pressed : null]}
        android_ripple={{color: '#ccc'}}>
        <Text style={[styles.text, textStyle]}>{children}</Text>
      </Pressable>
    </View>
  );
};

export default FlatButton;

const styles = StyleSheet.create({
  buttonContainer: {
    height: 40,
    margin: 4,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: Colors.primaryColor,
  },
  button: {
    borderRadius: 20,
    // overflow: "hidden",
  },
  pressed: {
    opacity: 0.9,
  },
  text: {
    padding: 9,
    textAlign: 'center',
    color: '#fff',
  },
});
