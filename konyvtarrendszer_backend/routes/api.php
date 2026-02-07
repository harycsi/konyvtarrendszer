<?php

use App\Http\Controllers\FoglalasController;
use App\Http\Controllers\KolcsonzesController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get("/foglalasok", [FoglalasController::class, "index"]);
Route::get("/foglalasok/{user_id}", [FoglalasController::class, "show"]);
Route::post("/foglalasok", [FoglalasController::class, "store"]);
Route::put("/foglalasok/{user_id}", [FoglalasController::class, "update"]);
Route::delete("/foglalasok/{user_id}", [FoglalasController::class, "destroy"]);

Route::get("/kolcsonzesek", [KolcsonzesController::class, "index"]);
Route::get("/kolcsonzesek/{user_id}", [KolcsonzesController::class, "show"]);
Route::post("/kolcsonzesek", [KolcsonzesController::class, "store"]);
Route::delete("/kolcsonzesek/{user_id}", [KolcsonzesController::class, "destroy"]);

