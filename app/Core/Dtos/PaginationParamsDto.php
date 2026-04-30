<?php

namespace App\Core\Dtos;

use App\Http\Requests\Core\PaginationParamsRequest;

class PaginationParamsDto
{
    private string $sort_direction;
    
    public function __construct(
        private int $per_page = 15,
        private string $sort_field = 'created_at',
        string $sort_direction = 'desc',
        private string|null $pattern = null,
        private ?string $start_date = null,
        private ?string $end_date = null,
    ) {
        $this->sort_direction = in_array($sort_direction, ['asc','desc'])
            ? $sort_direction
            : 'desc';
    }

    public static function fromRequest(PaginationParamsRequest $request): static
    {
        return new self(
            $request->validated('per_page', 15),
            $request->validated('sort_field', 'created_at'),
            $request->validated('sort_direction', 'desc'),
            $request->validated('pattern'),
            $request->validated('start_date'),
            $request->validated('end_date'),
        );
    }

    public function getPerPage(): int { return $this->per_page; }
    public function getSortField(): string { return $this->sort_field; }
    public function getSortDirection(): string { return $this->sort_direction; }
    public function getPattern(): ?string { return $this->pattern; }
    public function getStartDate(): ?string { return $this->start_date; }
    public function getEndDate(): ?string { return $this->end_date; }

    public function toArray(): array
    {
        return [
            'per_page' => $this->getPerPage(),
            'sort_field' => $this->getSortField(),
            'sort_direction' => $this->getSortDirection(),
            'pattern' => $this->getPattern(),
            'start_date' => $this->getStartDate(),
            'end_date' => $this->getEndDate(),
        ];
    }
}
