import {
	Dimensions,
	StyleSheet,
	Text,
	View,
	Image,
	Pressable,
} from "react-native";
import React from "react";
import NewsData from "../../types/newsData";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { NavigationProp } from "../../types/navigationTypes";

type ListTileProps = {
	item: NewsData;
};

const ListTile: React.FC<ListTileProps> = ({ item }) => {
	const Navigation = useNavigation<NativeStackNavigationProp<NavigationProp>>();
	function navigateHandler() {
		Navigation.navigate("NewsDetails", {
			newsId: item._id,
		});
	}
	return (
		<Pressable android_ripple={{ color: "#ccc" }} onPress={navigateHandler}>
			<View style={styles.latestCard}>
				<View style={styles.latestImageContainer}>
					<Image style={styles.image} source={{ uri: item.media }} />
				</View>
				<View style={styles.latestCardTitleContainer}>
					<View>
						<Text style={styles.latestCardTitle}>
							{/* {item.title.length > 30 && item.title.slice(0, 35)}... */}
							{item.title}
						</Text>
					</View>
					<View style={styles.latestCardDetails}>
						<Text style={styles.rankText}>Rank {item.rank.toString()}</Text>
					</View>
				</View>
			</View>
		</Pressable>
	);
};

export default ListTile;
const deviceWidth: number = Dimensions.get("window").width;

const styles = StyleSheet.create({
	LatestContainer: {
		flex: 1,
		height: 200,
	},
	latestText: {
		marginTop: 10,
		fontWeight: "bold",
		fontSize: 20,
		fontStyle: "italic",
	},
	latestNewsContainer: {
		paddingHorizontal: 10,
		paddingBottom: 10,
	},
	latestCard: {
		height: 100,
		flexDirection: "row",
		borderRadius: 20,
		marginHorizontal: 10,
		marginTop: 10,
		backgroundColor: "#fff",
	},
	image: {
		width: 100,
		height: 100,
	},
	latestImageContainer: {
		width: 90,
		height: "100%",
		borderRadius: 20,
		overflow: "hidden",
	},
	latestCardTitle: {
		fontWeight: "bold",
		fontSize: 14,
		paddingLeft: 10,
		paddingRight: 20,
		paddingTop: 10,
	},
	latestCardTitleContainer: {
		width: deviceWidth < 400 ? 300 : 330,
	},
	latestCardDetails: {
		// width: "100%",
		padding: 20,
		paddingLeft: 20,
		marginTop: 10,
		alignItems: "flex-end",
	},
	rankText: {
		fontWeight: "200",
		fontSize: 10,
	},
});
