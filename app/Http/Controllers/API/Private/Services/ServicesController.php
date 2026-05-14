<?php

namespace App\Http\Controllers\API\Private\Services;

use App\Core\Dtos\PaginationParamsDto;
use App\Domains\Services\Dtos\CreateServiceDto;
use App\Domains\Services\Dtos\UpdateServiceDto;
use App\Domains\Services\UseCases\CreateService;
use App\Domains\Services\UseCases\GetPaginatedServices;
use App\Domains\Services\UseCases\GetServiceByUuid;
use App\Domains\Services\UseCases\SoftDeleteService;
use App\Domains\Services\UseCases\UpdateService;
use App\Http\Controllers\API\Private\AuthenticatedController;
use App\Http\Requests\Core\PaginationParamsRequest;
use App\Http\Requests\Services\CreateServiceFormRequest;
use App\Http\Requests\Services\UpdateServiceFormRequest;
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

    public function create()
    {
        return Inertia::render('admin/services/create');
    }

    public function store(CreateServiceFormRequest $request)
    {
        $response = (new CreateService($this->currentBusiness, CreateServiceDto::fromRequest($request), $this->authUser))->perform();

        if (!$response->isSuccess()) {
            return redirect()->back()->withErrors(['message' => $response->error->getMessage()]);
        }

        return to_route('services.index');
    }

    public function edit(string $uuid)
    {
        $response = (new GetServiceByUuid($this->currentBusiness))->perform($uuid);

        if (!$response->isSuccess()) {
            return redirect()->back()->withErrors(['message' => $response->error->getMessage()]);
        }

        return Inertia::render('admin/services/edit', ['service' => ServiceResource::make($response->data)]);
    }

    public function update(UpdateServiceFormRequest $request, string $uuid)
	{
        $response = (new UpdateService($this->currentBusiness, UpdateServiceDto::fromRequest($request), $this->authUser))->perform($uuid);

        if (!$response->isSuccess()) {
            return redirect()->back()->withErrors(['message' => $response->error->getMessage()]);
        }

        return to_route('services.index');
	}

    public function destroy(string $uuid) 
    {
        $response = (new SoftDeleteService($this->currentBusiness, $this->authUser))->perform($uuid);

        if (!$response->isSuccess()) {
            return redirect()->back()->withErrors(['message' => $response->error->getMessage()]);
        }

        return to_route('services.index');
    }
}
