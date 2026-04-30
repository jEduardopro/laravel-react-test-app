<?php

namespace App\Http\Controllers\API\Private\Services;

use App\Core\Dtos\PaginationParamsDto;
use App\Domains\Services\Dtos\CreateServiceDto;
use App\Domains\Services\UseCases\CreateService;
use App\Domains\Services\UseCases\GetPaginatedServices;
use App\Http\Controllers\API\Private\AuthenticatedController;
use App\Http\Requests\Core\PaginationParamsRequest;
use App\Http\Requests\Services\CreateServiceFormRequest;
use App\Http\Resources\ServiceResource;
use Inertia\Inertia;

class ServicesController extends AuthenticatedController
{
    public function index(PaginationParamsRequest $request)
	{
		$paramsDto = PaginationParamsDto::fromRequest($request);
		$response = (new GetPaginatedServices($this->currentBusiness, $paramsDto))->perform();

		return Inertia::render('admin/services/index', [
			'services' => ServiceResource::collection($response->data),
			'queryParams' => $request->validated() ?: $paramsDto->toArray()
		]);
	}

    public function store(CreateServiceFormRequest $request)
    {
        $response = (new CreateService($this->currentBusiness, CreateServiceDto::fromRequest($request), $this->authUser))->perform();

        if (!$response->isSuccess()) {
            return redirect()->back()->withErrors(['message' => $response->error->getMessage()]);
        }

        return to_route('services.index');
    }
}
