<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\TripadvisorService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Validation\Rule;

class PlaceController extends Controller
{
    public function __construct(private TripadvisorService $places) {}

    public function options()
    {
        return response()->json([
            'categories'  => config('places.categories'),
            'place_types' => config('places.place_types'),
        ]);
    }

    public function search(Request $request)
    {
        $categories = collect(config('places.categories'));
        $types      = collect(config('places.place_types'));

        $data = $request->validate([
            'region'   => ['required', 'string', 'min:2', 'max:80'],
            'category' => ['required', Rule::in($categories->pluck('key'))],
            'type'     => ['nullable', 'required_if:category,tempat', Rule::in($types->pluck('key'))],
        ]);

        $category  = $categories->firstWhere('key', $data['category']);
        $queryText = $category['query'];

        if ($category['has_types']) {
            $queryText = $types->firstWhere('key', $data['type'])['query'];
        }

        $region   = trim(preg_replace('/\s+/', ' ', $data['region']));
        $cacheKey = 'places:ta:' . md5(mb_strtolower($region) . '|' . $queryText . '|' . $category['ta_category']);

        try {
            $places = Cache::remember(
                $cacheKey,
                now()->addMinutes(config('places.cache_minutes')),
                fn () => $this->places->search($region, $queryText, $category['ta_category'])
            );
        } catch (\Throwable $e) {
            report($e);
            return response()->json([
                'message' => 'Gagal mengambil data dari Tripadvisor. Coba lagi sebentar.',
                'debug'   => config('app.debug') ? $e->getMessage() : null,
            ], 502);
        }

        return response()->json([
            'region'   => $region,
            'category' => $category['label'],
            'places'   => $places,
        ]);
    }
}