<?php

namespace App\Domains\Services\UseCases;

use App\Core\UseCaseResponse;
use App\Core\UseCases\PaginatedResource;

class GetPaginatedServices extends PaginatedResource
{
    public function perform()
    {
        $paginatedServices = $this->business->services()
            ->searchByPattern($this->paginationParams->getPattern())
            ->dateRange($this->paginationParams->getStartDate(), $this->paginationParams->getEndDate())
            ->orderBy($this->paginationParams->getSortField(), $this->paginationParams->getSortDirection())
            ->paginate(perPage: $this->paginationParams->getPerPage())->onEachSide(1);

        return UseCaseResponse::success($paginatedServices);
    }
}
