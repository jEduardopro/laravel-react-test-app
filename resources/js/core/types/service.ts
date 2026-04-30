import { SharedPageProps } from '@inertiajs/core';
import { PaginatedResponse } from './pagination';

export type Service = {
    id: string;
    name: string;
    description: string | null;
    duration: number;
    buffer_time: number;
    price: string;
    notes: string | null;
    visible: boolean;
    position: number;
    created_at: string;
    updated_at: string;
}

// export type BusinessProps = SharedPageProps & {
//     businesses: Business[];
// }


export type PaginatedServices<TData> = SharedPageProps & {
	services: PaginatedResponse<TData>;
}