import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/main/HomeScreen";
import LoginScreen from "../screens/auth/LoginScreen";
import RegisterScreen from "../screens/auth/RegisterScreen";
import NewsDetailsScreen from "../screens/NewsDetailsScreen";
import ShowAllHeadline from "../screens/HeadlineScreens/ShowAllHeadline";

const Stack = createNativeStackNavigator();

const StackNav = () => {
	return (
		<Stack.Navigator
			screenOptions={{
				headerShown: false,
			}}
		>
			<Stack.Screen name="Register" component={RegisterScreen} />
			<Stack.Screen name="Login" component={LoginScreen} />
		</Stack.Navigator>
	);
};

const AuthStack = ({}) => {
	return (
		<Stack.Navigator>
			<Stack.Screen
				options={{
					headerShown: false,
				}}
				name="HomeScreen"
				component={HomeScreen}
			/>
			<Stack.Screen
				name="NewsDetails"
				component={NewsDetailsScreen}
				options={{
					title: "News Details",
				}}
			/>
			<Stack.Screen name="Headlines" component={ShowAllHeadline} options={{}} />
		</Stack.Navigator>
	);
};

export { StackNav };
export default AuthStack;
