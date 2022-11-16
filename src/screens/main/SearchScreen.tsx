import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import AppSafeArea from "../../components/shared/ui/AppSafeArea";
import TextFormInput from "../../components/shared/ui/TextFormInput";

const SearchScreen = () => {
	const [search, setSearch] = useState("");

	function changeTextHandler(value: string) {
		setSearch(value);
	}
	function searchNewsHandler() {
		console.log("searching...");
	}
	return (
		<AppSafeArea>
			<View>
				<Text>SearchScreen</Text>
				<TextFormInput
					placeholder="search"
					returnKeyType="search"
					clearButtonMode="while-editing"
					value={search}
					onChangeText={changeTextHandler}
					onSubmitEditing={searchNewsHandler}
				/>
			</View>
		</AppSafeArea>
	);
};

export default SearchScreen;

const styles = StyleSheet.create({});
