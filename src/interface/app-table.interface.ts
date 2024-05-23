import { ColumnDef } from '@tanstack/react-table';

export type useColumnsProps<T> = ColumnDef<T> & { searchInput?: boolean };
