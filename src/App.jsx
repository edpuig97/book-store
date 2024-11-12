import { useState } from "react";
import "./App.css";
import data from "./assets/books.json";
import { Book } from "./components/Book";
import { BookModal } from "./components/BookModal";
function App() {
  const [availableBooks, setAvailableBooks] = useState(() => {
    const availableBooksFromStorage =
      window.localStorage.getItem("availableBooks");
    if (availableBooksFromStorage) return JSON.parse(availableBooksFromStorage);
    // TODO: Fetch data from API
    window.localStorage.setItem("availableBooks", JSON.stringify(data.library));
    return data.library;
  });

  const [readingBooks, setReadingBooks] = useState(() => {
    const readingBooksFromStorage = window.localStorage.getItem("readingBooks");
    if (readingBooksFromStorage) {
      return JSON.parse(readingBooksFromStorage);
    }
    // TODO: Fetch data from API
    window.localStorage.setItem("readingBooks", JSON.stringify([]));
    return [];
  });

  const [currentBook, setCurrentBook] = useState(null);

  const addToReadingList = (id) => {
    const newBook = availableBooks.find((b) => b.book.ISBN === id);
    console.log(newBook);
    console.log(readingBooks);
    console.log([...readingBooks, newBook]);
    const newReadingBooks = [...readingBooks, newBook];
    const newAvailableBooks = availableBooks.filter((b) => b.book.ISBN !== id);
    window.localStorage.setItem(
      "readingBooks",
      JSON.stringify(newReadingBooks)
    );
    window.localStorage.setItem(
      "availableBooks",
      JSON.stringify(newAvailableBooks)
    );
    setAvailableBooks(newAvailableBooks);
    setReadingBooks(newReadingBooks);
  };

  const removeFromReadingList = (id) => {
    const newAvailableBook = readingBooks.find((b) => b.book.ISBN === id);
    const newReadingBooks = readingBooks.filter(
      (book) => book.book.ISBN !== id
    );
    const newAvailableBooks = [...availableBooks, newAvailableBook];
    window.localStorage.setItem(
      "readingBooks",
      JSON.stringify(newReadingBooks)
    );
    window.localStorage.setItem(
      "availableBooks",
      JSON.stringify(newAvailableBooks)
    );
    setAvailableBooks(newAvailableBooks);
    setReadingBooks(newReadingBooks);
  };

  const getMaxPages = () => {
    const pages = Array(...availableBooks, ...readingBooks);
    console.log(pages);
    console.log(availableBooks);
  };

  getMaxPages();

  const viewMore = (book) => {
    setCurrentBook(book);
  };

  const cleanCurrentBook = () => {
    setCurrentBook(null);
  };

  return (
    <>
      <header>
        <h1>Nuestro catálogo:</h1>
      </header>

      <main>
        <aside></aside>
        <div className="container">
          {" "}
          {availableBooks?.length > 0 && (
            <section className="available-books" id="availableBooks">
              <header>
                <h2>
                  {availableBooks.length} Libros disponibles{" "}
                  {readingBooks?.length > 0 && (
                    <small>
                      ({readingBooks.length} en la{" "}
                      <a href="#readingList">lista de lectura</a>)
                    </small>
                  )}
                </h2>
              </header>
              <main className="books-list">
                {availableBooks.map((b) => {
                  return (
                    <Book
                      key={b.book.ISBN}
                      book={b.book}
                      buttonText={"¡Quiero leerlo!"}
                      addToReadingList={addToReadingList}
                      viewMore={viewMore}
                    />
                  );
                })}
              </main>
            </section>
          )}
          {readingBooks?.length > 0 && (
            <section className="reading-books" id="readingList">
              <header>
                <h2>Lista de lectura</h2>
              </header>
              <main className="books-list">
                {readingBooks.map((b) => {
                  return (
                    <Book
                      key={b.book.ISBN}
                      book={b.book}
                      buttonText={"No me interesa"}
                      removeFromReadingList={removeFromReadingList}
                      viewMore={viewMore}
                    />
                  );
                })}
              </main>
            </section>
          )}
        </div>
      </main>
      {currentBook && (
        <BookModal
          currentBook={currentBook}
          cleanCurrentBook={cleanCurrentBook}
        />
      )}
      <footer>
        <p>© 2023 - Book Store</p>
      </footer>
    </>
  );
}

export default App;
