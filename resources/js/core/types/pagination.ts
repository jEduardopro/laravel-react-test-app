export type PaginatedResponse<TData> = {
    data: TData;
    links: Links;
    meta: Meta;
}

export interface Link {
    url: null | string;
    label: string;
    active: boolean;
}

export interface Links {
    first: string;
    last: string;
    prev: string | null;
    next: string | null;
}

export interface Meta {
    current_page: number;
    from: number;
    last_page: number;
    links: Link[];
    path: string;
    per_page: number;
    to: number;
    total: number;
}

export type SortDirection = "asc" | "desc";

export type QueryParams = {
    end_date?: string | null;
    pattern?: string | null;
    per_page?: string | null;
    sort_direction?: SortDirection | null;
    sort_field?: string | null;
    start_date?: string | null;
} & {
    [k: string]: string
}

export type PaginatioDataParams = {
    page: number;
    per_page: number;
}