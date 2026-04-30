<?php

namespace App\Domains\Services\UseCases;

use App\Core\UseCaseResponse;
use App\Domains\Services\Dtos\CreateServiceDto;
use App\Models\Business;
use App\Models\User;

class CreateService
{
    public function __construct(
        protected Business $business,
        protected CreateServiceDto $serviceDto,
        protected User|null $authUser = null
    ) {}

    public function perform(): UseCaseResponse
    {
        $createdService = $this->business->services()->create([
            'name'          => $this->serviceDto->getName(),
            'description'   => $this->serviceDto->getDescription(),
            'duration'      => $this->serviceDto->getDuration(),
            'buffer_time'   => $this->serviceDto->getBufferTime(),
            'price'         => $this->serviceDto->getPrice(),
            'notes'         => $this->serviceDto->getNotes(),
            'visible'       => $this->serviceDto->getVisible(),
            'position'      => $this->serviceDto->getPosition(),
        ]);

        return UseCaseResponse::success($createdService);
    }
}
