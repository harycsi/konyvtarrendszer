<?php

use App\Models\Dolgozo;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Schema;

class CreateDolgozosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('dolgozos', function (Blueprint $table) {
            $table->id();
            $table->string('nev');
            $table->string('user_nev')->unique();
            $table->string('jelszo');
            $table->string('telefonszam');
            $table->integer('role');
            $table->timestamps();
        });

        Dolgozo::create([
            "nev" => "Kovács Mária",
            "user_nev" => "konyvtar1",
            "jelszo" => Hash::make("konyv123"),
            "telefonszam" => "06203123456",
            "role" => 1,
        ]);

        Dolgozo::create([
            "nev" => "Probst Attila",
            "user_nev" => "raktaros1",
            "jelszo" => Hash::make("raktar123"),
            "telefonszam" => "06205858417",
            "role" => 2,
        ]);

        Dolgozo::create([
            "nev" => "Mogyorósi Merse",
            "user_nev" => "admin",
            "jelszo" => Hash::make("admin123"),
            "telefonszam" => "06205554848",
            "role" => 0,
        ]);

        Dolgozo::create([
            "nev" => "Tóth Gyöngyvér",
            "user_nev" => "konyvtar2",
            "jelszo" => Hash::make("konyv456"),
            "telefonszam" => "06305684477",
            "role" => 1,
        ]);

        Dolgozo::create([
            "nev" => "Szentendrey Klára",
            "user_nev" => "konyvtar3",
            "jelszo" => Hash::make("konyv789"),
            "telefonszam" => "06709258741",
            "role" => 1,
        ]);

        Dolgozo::create([
            "nev" => "Papp Tamás",
            "user_nev" => "raktaros2",
            "jelszo" => Hash::make("raktar456"),
            "telefonszam" => "06206664512",
            "role" => 2,
        ]);

        Dolgozo::create([
            "nev" => "Tóth Elemér",
            "user_nev" => "raktaros3",
            "jelszo" => Hash::make("raktar789"),
            "telefonszam" => "06707415821",
            "role" => 2,
        ]);

        Dolgozo::create([
            "nev" => "Fekete Anna",
            "user_nev" => "konyvtar4",
            "jelszo" => Hash::make("konyv111"),
            "telefonszam" => "06704457781",
            "role" => 1,
        ]);

    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('dolgozos');
    }
}
