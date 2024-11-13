export const getCurrentData = (apiData, availableBooks, readingBooks) => {
  let newAvBooks;
  let newRdBooks;
  if (availableBooks.length > 0) {
    let avBooksInData = availableBooks.map((avb) =>
      apiData.some((apib) => avb.book.ISBN === apib.book.ISBN)
    );
    newAvBooks = availableBooks.filter(
      (_, index) => avBooksInData[index] === true
    );
  } else {
    newAvBooks = [];
  }

  if (readingBooks.length > 0) {
    let rdBooksInData = readingBooks.map((rdb) =>
      apiData.some((apib) => rdb.book.ISBN === apib.book.ISBN)
    );
    newRdBooks = readingBooks.filter(
      (_, index) => rdBooksInData[index] === true
    );
  } else {
    newRdBooks = [];
  }

  const booksAlreadyPresent = [...newAvBooks, ...newRdBooks];
  const allNewBooksInData = apiData.filter(
    (b) => !booksAlreadyPresent.some((prb) => prb.book.ISBN === b.book.ISBN)
  );
  newAvBooks = [...newAvBooks, ...allNewBooksInData];
  return [newAvBooks, newRdBooks];
};
