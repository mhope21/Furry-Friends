// Retrieve URL parameter
function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    const regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    const results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

// Fetch breed details from TheDogApi
async function fetchBreedDetails(breedName) {
    try {
        const response = await fetch(`https://api.thedogapi.com/v1/breeds/search?q=${breedName}`);
        const data = await response.json();
        return data[0];
    } catch (error) {
        console.error('Error fetching breed details:', error);
        return null;
    }
}

// List dog names
const dogNames = [
    "Buddy", "Max", "Charlie", "Bailey", "Lucy", "Daisy", "Rocky", "Sadie", "Molly", "Toby",
    "Bella", "Duke", "Maggie", "Jake", "Luna", "Jack", "Lola", "Bear", "Zoe", "Cooper",
    "Annie", "Riley", "Rosie", "Harley", "Roxy", "Sasha", "Buster", "Pepper", "Coco", "Ruby",
    "Roscoe", "Rusty", "Sam", "Sammy", "Shadow", "Smokey", "Sophie", "Stella", "Teddy", "Tucker"
];

// List dog activities
const dogActivities = [
    "fetching balls", "going for walks", "chasing squirrels", "playing with toys", "sniffing around", 
    "running in the park", "digging holes", "rolling in the grass", "socializing with other dogs", 
    "learning new tricks", "exploring new places", "swimming in the water", "sunbathing", 
    "curling up for naps", "begging for treats", "greeting visitors", "guarding the house",
    "watching TV", "hiking in the mountains", "playing frisbee", "riding in the car", "singing along to music",
    "hunting for bugs", "splashing in puddles", "snuggling on the couch", "helping with chores",
    "modeling for photos", "trying new foods", "going on adventures", "participating in dog sports",
    "keeping the yard safe", "attending training classes", "performing tricks", "going on picnics",
    "joining family gatherings", "camping under the stars", "riding on boats", "attending dog-friendly events"
];



// Fetch breed image by breed ID
async function fetchBreedImage(breedId) {
    try {
        const response = await fetch(`https://api.thedogapi.com/v1/images/search?breed_ids=${breedId}`);
        const data = await response.json();
        if (data && data.length > 0) {
            return data[0].url;
        } else {
            console.error('No image found for breed ID:', breedId);
            return null;
        }
    } catch (error) {
        console.error('Error fetching breed image:', error);
        return null;
    }
}


// Display breed image on the page
async function displayBreedImage() {
    const breedName = getUrlParameter('breed');
    if (breedName) {
        const breed = await fetchBreedDetails(breedName);
        if (breed) {
            const imageUrl = await fetchBreedImage(breed.id);
            if (imageUrl) {
                const breedImgContainer = document.getElementById('breed-img');
                breedImgContainer.innerHTML = `<img src="${imageUrl}" alt="${breedName}">`;

                
                const randomDogName = selectRandomItem(dogNames);
                displayTitle(randomDogName);
                displayBreedInfo(randomDogName, breed.temperament);

            } else {
                console.error('Image not found for breed:', breedName);
            }
        } else {
            console.error('Breed not found:', breedName);
        }
    } else {
        console.error('Breed name not provided.');
    }
}

displayBreedImage();

// Select a random item from an array
function selectRandomItem(array) {
    return array[Math.floor(Math.random() * array.length)];
}

// Display breed info with random temperament and activities
function displayBreedInfo(dogName, temperament) {
    // Convert temperament to an array and lowercase each item
    const temperamentArray = temperament.split(', ').map(item => item.toLowerCase());

    // Select 3 random temperaments
    const randomTemperaments = [];
    while (randomTemperaments.length < 3) {
        const randomQuality = selectRandomItem(temperamentArray);
        if (!randomTemperaments.includes(randomQuality)) {
            randomTemperaments.push(randomQuality);
        }
    }

    // Select 2 random activities (ensuring they are not the same)
    const randomActivity1 = selectRandomItem(dogActivities);
    let randomActivity2 = selectRandomItem(dogActivities);
    while (randomActivity2 === randomActivity1) {
        randomActivity2 = selectRandomItem(dogActivities);
    }

    // Format breed info string
    const breedInfoContainer = document.getElementById('breed-info');
    breedInfoContainer.innerHTML = `<p>${dogName} is ${randomTemperaments[0]}, ${randomTemperaments[1]}, and ${randomTemperaments[2]}. ${dogName} loves ${randomActivity1} and ${randomActivity2}. Come and meet your new companion today.</p>`;
}


// Display title with a random dog name
function displayTitle(randomDogName) {
    const titleContainer = document.getElementById('title-container');
    titleContainer.innerHTML = `<h1 id="breed-title">Meet ${randomDogName}!</h1>`;
}

document.getElementById('return-button').addEventListener('click', () => {
    window.location.href = 'index.html';
    
});



