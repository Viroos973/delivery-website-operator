import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink, PaginationNext,
    PaginationPrevious
} from "@/components/ui/pagination.tsx";
import {useCustomPagination} from "@/components/Pagination/hooks/useCustomPagination.ts";

interface PaginationProps {
    totalPages: number,
    isGoToStart?: boolean,
    setPage?: (page: number) => void
}

const CustomPagination = ({ totalPages, isGoToStart, setPage }: PaginationProps) => {
    const { state, functions } = useCustomPagination(totalPages, isGoToStart, setPage);

    return totalPages > 1 && (
        <Pagination>
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious onClick={functions.prevPage} />
                </PaginationItem>
                {state.paginationRange.map(page => (
                    <PaginationItem>
                        <PaginationLink onClick={() => functions.goToPage(page)} isActive={page === state.currentPage}>
                            {page}
                        </PaginationLink>
                    </PaginationItem>
                ))}
                <PaginationItem>
                    <PaginationNext onClick={functions.nextPage} />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    )
}

export default CustomPagination