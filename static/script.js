let myLibrary = [];


class Book {
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }
}

function addBookToLibrary(book){
  myLibrary.push(book);
}

let container = document.querySelector('.container');

function printBook(book){   // adds a book to div container
    const content = document.createElement('div');
    content.classList.add('card');
    content.setAttribute('data-index', myLibrary.indexOf(book));

    const deleteButton = document.createElement('button');
    deleteButton.classList.add('del-btn');
    deleteButton.textContent = 'X';
    content.appendChild(deleteButton);

    const title = document.createElement('h2');
    title.textContent = book.title;
    content.appendChild(title);
    
    const author = document.createElement('p');
    author.textContent = 'by ' + `${book.author}`;
    content.appendChild(author);

    const pages = document.createElement('p');
    pages.textContent = 'Number of pages: ' + `${book.pages}`;
    content.appendChild(pages);

    const read = document.createElement('button');
    read.classList.add('read-btn');
    read.textContent = (book.read ? 'READ' : 'UNREAD');
    content.appendChild(read);

    container.appendChild(content);
}

const book1 = new Book("To Kill a Mockingbird", "Harper Lee", 281, true);
addBookToLibrary(book1);

const book2 = new Book("The Little Prince", "Antoine de Saint-Exupéry", 96, false);
addBookToLibrary(book2);

const book3 = new Book("The Alchemist", "Paulo Coelho", 154, true);
addBookToLibrary(book3);

const book4 = new Book("The Hunger Games", "Suzanne Collins", 374, true);
addBookToLibrary(book4);

myLibrary.forEach(book => {
    printBook(book);
});

const form = document.getElementById('form');

form.addEventListener('submit', (event) => {
    let title = form.elements['book-title'].value;
    let author = form.elements['book-author'].value;
    let pages = form.elements['book-pages'].value;
    let readStatus = form.elements['read'].value == 'true' ? true : false;

    let book = new Book(title, author, pages, readStatus);
    addBookToLibrary(book);
    printBook(book);

    event.preventDefault();
});

document.addEventListener('click', (ele) => {
    const button = ele.target;
    //if delete button is clicked
    if (button.className === 'del-btn'){
        let indexOfBook = button.parentNode.getAttribute('data-index');
        removeBook(indexOfBook);
    }
    else if (button.className === 'read-btn'){
        let indexOfBook = button.parentNode.getAttribute('data-index');
        myLibrary[indexOfBook].read = !myLibrary[indexOfBook].read;
        button.textContent = (myLibrary[indexOfBook].read ? 'READ' : 'UNREAD');
    }
});

function removeBook(indexOfBook){
    //remove from DOM:
    let child = document.querySelector(`[data-index='${indexOfBook}']`);
    let parent = document.querySelector('.container');
    parent.removeChild(child);

    //remove from myLibrary array:
    delete myLibrary[indexOfBook];
}

let addButton = document.getElementById('add-btn');
let formContainer = document.querySelector('.form-container');

addButton.addEventListener('click', () => {
    if (formContainer.style.display === 'flex'){
        
        formContainer.style.animationName = 'hide';
        formContainer.style.animationPlayState = 'running';
        formContainer.addEventListener('animationend', () => {
            formContainer.style.display = 'none';
            addButton.textContent = 'ADD A BOOK';
        });
    }
    else {
        formContainer.style.animationName = 'show';
        formContainer.style.display = 'flex';
        formContainer.style.animationPlayState = 'running';
        formContainer.addEventListener('animationend', () => {
            formContainer.style.display = 'flex';
            addButton.textContent = 'CLOSE';
        });
    }
});

// Form validation
const bookTitle = document.getElementById('book-title');

bookTitle.addEventListener('input', () => {
    bookTitle.setCustomValidity('');
    bookTitle.checkValidity();
});

bookTitle.addEventListener('invalid', () => {
    bookTitle.setCustomValidity('Book title should not be blank');
});

const bookAuthor = document.getElementById('book-author');

bookAuthor.addEventListener('input', () => {
    bookAuthor.setCustomValidity('');
    bookAuthor.checkValidity();
});

bookAuthor.addEventListener('invalid', () => {
    bookAuthor.setCustomValidity('Book author should not be blank');
});
