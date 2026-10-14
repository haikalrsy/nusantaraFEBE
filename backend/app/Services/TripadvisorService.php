<?php

namespace App\Services;

use Illuminate\Http\Client\Pool;
use Illuminate\Http\Client\Response;
use Illuminate\Support\Facades\Http;
use RuntimeException;

class TripadvisorService
{
    private const BASE = 'https://api.content.tripadvisor.com/api/v1';

    private function key(): string
    {
        $key = config('services.tripadvisor.key');
        if (!$key) {
            throw new RuntimeException('TRIPADVISOR_API_KEY belum diisi di .env');
        }
        return $key;
    }

    /** @return array<int, array<string, mixed>> */
    public function search(string $region, string $query, string $taCategory): array
    {
        $key = $this->key();

        // 1) Cari lokasi
        $res = Http::timeout(10)->acceptJson()->get(self::BASE . '/location/search', [
            'key'         => $key,
            'searchQuery' => "{$query} {$region}",
            'category'    => $taCategory,
            'language'    => 'id',
        ]);

        if ($res->failed()) {
            throw new RuntimeException('Tripadvisor search error: ' . $res->status() . ' ' . $res->body());
        }

        $found = collect($res->json('data', []))
            ->filter(fn ($l) => !empty($l['location_id']))
            ->take(config('places.max_results'))
            ->keyBy(fn ($l) => (string) $l['location_id']);

        if ($found->isEmpty()) {
            return [];
        }

        // 2) Ambil detail (rating, jumlah ulasan, link) secara paralel
        $detailRes = Http::pool(fn (Pool $pool) => $found->keys()->map(
            fn ($id) => $pool->as((string) $id)->timeout(10)->acceptJson()
                ->get(self::BASE . "/location/{$id}/details", ['key' => $key, 'language' => 'id'])
        )->all());

        $priorRating = config('places.prior_rating');
        $priorWeight = config('places.prior_weight');

        $places = $found->map(function (array $l, string $id) use ($detailRes, $priorRating, $priorWeight) {
            $r = $detailRes[$id] ?? null;
            $d = ($r instanceof Response && $r->successful()) ? $r->json() : [];

            $rating  = isset($d['rating']) ? (float) $d['rating'] : null;
            $reviews = (int) ($d['num_reviews'] ?? 0);

            return [
                'id'      => $id,
                'name'    => $d['name'] ?? $l['name'] ?? '-',
                'type'    => $d['subcategory'][0]['localized_name'] ?? $d['category']['localized_name'] ?? null,
                'address' => $d['address_obj']['address_string'] ?? $l['address_obj']['address_string'] ?? null,
                'rating'  => $rating,
                'reviews' => $reviews,
                'url'     => $d['web_url'] ?? null,
                'photo'   => null,
                'score'   => $rating === null
                    ? 0
                    : ($rating * $reviews + $priorRating * $priorWeight) / ($reviews + $priorWeight),
            ];
        })->sortByDesc('score')->values();

        // 3) Foto hanya untuk hasil teratas
        $top = $places->take(config('places.photos_for_top'))->pluck('id');

        if ($top->isNotEmpty()) {
            $photoRes = Http::pool(fn (Pool $pool) => $top->map(
                fn ($id) => $pool->as((string) $id)->timeout(10)->acceptJson()
                    ->get(self::BASE . "/location/{$id}/photos", ['key' => $key, 'language' => 'id', 'limit' => 1])
            )->all());

            $places = $places->map(function (array $p) use ($photoRes) {
                $r = $photoRes[$p['id']] ?? null;
                if ($r instanceof Response && $r->successful()) {
                    $img = $r->json('data.0.images', []);
                    $p['photo'] = $img['large']['url'] ?? $img['medium']['url'] ?? $img['original']['url'] ?? null;
                }
                return $p;
            });
        }

        return $places->map(fn (array $p) => collect($p)->except('score')->all())->all();
    }
}