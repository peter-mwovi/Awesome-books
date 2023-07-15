class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }
}

class UI {
  static addBookToList(book) {
    const list = document.getElementById('bookList');
    const li = document.createElement('li');
    li.innerHTML = `<div class='details'> <div> <strong> <span>"</span>${book.title}<span>"</span> by ${book.author} </strong> </div> <button class='delete' data-book="${book.title}">Remove</button> </div>`;
    list.appendChild(li);
  }

  static clearInputFields() {
    document.getElementById('titleInput').value = '';
    document.getElementById('authorInput').value = '';
  }

  static showAlert(message, className) {
    const div = document.createElement('div');
    div.className = `alert ${className}`;
    div.appendChild(document.createTextNode(message));
    const container = document.querySelector('body');
    const form = document.getElementById('bookForm');
    container.insertBefore(div, form);

    setTimeout(() => {
      document.querySelector('.alert').remove();
    }, 3000);
  }

  static deleteBookFromList(target) {
    if (target.classList.contains('delete')) {
      target.parentElement.remove();
      const title = target.getAttribute('data-book');
      UI.removeFromLocalStorage(title);
      UI.showAlert('Book removed', 'success');
    }
  }

  static saveToLocalStorage(book) {
    let books = [];
    if (localStorage.getItem('books')) {
      books = JSON.parse(localStorage.getItem('books'));
    }
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));
  }

  static getBooksFromLocalStorage() {
    let books = [];
    if (localStorage.getItem('books')) {
      books = JSON.parse(localStorage.getItem('books'));
    }
    return books;
  }

  static displayBooksFromLocalStorage() {
    const books = UI.getBooksFromLocalStorage();
    books.forEach((book) => {
      UI.addBookToList(book);
    });
  }

  static removeFromLocalStorage(book) {
    let books = UI.getBooksFromLocalStorage();
    books = books.filter((item) => item.title !== book);
    UI.saveToLocalStorage(books);
    localStorage.setItem('books', JSON.stringify(books));
  }
}

// Event listeners
document.getElementById('bookForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const title = document.getElementById('titleInput').value;
  const author = document.getElementById('authorInput').value;
  const book = new Book(title, author);
  if (title === '' || author === '') {
    UI.showAlert('Please fill in all fields', 'error');
  } else {
    UI.addBookToList(book);
    UI.clearInputFields();
    UI.saveToLocalStorage(book);
    UI.showAlert('Book added', 'success');
  }
});
document.getElementById('bookList').addEventListener('click', (e) => {
  UI.deleteBookFromList(e.target);
});

// Load books from local storage on page load
document.addEventListener('DOMContentLoaded', () => {
  UI.displayBooksFromLocalStorage();
});
