<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Island;
use Illuminate\Http\Request;

class IslandController extends Controller
{
    public function index()
    {
        return response()->json(Island::all());
    }

    public function show($slug)
    {
        $island = Island::where('slug', $slug)->firstOrFail();
        return response()->json($island);
    }
}
