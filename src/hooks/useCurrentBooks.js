import { useState, useEffect } from "react";
import data from "../assets/books.json";
import { getCurrentData } from "../utils/logic";
export function useCurrentBooks() {
  const [availableBooks, setAvailableBooks] = useState(Array(0));
  const [readingBooks, setReadingBooks] = useState(Array(0));

  useEffect(() => {
    const availableBooksFromStorage = window.localStorage.getItem(
      "availableBooks"
    )
      ? JSON.parse(window.localStorage.getItem("availableBooks"))
      : Array(0);
    const readingBooksFromStorage = window.localStorage.getItem("readingBooks")
      ? JSON.parse(window.localStorage.getItem("readingBooks"))
      : Array(0);
    const [newAvBooks, newRdBooks] = getCurrentData(
      data.library,
      availableBooksFromStorage,
      readingBooksFromStorage
    );
    setAvailableBooks(newAvBooks);
    setReadingBooks(newRdBooks);
  }, [availableBooks, readingBooks]);

  const updateAvailableReadingBooks = ({ available, reading }) => {
    console.log(available, reading);
    available ?? setAvailableBooks(available);
    reading ?? setAvailableBooks(reading);
  };

  return [availableBooks, readingBooks, updateAvailableReadingBooks];
}
