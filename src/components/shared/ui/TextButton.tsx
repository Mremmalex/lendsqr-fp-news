import {
	StyleSheet,
	Text,
	Pressable,
	PressableProps,
	ViewStyle,
	TextStyle,
} from "react-native";
import React, { Children, ReactNode } from "react";

interface TextButtonProps extends PressableProps {
	style?: ViewStyle;
	textStyle?: TextStyle;
	children: ReactNode;
}
const TextButton: React.FC<TextButtonProps> = ({
	style,
	children,
	textStyle,
	...rest
}) => {
	return (
		<Pressable style={[styles.button, style]} {...rest}>
			<Text style={[styles.text, textStyle]}>{children}</Text>
		</Pressable>
	);
};

export default TextButton;

const styles = StyleSheet.create({
	button: {},
	text: {},
});
