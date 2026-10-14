<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\IslandController;
use App\Http\Controllers\Api\CultureController;
use App\Http\Controllers\Api\PlaceController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

// Nusantara Cultural API Endpoints
Route::get('/islands', [IslandController::class, 'index']);
Route::get('/islands/{slug}', [IslandController::class, 'show']);

Route::get('/cultures', [CultureController::class, 'index']);
Route::get('/cultures/{slug}', [CultureController::class, 'show']);

// Rekomendasi tempat (Tripadvisor)
Route::prefix('places')->group(function () {
    Route::get('/options', [PlaceController::class, 'options']);
    Route::get('/search', [PlaceController::class, 'search'])->middleware('throttle:30,1');
});