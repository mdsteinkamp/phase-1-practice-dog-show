document.addEventListener('DOMContentLoaded', () => {
    fetch(' http://localhost:3000/dogs')
    .then((resp) => resp.json())
    .then((dogs) => renderDogs(dogs))
})

function renderDogs(dogs) {
    dogs.forEach(dog => {
        const dogList = document.querySelector('#dog-list')
        const tr = document.createElement('tr')
        const dogName = document.createElement('td')
        const dogBreed = document.createElement('td')
        const dogSex = document.createElement('td')
        const editBtn = document.createElement('button')
        editBtn.textContent = 'Edit Dog'
        dogName.textContent = dog.name
        dogBreed.textContent = dog.breed
        dogSex.textContent = dog.sex
        editBtn.addEventListener('click', (e) => {
            editDog(e, dog)
        })
        tr.appendChild(dogName)
        tr.appendChild(dogBreed)
        tr.appendChild(dogSex)
        tr.appendChild(editBtn)
        dogList.appendChild(tr)
    })
}

function editDog(e, dog) {
    const form = document.querySelector('#dog-form')
    form.name.value = dog.name
    form.breed.value = dog.breed
    form.sex.value = dog.sex
    form.addEventListener('submit', (e) => {
        e.preventDefault()
        const updatedDog = {
            id: dog.id,
            name: e.target.name.value,
            breed: e.target.breed.value, 
            sex: e.target.sex.value
        }
        patchDog(updatedDog)
    })
}

function patchDog(dog) {
    console.log(dog)
    fetch(`http://localhost:3000/dogs/${dog.id}`, {
        method: 'PATCH',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({
            name: dog.name,
            breed: dog.breed,
            sex: dog.sex
        }),
    })
    .then((resp) => resp.json())
    .then((data) => console.log(data))
    .catch((error) => alert(error.message))
}



// {
//     "id": 1,
//     "name": "Baby",
//     "breed": "Scottish Deerhound",
//     "sex": "male"
//   },