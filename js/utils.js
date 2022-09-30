const lodash = require('lodash')

const LIBRARY = async (subject) => {
    const response = await fetch(`https://openlibrary.org/subjects/${subject}.json?`);
    return await response.json();
}



function getAuthorsArray(book){
    let authorsObj = lodash.get(book, 'authors', '')
    let authorsArr
    {
        authorsObj ?
        authorsArr = authorsObj.reduce((authorNames, author) => {
            authorNames.push(author.name)
            return (authorNames)
        }, [])
    :
        authorsArr = ['No author Found']
    }
    return authorsArr
}

async function getDescriptionNode(key) {
    let bookData = await fetch(`https://openlibrary.org${key}.json`)
        .then( async  response => {
            return response.json();
        })
    let descriptionElem = document.createElement('p')
    descriptionElem.id = 'description' + key
    descriptionElem.classList.add('book-description')

    descriptionElem.textContent = lodash.get(bookData, 'description.value',
        lodash.get(bookData, 'description', 'Not Found'))
    return descriptionElem
}

function mapToList(LIBRARY){
    const booksArray = lodash.get(LIBRARY, 'works', '');
    try {
        return booksArray.map((book) => {
                let {title, key} = book;
                let authors = getAuthorsArray(book)
                return `<li class="book-card" id=${lodash.get(book, 'key', '')}>
                    <h2 class="book-title">${lodash.get(book, 'title', 'Title not found')}</h2>
                    <p class="book-author">${authors}</p>
                </li>`
            }
        ).join('')
    }catch (e){
        console.log(e)
        return 'No Books were found for the specified subject'
    }
}


export {LIBRARY, getDescriptionNode, mapToList}