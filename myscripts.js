const breedSelector = document.getElementById('breed-selector');

// Fetch the list of dog breeds from TheDogApi
async function fetchDogBreeds() {
    try {
        const response = await fetch('https://api.thedogapi.com/v1/breeds');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching dog breeds:', error);
        return [];
    }
}

// Populate the breed selector with options
async function populateBreedSelector() {
    
    const breeds = await fetchDogBreeds();

    // Clear any existing options
    breedSelector.innerHTML = '';

    
    breedSelector.innerHTML += '<option disabled selected>Choose your breed</option>';

    // Populate options with breed names
    breeds.forEach(breed => {
    
        const breedName = breed.name;
        breedSelector.innerHTML += `<option value="${breedName}">${breedName}</option>`;
    });
}

populateBreedSelector();

// Event listener for breed selection
breedSelector.addEventListener('change', () => {
    const selectedBreed = breedSelector.value;
    if (selectedBreed) {
        window.location.href = `dog.html?breed=${encodeURIComponent(selectedBreed)}`;
    }
});
