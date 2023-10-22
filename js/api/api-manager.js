"use strict";

const urlAPI = "https://rickandmortyapi.com/api";

export async function fetchCharactersData({ page = 1, name, status }) {
	let url = `${urlAPI}/character?page=${page}`;

	if (name) {
		url += `&name=${name}`;
	}

	if (status) {
		url += `&status=${status}`;
	}

	let response = {};
	try {
		response = await fetch(url);
	} catch (e) {
		return null;
	}

	const content = await response.json();
	if (content.error) {
		return { results: null, info: { count: null } };
	}
	return content;
}

export async function fetchCharacter(id) {
	let url = `${urlAPI}/character/${id}`;

	let response = {};
	try {
		response = await fetch(url);
	} catch (e) {
		return null;
	}

	const content = await response.json();

	return content;
}
