import { sortFilterTokens } from "@/app/api/lib";
import { useStore } from "@/store";
import { SORTING_BY } from "@/types/bubbles.type";
import { TokenFilterResultType } from "@/types/tokenFilterResultType.type";
import { useCallback, useEffect, useState } from "react";

enum ESortingBy {
    ASC = 'asc',
    DESC = 'desc'
}

const useSortedTokens = () => { 
    const {sortBy: sortingColumn} = useStore()
    const [tokens, setTokens] = useState<TokenFilterResultType[] | null>([]);
    const [sorting, setSorting] = useState([{ id: 'rank', desc: false }]);
    
    useEffect(() => {
        sortTokensByColumn(sortingColumn)
    }, [sortingColumn])

    const sortTokensByColumn = useCallback((columnId: SORTING_BY) => {
        const latestSorting = sorting.find((sort) => sort.id === columnId);
        const newDesc =  latestSorting ? !latestSorting.desc : false;
        const newSortBy = newDesc? ESortingBy.DESC: ESortingBy.ASC
        const sortedTokens = sortFilterTokens(tokens, columnId as keyof TokenFilterResultType, newSortBy)
        
        setTokens(sortedTokens)
        setSorting([{ id: columnId, desc: newDesc }]);
    }, [tokens]);
  
    return { sortTokensByColumn, tokens, setTokens, sorting}
}

export { useSortedTokens }