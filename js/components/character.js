"use strict";

import { displayUniqueCharacter } from "./content-loader.js";
import { fetchCharacter } from "../api/api-manager.js";

let urlParams = new URL(document.location).searchParams;
let characterId = urlParams.get("id");

const uniqueCharacterData = await fetchCharacter(characterId);
displayUniqueCharacter({ uniqueCharacterData });
