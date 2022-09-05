import { useState } from "react";
import { Row } from "react-bootstrap";
import "./Pagination.css";
const Pagination = ({
  data,
  RenderComponent,
  title,
  pageLimit,
  dataLimit,
  tablePagination,
}) => {
  const [pages] = useState(Math.floor(data.length / dataLimit) + 1);
  const [currentPage, setCurrentPage] = useState(1);

  const goToNextPage = () => {
    setCurrentPage((page) => page + 1);
  };

  const goToPreviousPage = () => {
    setCurrentPage((page) => page - 1);
  };

  const changePage = (event) => {
    const pageNumber = Number(event.target.textContent);
    setCurrentPage(pageNumber);
  };

  const getPaginatedData = () => {
    const startIndex = currentPage * dataLimit - dataLimit;
    const endIndex = startIndex + dataLimit;
    return data.slice(startIndex, endIndex);
  };

  const getPaginationGroup = () => {
    let start = Math.floor((currentPage - 1) / pageLimit) * pageLimit;

    return new Array(pageLimit).fill().map((_, idx) => start + idx + 1);
  };

  return (
    <>
      {tablePagination ? (
        getPaginatedData().map((data, idx) => (
          <RenderComponent key={idx} {...data} />
        ))
      ) : (
        <Row style={{ rowGap: "20px" }}>
          <h1>{title}</h1>

          {getPaginatedData().map((data, idx) => (
            <RenderComponent key={idx} {...data} />
          ))}
        </Row>
      )}

      {/* show the next and previous buttons */}
      {data.length > dataLimit && (
        <div className="pagination">
          <button
            onClick={goToPreviousPage}
            className={`prev ${currentPage === 1 ? "disabled" : ""}`}
          >
            prev
          </button>
          {getPaginationGroup().map((item, index) => (
            <button
              key={index}
              onClick={changePage}
              className={`paginationItem ${
                currentPage === item ? "active" : ""
              }`}
            >
              <span>{item}</span>
            </button>
          ))}
          <button
            onClick={goToNextPage}
            className={`next ${currentPage >= pages ? "disabled" : ""}`}
          >
            next
          </button>
        </div>
      )}
    </>
  );
};
export default Pagination;
