import React, { useContext } from "react";
import { JobContext } from "../JobContextProvider";
import { PageContext } from "../PageContextProvider";
import "../Styles/pagination.css";

function Pagination() {
  const { hasNextPage } = useContext(JobContext);
  const { page, setPage } = useContext(PageContext);
  return (
    <div className="pagination">
      {page !== 1 && (
        <button className="btn" onClick={() => setPage(page - 1)}>
          Prev Page
        </button>
      )}
      {hasNextPage && (
        <button className="btn" onClick={() => setPage(page + 1)}>
          Next Page
        </button>
      )}
    </div>
  );
}

export default Pagination;
