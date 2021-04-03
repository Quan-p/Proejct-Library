/*
Books will be stored into a simple array
Add function that can take user input and store the new book objects into an array
Write function that loops through array and displays each book on the page
*/

// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

function openModal() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

//constructor
//change this to class
class Book {
    constructor(title, author, pages ,read) {
        this.title = form.title.value;
        this.author = form.author.value;
        this.pages = form.pages.value + ' pages';
        this.read = form.read.checked;
    }
}

//book array
let myLibrary = [];
let newBook;

function addBookToLibrary() {
    newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
    setData();//saves array to local storage
    bookForm();
    form.reset();
}

//Create book render onscreen as added
//function that loops through array and displays book
function bookForm() {
    const display = document.getElementById('Library-container');
    const books = document.querySelectorAll('.book');
    books.forEach(book => display.removeChild(book));
    
    for (let i=0; i<myLibrary.length; i++) {
        createBook(myLibrary[i]);  
    }
}

//Creates the DOM elements for the book display
function createBook(item) {
    const library = document.querySelector('#Library-container');
    const bookDiv = document.createElement('div');
    const titleDiv = document.createElement('div');
    const authDiv = document.createElement('div');
    const pageDiv = document.createElement('div');
    const removeBtn = document.createElement('button');
    const readBtn = document.createElement('button');
    
    bookDiv.classList.add('book');
    bookDiv.setAttribute('id', myLibrary.indexOf(item));

    titleDiv.textContent = item.title;
    titleDiv.classList.add('title');
    bookDiv.appendChild(titleDiv);

    authDiv.textContent = item.author;
    titleDiv.classList.add('author');
    bookDiv.appendChild(authDiv);
    
    pageDiv.textContent = item.pages;
    pageDiv.classList.add('pages');
    bookDiv.appendChild(pageDiv);

    readBtn.classList.add('readBtn');
    bookDiv.appendChild(readBtn);
    if(item.read===false) {
        readBtn.textContent='Not Read';
        //changes read status to red or green
        readBtn.style.backgroundColor='#e04f63';
    } else {
        readBtn.textContent='Read';
        readBtn.style.backgroundColor='#63da63';
    }

    removeBtn.textContent='Remove';
    removeBtn.setAttribute('id', 'removeBtn');
    bookDiv.appendChild(removeBtn);

    library.appendChild(bookDiv);

    removeBtn.addEventListener('click', () =>  {
        myLibrary.splice(myLibrary.indexOf(item),1);
        setData();
        bookForm();
    });

    readBtn.addEventListener('click', () => {
        item.read = !item.read;
        setData();
        bookForm();
    });
}
    //sets library to be stored in local storage
    function setData() {
        localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
    }

    //if page refreshes, pull book from local storage
    function bookRestore() {
        if(!localStorage.myLibrary) {
            bookForm();
        } else {
            let objects = localStorage.getItem('myLibrary')
            objects = JSON.parse(objects);
            myLibrary = objects;
            bookForm();
        }
    }
    bookRestore();

