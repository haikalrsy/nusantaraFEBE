<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Culture;
use Illuminate\Http\Request;

class CultureController extends Controller
{
    public function index(Request $request)
    {
        $query = Culture::query();

        if ($request->filled('island')) {
            $query->where('island', $request->query('island'));
        }

        if ($request->filled('category') && $request->query('category') !== 'Semua') {
            $query->where('category', $request->query('category'));
        }

        if ($request->filled('search')) {
            $search = $request->query('search');
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                  ->orWhere('place', 'like', "%{$search}%")
                  ->orWhere('summary', 'like', "%{$search}%");
            });
        }

        return response()->json($query->get());
    }

    public function show($slug)
    {
        $culture = Culture::where('slug', $slug)->firstOrFail();
        return response()->json($culture);
    }
}
