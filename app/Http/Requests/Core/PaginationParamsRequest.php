<?php

namespace App\Http\Requests\Core;

use Illuminate\Foundation\Http\FormRequest;

class PaginationParamsRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'per_page' => 'integer|nullable|min:1|max:100',
            'sort_field' => 'string|nullable',
            'sort_direction' => 'string|in:desc,asc|nullable',
            'pattern' => 'string|nullable',
            'start_date' => ['date', 'nullable'],
            'end_date' => ['date', 'nullable', 'after_or_equal:start_date'],
        ];
    }
}
