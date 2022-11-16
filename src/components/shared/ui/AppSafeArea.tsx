import { StyleSheet, Platform, SafeAreaView, ViewStyle } from "react-native";

type Props = {
	children: JSX.Element;
	style?: ViewStyle;
};

const AppSafeArea = ({ children, style }: Props) => {
	return (
		<SafeAreaView style={[styles.safeArea, style]}>{children}</SafeAreaView>
	);
};

export default AppSafeArea;

const styles = StyleSheet.create({
	safeArea: {
		flex: 1,
		paddingTop: Platform.select({ ios: 0, android: 35 }),
	},
});
