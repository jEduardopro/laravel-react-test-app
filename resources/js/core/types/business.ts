import { SharedPageProps } from '@inertiajs/core';

export type Business = {
    id: string;
    name: string;
    slug: string;
    description?: string | null;
}

export type BusinessProps = SharedPageProps & {
    businesses: Business[];
}
