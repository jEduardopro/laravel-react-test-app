<?php

namespace App\Domains\Services\UseCases;

use App\Core\UseCaseResponse;
use App\Domains\Services\Dtos\UpdateServiceDto;
use App\Models\Business;
use App\Models\User;

class UpdateService
{
    public function __construct(
        protected Business $business,
        protected UpdateServiceDto $serviceDto,
        protected User|null $authUser = null
    ) {}

    public function perform(string $uuid): UseCaseResponse
    {
        $response = (new GetServiceByUuid($this->business))->perform($uuid);

        if (!$response->isSuccess()) {
            return UseCaseResponse::addBadRequestError($response->error->getMessage());
        }

        $service = $response->data;

        $service->update([
            'name'          => $this->serviceDto->getName(),
            'description'   => $this->serviceDto->getDescription(),
            'duration'      => $this->serviceDto->getDuration(),
            'buffer_time'   => $this->serviceDto->getBufferTime(),
            'price'         => $this->serviceDto->getPrice(),
            'notes'         => $this->serviceDto->getNotes(),
            'visible'       => $this->serviceDto->getVisible(),
            'position'      => $this->serviceDto->getPosition(),
        ]);

        return UseCaseResponse::success($service);
    }
}
