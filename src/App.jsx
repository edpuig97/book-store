import { useState } from "react";
import "@mantine/core/styles.css";
import { MultiSelect, RangeSlider, MantineProvider } from "@mantine/core";
import { Analytics } from "@vercel/analytics/react";
import "./App.css";
import { Book } from "./components/Book";
import { BookModal } from "./components/BookModal";
import { useCurrentBooks } from "./hooks/useCurrentBooks";

function App() {
  const [currentBook, setCurrentBook] = useState(null);
  const [availableBooks, readingBooks, updateAvailableReadingBooks] =
    useCurrentBooks();

  const addToReadingList = (id) => {
    const newBook = availableBooks.find((b) => b.book.ISBN === id);
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
    updateAvailableReadingBooks({
      available: newAvailableBooks,
      reading: newReadingBooks,
    });
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
    updateAvailableReadingBooks({
      available: newAvailableBooks,
      reading: newReadingBooks,
    });
  };

  const emptyReadingList = () => {
    window.localStorage.setItem("readingBooks", []);
    window.localStorage.setItem(
      "availableBooks",
      JSON.stringify([...availableBooks, ...readingBooks])
    );
    updateAvailableReadingBooks({
      available: [...availableBooks, ...readingBooks],
      reading: [],
    });
  };

  const viewMore = (book) => {
    setCurrentBook(book);
  };

  const cleanCurrentBook = () => {
    setCurrentBook(null);
  };

  return (
    <MantineProvider>
      <header>
        <h1>Nuestro catálogo:</h1>
      </header>

      <main>
        <aside className="searchBox">
          <header className="form-header">
            <h2>Buscar</h2>
          </header>
          <form id="searchForm">
            <div className="form-fields">
              <div className="form-row">
                <label htmlFor="genre">Autor:</label>
                <MultiSelect />
              </div>
              <div className="form-row">
                <label htmlFor="genre">Género:</label>
                <MultiSelect />
              </div>

              <div className="form-row">
                <label className="label-range" htmlFor="pages">
                  Número de páginas:
                </label>
                <RangeSlider
                  minRange={1}
                  min={1}
                  max={1000}
                  step={1}
                  defaultValue={[1, 1000]}
                />
              </div>
            </div>
          </form>
        </aside>
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
                <button
                  className="empty-reading-btn"
                  onClick={emptyReadingList}
                >
                  Vaciar mi lista de lectura
                </button>
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
      <Analytics />
    </MantineProvider>
  );
}

export default App;
