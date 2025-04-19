import './Pagination.css';

function Pagination({ currentPage, totalPages, onPageChange }) {
    return (
        <div className="pagination">
            <button 
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage <= 1}
            >
                &lt; Poprzednia
            </button>
            
            <span className="page-info">
                Strona {currentPage} z {totalPages}
            </span>

            <button 
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage >= totalPages}
            >
                Następna &gt;
            </button>
        </div>
    );
}

export default Pagination;