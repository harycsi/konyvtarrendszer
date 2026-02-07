<?php

use App\Http\Controllers\FoglalasController;
use App\Http\Controllers\KolcsonzesController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get("/foglalas", [FoglalasController::class, "index"]);
Route::get("/foglalas/{user_id}", [FoglalasController::class, "show"]);
Route::post("/foglalas", [FoglalasController::class, "store"]);
Route::put("/foglalas/{user_id}", [FoglalasController::class, "update"]);
Route::delete("/foglalas/{user_id}", [FoglalasController::class, "destroy"]);

Route::get("/kolcsonzes", [KolcsonzesController::class, "index"]);
Route::get("/kolcsonzes/{user_id}", [KolcsonzesController::class, "show"]);
Route::post("/kolcsonzes", [KolcsonzesController::class, "store"]);
Route::delete("/kolcsonzes/{user_id}", [KolcsonzesController::class, "destroy"]);

