<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreDolgozoRequest;
use App\Http\Requests\UpdateDolgozoRequest;
use App\Models\Dolgozo;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class DolgozoController extends Controller
{
    public function login(Request $request)
    {
        $fields = $request->validate([
            'user_nev' => 'required|string',
            'jelszo' => 'required|string'
        ]);

        $dolgozo = Dolgozo::where('user_nev', $fields['user_nev'])->first();

        if (!$dolgozo || !Hash::check($fields['jelszo'], $dolgozo->jelszo)) {
            return response([
                'message' => 'Hibás felhasználó név vagy jelszó!'
            ], 401);
        }

        $token = $dolgozo->createToken('dolgozoToken')->plainTextToken;

        return response([
            'user' => $dolgozo,
            'token' => $token,
            'message' => 'Sikeres bejelentkezés!'
        ], 200);
    }
    
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Dolgozo::all();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreDolgozoRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreDolgozoRequest $request)
    {
        $adatok = $request->except('jelszo');
        $dolgozo = new Dolgozo($adatok);
        $dolgozo->jelszo = Hash::make($request->jelszo);
        $dolgozo->save();
        return response()->json($dolgozo, 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Dolgozo  $dolgozo
     * @return \Illuminate\Http\Response
     */
    public function show(string $id)
    {
        return Dolgozo::find($id);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateDolgozoRequest  $request
     * @param  \App\Models\Dolgozo  $dolgozo
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateDolgozoRequest $request, string $id)
    {
        $dolgozo = Dolgozo::findOrFail($id);
        $dolgozo->fill($request->except('jelszo'));
        if($request->has('jelszo')){
             $dolgozo->jelszo = Hash::make($request->jelszo);
        }
       
        $dolgozo->save();
        return response()->json($dolgozo, 201);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Dolgozo  $dolgozo
     * @return \Illuminate\Http\Response
     */

    public function destroy(string $id)
    {
        $dolgozo = Dolgozo::find($id);
        if (!$dolgozo) {
            return response()->json(['message' => 'Nincs ilyen dolgozó'], 404);
        }

        $dolgozo->delete();
        return response()->json(['message' => 'Törölve'], 200);
    }
}