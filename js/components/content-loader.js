"use strict";

export const charactersContainer = document.querySelector(".characters__container");
export const charactersNotFound = document.querySelector(".characters__notFound");
const uniqueCharacter = document.querySelector(".character__container");
const dialogModal = document.querySelector(".dialog__modal");
const modalButton = document.getElementById("show-modal");
const exitModal = document.querySelector(".exit__modalButton");

function translateValues({ status, species, gender }) {
	const translations = {
		Alive: "Vivo",
		Dead: "Morto",
		unknown: "Desconhecido",
		Human: "Humano",
		Alien: "Alienígena",
		Male: "Masculino",
		Female: "Feminino",
		Genderless: "Sem gênero",
		"Mythological Creature": "Criatura Mitológica",
		Robot: "Robô",
		Humanoid: "Humanoide",
	};

	const checkTranslation = (value) => {
		return translations[value] !== undefined ? translations[value] : value;
	};

	const translatedInfo = {
		status: checkTranslation(status),
		species: checkTranslation(species),
		gender: checkTranslation(gender),
	};

	return translatedInfo;
}

function dateFormatter(createDate) {
	const date = new Date(createDate);
	return date.toLocaleDateString();
}

export async function displayCharactersContent({ charactersData }) {
	charactersNotFound.innerHTML = "";
	if (!charactersData) {
		return (charactersNotFound.innerHTML += `
        <h1>Nenhum personagem encontrado</h1>
        `);
	}
	charactersData.forEach((character) => {
		let translatedDataPtbr = translateValues(character);

		let statusImage;
		if (translatedDataPtbr.status === "Vivo") {
			statusImage = "./assets/alive.png";
		} else if (translatedDataPtbr.status === "Morto") {
			statusImage = "./assets/dead.png";
		} else {
			statusImage = "./assets/unknown.png";
		}

		return (charactersContainer.innerHTML += `
        <div class="character__item">
        <div class="character__overlay">
            <a href="./pages/character.html?id=${character.id}" class="character__button">Mais Detalhes</a>
        </div>
        <img src="${character.image}" alt="Imagem do personagem">
        <div class="character__details">
            <h2>Nome: ${character.name}</h2>
            <p><img class="character__statusIcon" src="${statusImage}" alt="Ícone de Vivo">${translatedDataPtbr.status}</p>
        </div>
    </div>
        `);
	});
}

export async function displayUniqueCharacter({ uniqueCharacterData }) {
	let translatedDataPtbr = translateValues(uniqueCharacterData);
	const registrationDate = dateFormatter(uniqueCharacterData.created);
	document.title = `Rick and Morty | ${uniqueCharacterData.name}`;

	return (uniqueCharacter.innerHTML += `
        <div class="character__item">
                <img src="${uniqueCharacterData.image}" alt="Imagem do personagem">
                <div class="character__details">
                    <h2>Nome: ${uniqueCharacterData.name}</h2>
                    <p>Status: ${translatedDataPtbr.status}</p>
                    <p>Gênero: ${translatedDataPtbr.gender}</p>
                    <p>Localização: ${uniqueCharacterData.location.name}</p>
                    <p>Espécie: ${translatedDataPtbr.species}</p>
                    <p>Origem: ${uniqueCharacterData.origin.name}</p>
                    <p>Episódios: ${uniqueCharacterData.episode.length}</p>
                    <p>Registro Criado: ${registrationDate} </p>
                </div>
            </div>
    `);
}

export function controlModalDisplay() {
	modalButton.onclick = () => {
		dialogModal.showModal();
	};

	exitModal.onclick = () => {
		dialogModal.close();
	};
}
