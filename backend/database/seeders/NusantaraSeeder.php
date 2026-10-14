<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Island;
use App\Models\Culture;
use Illuminate\Support\Facades\File;

class NusantaraSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $islandsPath = database_path('data_islands.json');
        if (File::exists($islandsPath)) {
            $islandsData = json_decode(File::get($islandsPath), true);
            foreach ($islandsData as $item) {
                Island::updateOrCreate(
                    ['slug' => $item['slug']],
                    [
                        'name' => $item['name'],
                        'image' => $item['image'] ?? null,
                        'tagline' => $item['tagline'] ?? null,
                        'description' => $item['description'] ?? null,
                        'narration' => $item['narration'] ?? null,
                        'stats' => $item['stats'] ?? null,
                        'highlights' => $item['highlights'] ?? null,
                    ]
                );
            }
        }

        $culturesPath = database_path('data_cultures.json');
        if (File::exists($culturesPath)) {
            $culturesData = json_decode(File::get($culturesPath), true);
            foreach ($culturesData as $item) {
                Culture::updateOrCreate(
                    ['slug' => $item['slug']],
                    [
                        'title' => $item['title'],
                        'category' => $item['category'],
                        'island' => $item['island'],
                        'place' => $item['place'],
                        'summary' => $item['summary'] ?? null,
                        'description' => $item['description'] ?? null,
                        'src' => $item['src'] ?? null,
                        'gallery' => $item['gallery'] ?? null,
                        'funFacts' => $item['funFacts'] ?? null,
                        'credit' => $item['credit'] ?? null,
                    ]
                );
            }
        }
    }
}
