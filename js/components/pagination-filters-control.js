"use strict";

import { fetchCharactersData } from "../api/api-manager.js";
import { displayCharactersContent, charactersContainer } from "./content-loader.js";

const filterByName = document.getElementById("name");
const filterByStatus = document.getElementById("status");
const filtersButton = document.getElementById("filters-button");
const currentNumberPage = document.getElementById("current__page-number");
const elementHtml = {
	get(element) {
		return document.querySelector(element);
	},
};

let filters = {};

export function getFilters() {
	return filters;
}

export function setFilters(value) {
	filters = value;
}

let totalPage = 1;

export const currentPage = {
	page: 1,
};

const buttonsControls = {
	nextPage() {
		if (currentPage.page < totalPage) {
			currentPage.page++;
		} else {
			return "Last Page";
		}
	},

	prevPage() {
		if (currentPage.page > 1) {
			currentPage.page--;
		} else {
			return "First Page";
		}
	},

	goToPage(page) {
		currentPage.page = page;
	},
};

export function calculateTotalPage(count) {
	const itemsPerPage = 20;
	totalPage = Math.ceil(count / itemsPerPage);
}

export async function loadPageData() {
	const pageAndFilters = { ...filters, ...currentPage };

	const { results: charactersData } = await fetchCharactersData(pageAndFilters);
	currentNumberPage.innerHTML = currentPage.page;
	charactersContainer.innerHTML = "";
	displayCharactersContent({ charactersData });
}

export function pageCharactersControl() {
	elementHtml.get(".next__page").onclick = () => {
		const pageControl = buttonsControls.nextPage();
		if (pageControl == "Last Page") {
			return;
		}
		loadPageData();
	};

	elementHtml.get(".prev__page").onclick = () => {
		const pageControl = buttonsControls.prevPage();
		if (pageControl == "First Page") {
			return;
		}
		loadPageData();
	};

	elementHtml.get(".last__page").onclick = () => {
		buttonsControls.goToPage(totalPage);
		loadPageData();
	};

	elementHtml.get(".first__page").onclick = () => {
		buttonsControls.goToPage(1);
		loadPageData();
	};
}

export function applyFilters() {
	filtersButton.onclick = async () => {
		currentPage.page = 1;

		filters = { ...currentPage };

		if (filterByName.value != "") {
			filters.name = filterByName.value;
		}

		if (filterByStatus.value != "") {
			filters.status = filterByStatus.value;
		}

		const { results: charactersData, info } = await fetchCharactersData(filters);
		calculateTotalPage(info.count);
		currentNumberPage.innerHTML = currentPage.page;
		charactersContainer.innerHTML = "";
		displayCharactersContent({ charactersData });
	};
}
