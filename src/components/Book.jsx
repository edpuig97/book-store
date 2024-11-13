import PropTypes from "prop-types";
export const Book = ({
  book,
  addToReadingList = undefined,
  removeFromReadingList = undefined,
  buttonText,
  viewMore,
}) => {
  const handleClick = () => {
    if (addToReadingList !== undefined) addToReadingList(book.ISBN);
    if (removeFromReadingList !== undefined) removeFromReadingList(book.ISBN);
  };

  const hanldleViewMoreClick = () => {
    viewMore(book);
  };

  return (
    <article className="book-article">
      <header>
        <h3 className="book-title">{book.title}</h3>
        <img
          src="/info.png"
          onClick={hanldleViewMoreClick}
          alt={`Click para ver más acerca de ${book.title}`}
          title="Más información"
        />
        {/* <svg
          
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          width="32"
          height="32"
          viewBox="0 0 32 32"
        >
          <path d="M16,2C8.28,2,2,8.28,2,16s6.28,14,14,14s14-6.28,14-14S23.72,2,16,2z M16,28C9.383,28,4,22.617,4,16S9.383,4,16,4  s12,5.383,12,12S22.617,28,16,28z" />
          <circle cx="16" cy="16" r="2" />
          <circle cx="8.5" cy="16" r="2" />
          <circle cx="23.5" cy="16" r="2" />
        </svg> */}
      </header>
      {/* <ul>
        <li>Género: {book.genre}</li>
        <li>Año: {book.year}</li>
        <li>Páginas: {book.pages}</li>
      </ul> */}

      <div onClick={hanldleViewMoreClick}>
        <img src={book.cover} alt={`Poster del libro ${book.title}`} />
      </div>
      <button className="book-button" onClick={handleClick}>
        {buttonText}
      </button>
    </article>
  );
};

Book.propTypes = {
  book: PropTypes.object.isRequired,
  buttonText: PropTypes.string.isRequired,
  addToReadingList: PropTypes.func,
  removeFromReadingList: PropTypes.func,
  viewMore: PropTypes.func,
};
