<?php

namespace App\Http\Controllers\API\Private\Auth;

use App\Http\Controllers\Controller;
use App\Http\Resources\BusinessResource;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SelectBusinessController extends Controller
{
    public function show(Request $request)
    {
        $user = $request->user();

        $businesses = $user->businesses()->get();

        return Inertia::render('auth/select-business', [
            'businesses' => BusinessResource::collection($businesses)
        ]);
    }

    public function update(Request $request)
    {
        $request->validate([
            'business_id' => ['required', 'exists:businesses,uuid']
        ]);

        $user = $request->user();
        $selectedBusiness = $user->businesses()->where('uuid', $request->business_id)->first();
        if (!$selectedBusiness) {
            abort(403);
        }


        $user->current_business_id = $selectedBusiness->id;
        $user->save();

        return redirect('/dashboard');
    }
}
