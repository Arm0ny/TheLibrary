const LIBRARY = async (subject) => {
    const response = await fetch(`https://openlibrary.org/subjects/${subject}.json?`);
    return await response.json();
}



function getAuthorsArray(book){
    return book.authors.reduce((authorNames, author) => {
        authorNames.push(author.name)
        return (authorNames)
    }, [])
}

async function getDescriptionNode(key) {
    let bookData = await fetch(`https://openlibrary.org${key}.json`)
        .then( async  response => {
            return response.json();
        })
    let descriptionElem = document.createElement('p')
    descriptionElem.id = 'description' + key
    descriptionElem.classList.add('book-description')
    try {
        descriptionElem.textContent = bookData.description.value ? bookData.description.value : bookData.description
    } catch (e) {
        descriptionElem.textContent = 'No description was found'
    }
    return descriptionElem
}

function mapToList(LIBRARY){
    const booksArray = LIBRARY.works;
    return booksArray.map((book) => {
            let {title, key} = book;
            let authors = getAuthorsArray(book)
            return `<li class="book-card" id=${key}>
                    <h2 class="book-title">${title}</h2>
                    <p class="book-author">${authors}</p>
                </li>`
        }
    ).join('')
}


export {LIBRARY, getDescriptionNode, mapToList}