const getCharacters = async () => {
	const response = await fetch("https://rickandmortyapi.com/api/character");
	const jsonRes = await response.json();
	console.log(jsonRes.results);
	return jsonRes.results;
};

const toggleMoreInformation = (id) => {
	console.log("toggle called", id);
	const infoDiv = document.getElementById(id);
	infoDiv.classList.toggle("active");
};

const createCharacterList = async () => {
	const characters = await getCharacters();
	console.log("characters: ", characters);

	const charactersContainer = document.querySelector(".characters");

	for (let i = 0; i < characters.length; i++) {
		const newDiv = document.createElement("div");
		newDiv.classList.add("character");

		const headingDiv = document.createElement("div");
		headingDiv.classList.add("heading");

		const title = document.createElement("h1");
		const moreInfo = document.createElement("p");
		moreInfo.addEventListener("click", () =>
			toggleMoreInformation(characters[i].id)
		);
		const information = `${characters[i].name}`;
		title.innerHTML = information;
		moreInfo.innerHTML = "More Info";
		headingDiv.appendChild(title);
		headingDiv.appendChild(moreInfo);

		const moreInfoDiv = document.createElement("div");
		moreInfoDiv.classList.add("more-info");
		moreInfoDiv.id = characters[i].id;
		const imageSrc = characters[i].image;
		const imageDiv = document.createElement("img");
		imageDiv.src = imageSrc;
		const gender = document.createElement("p");
		const location = document.createElement("p");
		const species = document.createElement("p");
		const status = document.createElement("p");
		gender.innerHTML = `Gender: ${characters[i].gender}`;
		location.innerHTML = `Location: ${characters[i].location.name}`;
		species.innerHTML = `Species: ${characters[i].species}`;
		status.innerHTML = `Status: ${characters[i].status}`;
		moreInfoDiv.appendChild(imageDiv);
		moreInfoDiv.appendChild(gender);
		moreInfoDiv.appendChild(location);
		moreInfoDiv.appendChild(species);
		moreInfoDiv.appendChild(status);

		newDiv.appendChild(headingDiv);
		newDiv.appendChild(moreInfoDiv);
		charactersContainer.appendChild(newDiv);
	}
};

createCharacterList();

const findCharacter = async () => {
	const inputValue = document.getElementById("seachInput").value;
    const response = await fetch(`https://rickandmortyapi.com/api/character/?name=${inputValue}&status=alive`)
    const jsonRes = await response.json()
    console.log('res: ', jsonRes)
};
const searchBtn = document.getElementById("searchBtn");
searchBtn.addEventListener("click", findCharacter);
