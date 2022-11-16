import { AxiosResponse } from "./../../node_modules/axios/index.d";
import axios from "axios";

export function ConfigApiRequest() {
	const options = {
		method: "GET",
		url: "https://newscatcher.p.rapidapi.com/v1/search_enterprise",
		params: {
			q: "Elon Musk",
			lang: "en",
			sort_by: "relevancy",
			page: "1",
			media: "True",
		},
		headers: {
			"X-RapidAPI-Key": "ba867d9bc9msh564177ba08146a9p1460f2jsn1d20ef3fc9ca",
			"X-RapidAPI-Host": "newscatcher.p.rapidapi.com",
		},
	};

	return options;
}

export async function getPopularNews() {
	try {
		const options = ConfigApiRequest();
		const response: AxiosResponse = await axios.request(options);
		const data = await response.data;
		return data;
	} catch (error) {
		console.log(error);
	}
}