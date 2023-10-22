"use strict";

import { getFilters, currentPage } from "./components/pagination-filters-control.js";

const storageFilterKey = "filters";
const storagePageKey = "currentPage";

export function createStorage() {
	localStorage.setItem(storageFilterKey, JSON.stringify(getFilters()));
	localStorage.setItem(storagePageKey, JSON.stringify(currentPage));
}

export function getStorageContent() {
	const filtersLocal = JSON.parse(localStorage.getItem(storageFilterKey));
	const currentPageLocal = JSON.parse(localStorage.getItem(storagePageKey));

	return { ...filtersLocal, ...currentPageLocal };
}

export function cleanStorage() {
	localStorage.removeItem(storageFilterKey);
	localStorage.removeItem(storagePageKey);
}
