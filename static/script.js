let myLibrary = [];

function Book(title, author, pages, read){
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.info = function(){
      return info;
  }
}

function addBookToLibrary(book){
  myLibrary.push(book);
}

let container = document.querySelector('.container');

function printBook(book){   // adds a book to div container
    const content = document.createElement('div');
    content.classList.add('card');

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