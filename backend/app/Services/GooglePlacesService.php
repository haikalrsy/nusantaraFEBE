<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use RuntimeException;

class GooglePlacesService
{
    private const SEARCH_URL = 'https://places.googleapis.com/v1/places:searchText';
    private const MEDIA_URL  = 'https://places.googleapis.com/v1/';

    private function key(): string
    {
        $key = config('services.google_places.key');
        if (!$key) {
            throw new RuntimeException('GOOGLE_PLACES_API_KEY belum diisi di .env');
        }
        return $key;
    }

    /** @return array<int, array<string, mixed>> */
    public function search(string $region, string $categoryQuery): array
    {
        $res = Http::timeout(10)
            ->withHeaders([
                'X-Goog-Api-Key'   => $this->key(),
                'X-Goog-FieldMask' => implode(',', [
                    'places.id',
                    'places.displayName',
                    'places.formattedAddress',
                    'places.rating',
                    'places.userRatingCount',
                    'places.googleMapsUri',
                    'places.photos',
                    'places.primaryTypeDisplayName',
                ]),
            ])
            ->post(self::SEARCH_URL, [
                'textQuery'      => "{$categoryQuery} di {$region}",
                'languageCode'   => 'id',
                'regionCode'     => 'ID',
                'maxResultCount' => config('places.max_results'),
            ]);

        if ($res->failed()) {
            throw new RuntimeException('Google Places error: ' . $res->status() . ' ' . $res->body());
        }

        $priorRating = config('places.prior_rating');
        $priorWeight = config('places.prior_weight');

        return collect($res->json('places', []))
            ->map(function (array $p) use ($priorRating, $priorWeight) {
                $rating = $p['rating'] ?? null;
                $count  = $p['userRatingCount'] ?? 0;

                return [
                    'id'       => $p['id'],
                    'name'     => $p['displayName']['text'] ?? '-',
                    'type'     => $p['primaryTypeDisplayName']['text'] ?? null,
                    'address'  => $p['formattedAddress'] ?? null,
                    'rating'   => $rating,
                    'reviews'  => $count,
                    'maps_url' => $p['googleMapsUri'] ?? null,
                    'photo'    => $p['photos'][0]['name'] ?? null,
                    'score'    => $rating === null
                        ? 0
                        : ($rating * $count + $priorRating * $priorWeight) / ($count + $priorWeight),
                ];
            })
            ->sortByDesc('score')
            ->values()
            ->map(fn (array $p) => collect($p)->except('score')->all())
            ->all();
    }

    /** Mengambil byte gambar dari Google. Return [body, contentType]. */
    public function photo(string $name, int $width = 600): array
    {
        $res = Http::timeout(10)
            ->withHeaders(['X-Goog-Api-Key' => $this->key()])
            ->get(self::MEDIA_URL . $name . '/media', ['maxWidthPx' => $width]);

        if ($res->failed()) {
            throw new RuntimeException('Google photo error: ' . $res->status());
        }

        return [$res->body(), $res->header('Content-Type') ?: 'image/jpeg'];
    }
}