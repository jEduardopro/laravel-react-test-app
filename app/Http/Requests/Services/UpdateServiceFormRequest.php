<?php

namespace App\Http\Requests\Services;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class UpdateServiceFormRequest extends FormRequest
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
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => [
                'required',
                'string',
                'max:255',
            ],

            'description' => [
                'nullable',
                'string',
                'max:1000',
            ],

            'duration' => [
                'required',
                'integer',
                'min:1', // minutes
                'max:1440', // 24h safety cap
            ],

            'buffer_time' => [
                'nullable',
                'integer',
                'min:0',
                'max:1440',
            ],

            'price' => [
                'required',
                'numeric',
                'min:0',
                'max:999999.99',
            ],

            'notes' => [
                'nullable',
                'string',
                'max:2000',
            ],

            'visible' => [
                'required',
                'boolean',
            ],

            'position' => [
                'nullable',
                'integer',
                'min:0',
            ],
        ];
    }

    /**
     * Optional: sanitize input before validation
     */
    protected function prepareForValidation(): void
    {
        $this->merge([
            'visible' => filter_var($this->visible, FILTER_VALIDATE_BOOLEAN),
        ]);
    }
}
