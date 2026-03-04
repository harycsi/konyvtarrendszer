<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */

    public function login(Request $request)
    {   
        $fields = $request->validate([
            'user_nev' => 'required|string',
            'jelszo' => 'required|string'
        ]);

        $user = User::where('user_nev', $fields['user_nev'])->first();

        if (!$user || !Hash::check($fields['jelszo'], $user->jelszo)) {
            return response()->json([
                'message' => 'Hibás felhasználónév vagy jelszó!'
            ], 401);
        }

        //Token generálása (React-nek)
        $token = $user->createToken('userToken')->plainTextToken;

        return response()->json([
            'user' => $user,
            'token' => $token,
            'message' => 'Sikeres bejelentkezés!'
        ], 200);
    }

    public function index()
    {
        return User::all();
    }

    public function keres(string $nev)
    {
        $nev = trim($nev);
        if (empty($nev)) {
            return response()->json([], 200);
        }

        $talalatok = User::where('nev', 'LIKE', '%' . $nev . '%')->get();
        return response()->json($talalatok, 200);      
    }

    public function show(string $id)
    {
        return User::find($id);
    } 

    public function store(Request $request)
    {
        $request->validate([
            'nev' => 'required|string|max:255',
            'user_nev' => 'required|string|unique:users,user_nev|max:100',
            'email_cim' => 'required|email|unique:users,email_cim',
            'jelszo' => 'required|min:6',
            'lakcim' => 'nullable|string',
            'telefonszam' => 'nullable|string|max:20',
        ]);

        $user = new User();
        $user->nev = $request->nev;
        $user->user_nev = $request->user_nev;
        $user->email_cim = $request->email_cim;
        $user->lakcim = $request->lakcim;
        $user->telefonszam = $request->telefonszam;
    
        //Titkosítjuk a jelszót, mielőtt elmentjük!
        $user->jelszo = Hash::make($request->jelszo); 

        $user->save();

        return response()->json([
            'message' => 'Sikeres regisztráció!',
            'user' => $user
        ], 201);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $user = User::findOrFail($id);
        $adatok = $request->all();

        if ($request->has('jelszo')) {
        $adatok['jelszo'] = Hash::make($request->jelszo);
        }

        $user->update($adatok);
        return response()->json($user, 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $user = User::findOrFail($id);
        $user->delete();
        return response()->json(['message' => 'Felhasználó törölve'] ,200);
    }

    public function profil(Request $request)
    {
    return response()->json($request->user());
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();
        return response(['message' => 'Sikeres kijelentkezés!'], 200);
    }
}