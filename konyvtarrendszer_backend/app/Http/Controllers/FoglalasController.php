<?php

namespace App\Http\Controllers;

use App\Models\Foglalas;
use App\Models\Konyv;
use Illuminate\Http\Request;


class FoglalasController extends Controller
{
    public function index()
    {
        return Foglalas::all();
    }

    public function show($user_id)
    {
        return Foglalas::find($user_id);
    }

    public function store(Request $request)
    {
        $foglalas = new Foglalas();
        $foglalas->fill($request->all());
        $foglalas->save();
        $foglalas->refresh();

        $konyv = Konyv::find($request->konyv_id);
        $konyv->refresh();
        
        return response()->json($foglalas,$konyv);
    }

    public function update(Request $request, $user_id)
    {
        $foglalas = Foglalas::find($user_id);
        $foglalas->fill($request->all());
        $foglalas->save();
        $foglalas->refresh();

        $konyv = Konyv::find($request->konyv_id);
        $konyv->refresh();

        return response()->json($user_id, 201);
    }

    public function destroy($user_id, Request $request)
    {
        $foglalas = Foglalas::find($user_id);
        $foglalas->delete();

        $konyv = Konyv::find($request->konyv_id);    
        $konyv->refresh();

        return response()->json(null,200);
    }

}
