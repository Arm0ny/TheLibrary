import {LIBRARY, getDescriptionNode, mapToList} from "./utils.js";

let searchField = document.getElementById('search-field')
let searchForm = document.getElementById('search-form')
let booksUl = document.getElementById('books-list')


searchForm.onsubmit = async (e) => {
    e.preventDefault()
    let subject = searchField.value;
    booksUl.innerHTML = mapToList(await LIBRARY(subject))
    let booksLi = [...booksUl.children]
    booksLi.forEach(book => {
        book.onclick = async () => {
            if (book.lastChild.id === 'description'+book.id){
                book.lastChild.remove()
            }else{
                book.appendChild(await getDescriptionNode(book.id))
            }

        }
    })
}


