<?php

use App\Http\Controllers\AdatmodositasController;
use App\Http\Controllers\DolgozoController;
use App\Http\Controllers\FoglalasController;
use App\Http\Controllers\KolcsonzesController;
use App\Http\Controllers\KonyvController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

//A Stateless API alapelveit követem Sanctum hitelesítéssel, mert ez a modern és biztonságos út!
Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});

//Publikus (Bárki elérheti)
Route::post("/belepes", [DolgozoController::class, "login"]);
Route::post("/user-belepes", [UserController::class, "login"]);
Route::post("/regisztral", [UserController::class, "store"]);

//Védett útvonalak (csak érvényes tokennel)
Route::middleware('auth:sanctum')->group(function () {
Route::get("/konyvtar/keres", [KonyvController::class, "keres"]);
Route::get("/konyvek", [KonyvController::class, "index"]);
Route::get("/profil", [UserController::class, "profil"]);
Route::post("/profil/modositas", [AdatmodositasController::class, "store"]);
Route::post("/foglal", [FoglalasController::class, "store"]);
Route::get("/foglalas", [FoglalasController::class, "foglal"]);
Route::delete("/foglalas/{id}", [FoglalasController::class, "torol"]);
Route::get("/kolcsonzes", [KolcsonzesController::class, "kolcson"]);
Route::post("/kilepes", [UserController::class, "logout"]);

//Csak az Admin (0)
Route::middleware(['role:0'])->group(function () {
    Route::put("/user/{id}", [UserController::class, "update"]);
    Route::delete("/user/{id}", [UserController::class, "destroy"]);
    Route::post("/user/elfogad/{id}", [AdatmodositasController::class, "save"]);    
    Route::post("/user/elutasit/{id}", [AdatmodositasController::class, "reject"]);
    Route::apiResource("dolgozo", DolgozoController::class);
    });

//Csak a Könyvtáros (1)
Route::middleware(['role:1'])->group(function () {
    Route::get("/konyvtar/konyv-lista", [KonyvController::class, "index"]);
    Route::get("/konyvtar/foglalas-lista", [FoglalasController::class, "index"]);
    Route::get("/konyvtar/foglalas/{user_id}", [FoglalasController::class, "show"]);
    Route::delete("/konyvtar/foglalas/{id}", [FoglalasController::class, "destroy"]);
    Route::get("/konyvtar/kolcsonzes-lista", [KolcsonzesController::class, "index"]);
    Route::get("/konyvtar/kolcsonzes/{user_id}", [KolcsonzesController::class, "show"]);
    Route::post("/konyvtar/kolcsonzes", [KolcsonzesController::class, "store"]);
    Route::put("/konyvtar/kolcsonzes/{id}", [KolcsonzesController::class, "update"]);
    Route::delete("/konyvtar/kolcsonzes/{id}", [KolcsonzesController::class, "destroy"]);  
    
    });

//Csak a Raktáros (2)
Route::middleware(['role:2'])->group(function () {
    Route::post("/raktar/konyv", [KonyvController::class, "store"]);
    Route::put("/raktar/konyv/{id}", [KonyvController::class, "update"]);
    Route::delete("/raktar/konyv/{id}", [KonyvController::class, "destroy"]);
    });

//Admin is és Könyvtáros is
Route::middleware(['role:0,1'])->group(function () {
    Route::get("/user", [UserController::class, "index"]);
    Route::get("user/keres/{nev}", [UserController::class, "keres"]);
    Route::get("/user/{id}", [UserController::class, "show"]);
    });
});