import { TokenFilterResultType } from "@/types/tokenFilterResultType.type";

type SortableFields = keyof TokenFilterResultType | 'links' | 'name';

export function sortFilterTokens(
  filterTokens: TokenFilterResultType[] | null,
  field: SortableFields,
  order: 'asc' | 'desc'
): TokenFilterResultType[] | null {
  if (!filterTokens) return null;

  const newTokenList = [...filterTokens];

  if (field === 'links') return newTokenList;

  if (field === 'name') {
    return newTokenList.sort((a, b) => {
      const aValue = a.token.name;
      const bValue = b.token.name;
      return replaceStringElements[order](aValue, bValue);
    });
  }

  return newTokenList.sort((a, b) => {
    const aValue = a[field] as number;
    const bValue = b[field] as number;
    return replaceNumericElements[order](aValue, bValue);
  });
}

const replaceNumericElements = {
  'asc': (a: number, b: number) => a - b,
  'desc': (a: number, b: number) => b - a,
};

const replaceStringElements = {
  'asc': (a: string, b: string) => a.localeCompare(b),
  'desc': (a: string, b: string) => b.localeCompare(a),
};