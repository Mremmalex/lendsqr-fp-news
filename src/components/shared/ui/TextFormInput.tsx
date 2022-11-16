import {
	StyleSheet,
	TextInput,
	TextInputProps,
	View,
	ViewStyle,
} from "react-native";
import React from "react";
interface TextFormInputPops extends TextInputProps {
	placeholder?: string;
	style?: ViewStyle;
}
const TextFormInput: React.FC<TextFormInputPops> = ({
	placeholder,
	style,
	...rest
}): JSX.Element => {
	return (
		<TextInput
			style={[styles.input, style]}
			placeholder={placeholder}
			{...rest}
		/>
	);
};

export default TextFormInput;

const styles = StyleSheet.create({
	input: {
		padding: 8,
		margin: 8,
		backgroundColor: "#fff",
		borderRadius: 8,
		borderColor: "#ccc",
		borderWidth: 2,
	},
});
