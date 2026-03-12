<?php

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
Route::post("/belepes", [DolgozoController::class, "login"]); //pipa
Route::post("/user-belepes", [UserController::class, "login"]); //pipa
Route::post("/regisztral", [UserController::class, "store"]); //pipa

//Védett útvonalak (csak érvényes tokennel)
Route::middleware('auth:sanctum')->group(function () {
Route::get("/konyvtar/keres", [KonyvController::class, "keres"]); //pipa
Route::get("/konyvtar/konyv-lista", [KonyvController::class, "index"]); //pipa
Route::get("/profil", [UserController::class, "profil"]);  //pipa
Route::post("/foglal", [FoglalasController::class, "store"]); //pipa
Route::get("/foglalas", [FoglalasController::class, "foglal"]); //pipa
Route::delete("/foglalas/{id}", [FoglalasController::class, "torol"]); //pipa
Route::get("/kolcsonzes", [KolcsonzesController::class, "kolcson"]); //pipa
Route::post("/kilepes", [UserController::class, "logout"]);

//Csak az Admin (0)
Route::middleware(['role:0'])->group(function () {
    Route::put("/user/{id}", [UserController::class, "update"]);
    Route::delete("/user/{id}", [UserController::class, "destroy"]);
    Route::apiResource("dolgozo", DolgozoController::class);
    });

//Csak a Könyvtáros (1)
Route::middleware(['role:1'])->group(function () {
    Route::get("/konyvtar/foglalas-lista", [FoglalasController::class, "index"]);  //pipa
    Route::get("/konyvtar/foglalas/{user_id}", [FoglalasController::class, "show"]);
    Route::put("/konyvtar/foglalas/{user_id}", [FoglalasController::class, "update"]);
    Route::delete("/konyvtar/foglalas/{id}", [FoglalasController::class, "destroy"]);
    Route::get("/konyvtar/kolcsonzes-lista", [KolcsonzesController::class, "index"]);   //pipa
    Route::get("/konyvtar/kolcsonzes/{user_id}", [KolcsonzesController::class, "show"]);
    Route::get("/konyvtar/kolcsonzes/lejart", [KolcsonzesController::class, "lejartKolcsonzesek"]);
    Route::post("/konyvtar/kolcsonzes", [KolcsonzesController::class, "store"]);
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