<?php

namespace App\Http\Controllers;

use App\Models\Kolcsonzes;
use App\Models\Konyv;
use Illuminate\Http\Request;

class KolcsonzesController extends Controller
{
    public function index()
    {
        return Kolcsonzes::all();
    }

     public function show($user_id)
    {
        return Kolcsonzes::find($user_id);
    }

    public function store(Request $request)
    {
        $kolcsonzes = new Kolcsonzes();
        $kolcsonzes->fill($request->all());
        $kolcsonzes->save();
        $kolcsonzes->refresh();

        $konyv = Konyv::find($request->konyv_id);    
        $konyv->refresh();
        
        return response()->json($kolcsonzes,$konyv);
    }

    public function destroy($user_id, Request $request)
    {
        $kolcsonzes = Kolcsonzes::find($user_id);
        $kolcsonzes->delete();

        $konyv = Konyv::find($request->konyv_id);    
        $konyv->refresh();

        return response()->json(null,200);
    }

}
