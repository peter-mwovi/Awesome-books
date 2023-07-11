// Book constructor
function Book(title, author) {
    this.title = title;
    this.author = author;
  }
  
  // UI constructor
  function UI() {}
  
  UI.prototype.addBookToList = function (book) {
    const list = document.getElementById('bookList');
    const p = document.createElement('p');
    p.innerHTML = `${book.title} <br/> ${book.author} <br/> <button class='delete'>Remove</button> <hr/>`;
    list.appendChild(p);
  };
  
  UI.prototype.clearInputFields = function () {
    document.getElementById('titleInput').value = '';
    document.getElementById('authorInput').value = '';
  };
  
  UI.prototype.showAlert = function (message, className) {
    const div = document.createElement('div');
    div.className = `alert ${className}`;
    div.appendChild(document.createTextNode(message));
    const container = document.querySelector('body');
    const form = document.getElementById('bookForm');
    container.insertBefore(div, form);
  
    setTimeout(function () {
      document.querySelector('.alert').remove();
    }, 400);
  };
  
  UI.prototype.deleteBookFromList = function (target) {
    if (target.classList.contains('delete')) {
      target.parentElement.remove();
    }
  };
  
  UI.prototype.saveToLocalStorage = function (book) {
    let books = [];
    if (localStorage.getItem('books')) {
      books = JSON.parse(localStorage.getItem('books'));
    }
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));
  };
  
  UI.prototype.getBooksFromLocalStorage = function () {
    let books = [];
    if (localStorage.getItem('books')) {
      books = JSON.parse(localStorage.getItem('books'));
    }
    return books;
  };
  
  UI.prototype.displayBooksFromLocalStorage = function () {
    const books = this.getBooksFromLocalStorage();
    books.forEach((book) => {
      this.addBookToList(book);
    });
  };
  
  // Event listeners
  document.getElementById('bookForm').addEventListener('submit', function (e) {
    const title = document.getElementById('titleInput').value;
    const author = document.getElementById('authorInput').value;
    const book = new Book(title, author);
    const ui = new UI();
  
    if (title === '' || author === '') {
      ui.showAlert('Please fill in all fields', 'error');
    } else {
      ui.addBookToList(book);
      ui.clearInputFields();
      ui.saveToLocalStorage(book);
      ui.showAlert('Book added', 'success');
    }
  
    e.preventDefault();
  });
  
  document.getElementById('bookList').addEventListener('click', function (e) {
    const ui = new UI();
    ui.deleteBookFromList(e.target);
    ui.showAlert('Book removed', 'success');
  });
  
  // Load books from local storage on page load
  document.addEventListener('DOMContentLoaded', function () {
    const ui = new UI();
    ui.displayBooksFromLocalStorage();
  });