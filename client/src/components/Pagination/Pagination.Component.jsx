/*import { useSelector, useDispatch } from "react-redux";

import { setCurrentPage } from "../../Redux/actions";
import "./Pagination.Styles.css";

const Pagination = () => {
  const dispatch = useDispatch();
  const { currentPage, totalPages } = useSelector((state) => state);

  const startHandler = () => {
    dispatch(setCurrentPage(1));
  };

  const previousHandler = () => {
    if (currentPage > 1) {
      dispatch(setCurrentPage(currentPage - 1));
    }
  };

  const goTohandler = (page) => {
    dispatch(setCurrentPage(page));
  };

  const nextHandler = () => {
    if (currentPage < totalPages) {
      dispatch(setCurrentPage(currentPage + 1));
    }
  };

  const endHandler = () => {
    dispatch(setCurrentPage(totalPages));
  };

  const generatePageNumbers = () => {
    const pageNumbers = [];
    let startPage = Math.max(1, currentPage - 1);
    const endPage = Math.min(totalPages, startPage + 2);

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    // Agrega puntos suspensivos si hay más páginas disponibles
    if (endPage < totalPages) {
      pageNumbers.push("...");
    }

    return pageNumbers;
  };

  return (
    <div className="pagination-container">
      <button
        className="pagination-button"
        onClick={startHandler}
        disabled={currentPage <= 1}>
        <span>First</span>
      </button>

      <button
        className="pagination-button"
        onClick={previousHandler}
        disabled={currentPage <= 1}>
        <span>Previous</span>
      </button>

      {generatePageNumbers().map((pageNumber, index) => (
        <button
          key={index}
          className={`pagination-button ${currentPage === pageNumber ? "active" : ""}`}
          onClick={() => {
            if (pageNumber !== "...") {
              goTohandler(pageNumber);
            }
          }}>
          {pageNumber}
        </button>
      ))}

      <button
        className="pagination-button"
        onClick={nextHandler}
        disabled={currentPage === totalPages}>
        <span>Next</span>
      </button>

      <button
        className="pagination-button"
        onClick={endHandler}
        disabled={currentPage === totalPages}>
        <span>Last</span>
      </button>
    </div>
  );
};

export default Pagination;
*/



import { useSelector, useDispatch } from "react-redux";
import { setCurrentPage } from "../../Redux/actions";
import "./Pagination.Styles.css";

const Pagination = () => {
  const dispatch = useDispatch();
  
  // Selecciona solo las partes necesarias del estado
  const currentPage = useSelector((state) => state.currentPage);
  const totalPages = useSelector((state) => state.totalPages);

  const startHandler = () => {
    dispatch(setCurrentPage(1));
  };

  const previousHandler = () => {
    if (currentPage > 1) {
      dispatch(setCurrentPage(currentPage - 1));
    }
  };

  const goTohandler = (page) => {
    dispatch(setCurrentPage(page));
  };

  const nextHandler = () => {
    if (currentPage < totalPages) {
      dispatch(setCurrentPage(currentPage + 1));
    }
  };

  const endHandler = () => {
    dispatch(setCurrentPage(totalPages));
  };

  const generatePageNumbers = () => {
    const pageNumbers = [];
    let startPage = Math.max(1, currentPage - 1);
    const endPage = Math.min(totalPages, startPage + 2);

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    // Agrega puntos suspensivos si hay más páginas disponibles
    if (endPage < totalPages) {
      pageNumbers.push("...");
    }

    return pageNumbers;
  };

  return (
    <div className="pagination-container">
      <button
        className="pagination-button"
        onClick={startHandler}
        disabled={currentPage <= 1}>
        <span>First</span>
      </button>

      <button
        className="pagination-button"
        onClick={previousHandler}
        disabled={currentPage <= 1}>
        <span>Previous</span>
      </button>

      {generatePageNumbers().map((pageNumber, index) => (
        <button
          key={index}
          className={`pagination-button ${currentPage === pageNumber ? "active" : ""}`}
          onClick={() => {
            if (pageNumber !== "...") {
              goTohandler(pageNumber);
            }
          }}>
          {pageNumber}
        </button>
      ))}

      <button
        className="pagination-button"
        onClick={nextHandler}
        disabled={currentPage === totalPages}>
        <span>Next</span>
      </button>

      <button
        className="pagination-button"
        onClick={endHandler}
        disabled={currentPage === totalPages}>
        <span>Last</span>
      </button>
    </div>
  );
};

export default Pagination;
