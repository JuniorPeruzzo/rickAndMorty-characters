"use strict";

import { fetchCharactersData } from "./api/api-manager.js";
import { displayCharactersContent, controlModalDisplay } from "./components/content-loader.js";
import { createStorage, getStorageContent, cleanStorage } from "./storage-manager.js";
import {
	pageCharactersControl,
	applyFilters,
	currentPage,
	setFilters,
	calculateTotalPage,
} from "./components/pagination-filters-control.js";

const containerCharacters = document.querySelector(".characters__container");
const currentNumberPage = document.getElementById("current__page-number");

pageCharactersControl();
applyFilters();
controlModalDisplay();

async function init() {
	let storedFilters = getStorageContent();

	if (Object.values(storedFilters).length == 0) {
		storedFilters = currentPage;
	}

	const { results: charactersData, info } = await fetchCharactersData(storedFilters);
	currentPage.page = storedFilters.page;
	setFilters(storedFilters);
	calculateTotalPage(info.count);
	currentNumberPage.innerHTML = currentPage.page;
	displayCharactersContent({ charactersData });

	cleanStorage();
}

containerCharacters.addEventListener("click", (event) => {
	if (event.target.classList.contains("character__button")) {
		createStorage();
	}
});

init();
