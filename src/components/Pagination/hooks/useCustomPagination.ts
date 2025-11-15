import {useEffect, useMemo, useState} from "react";
import {useSearchParams} from "react-router-dom";

export const useCustomPagination = (totalPages: number, isGoToStart?: boolean, setPage?: (page: number) => void) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const initialPage = useMemo(() => {
        const pageFromUrl = parseInt(searchParams.get('page') || '1');
        return Math.max(1, Math.min(pageFromUrl, totalPages));
    }, []);

    const [currentPage, setCurrentPage] = useState(initialPage);

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);

        if (currentPage === 1) {
            params.delete('page');
        } else {
            params.set('page', currentPage.toString());
        }

        setSearchParams(params, { replace: true });
    }, [currentPage]);

    useEffect(() => {
        if (isGoToStart !== undefined) setCurrentPage(1)
    }, [isGoToStart]);

    const paginationRange = useMemo(() => {
        const pages = [];
        const maxVisiblePages = 3;

        let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
        let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

        if (endPage - startPage + 1 < maxVisiblePages) {
            startPage = Math.max(1, endPage - maxVisiblePages + 1);
        }

        for (let i = startPage; i <= endPage; i++) {
            pages.push(i);
        }

        return pages;
    }, [currentPage, totalPages]);

    const goToPage = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
            if (setPage) setPage(page);
        }
    };

    const nextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
            if (setPage) setPage(currentPage + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
            if (setPage) setPage(currentPage - 1);
        }
    };

    return {
        state: { paginationRange, currentPage },
        functions: { goToPage, prevPage, nextPage }
    }
}