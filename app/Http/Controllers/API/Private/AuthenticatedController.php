<?php

namespace App\Http\Controllers\API\Private;

use App\Http\Controllers\Controller;
use App\Models\Business;
use App\Models\User;
use Illuminate\Http\Request;

class AuthenticatedController extends Controller
{
    protected User $authUser;
    protected Business $currentBusiness;

    public function __construct(Request $request)
    {
        $this->authUser = $request->user();
        if ($this->authUser->currentBusiness) {
            $this->currentBusiness = $this->authUser->currentBusiness;
        } else {
            $this->currentBusiness = Business::where('id', $this->authUser->current_business_id)->firstOrFail();
        }
    }
}
