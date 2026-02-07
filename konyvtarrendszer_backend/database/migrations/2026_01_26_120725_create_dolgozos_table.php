<?php

use App\Models\Dolgozo;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
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
        Schema::create('dolgozok', function (Blueprint $table) {
            $table->id();
            $table->string('nev');
            $table->string('user_nev')->unique();
            $table->string('jelszo');
            $table->string('telefonszam');
            $table->integer('jogkor');
            $table->timestamps();
        });

        Dolgozo::create([
            "nev" => "Kovács Mária",
            "user_nev" => "konyvtar1",
            "jelszo" => "konyv123",
            "telefonszam" => "06203123456",
            "jogkor" => 1,
        ]);

        Dolgozo::create([
            "nev" => "Probst Attila",
            "user_nev" => "raktaros1",
            "jelszo" => "raktar123",
            "telefonszam" => "06205858417",
            "jogkor" => 2,
        ]);

        Dolgozo::create([
            "nev" => "Mogyorósi Merse",
            "user_nev" => "admin",
            "jelszo" => "admin123",
            "telefonszam" => "06205554848",
            "jogkor" => 0,
        ]);

        Dolgozo::create([
            "nev" => "Tóth Gyöngyvér",
            "user_nev" => "konyvtar2",
            "jelszo" => "konyv456",
            "telefonszam" => "06305684477",
            "jogkor" => 1,
        ]);

        Dolgozo::create([
            "nev" => "Szentendrey Klára",
            "user_nev" => "konyvtar3",
            "jelszo" => "konyv789",
            "telefonszam" => "06709258741",
            "jogkor" => 1,
        ]);

        Dolgozo::create([
            "nev" => "Papp Tamás",
            "user_nev" => "raktaros2",
            "jelszo" => "raktar456",
            "telefonszam" => "06206664512",
            "jogkor" => 2,
        ]);

        Dolgozo::create([
            "nev" => "Tóth Elemér",
            "user_nev" => "raktaros3",
            "jelszo" => "raktar789",
            "telefonszam" => "06707415821",
            "jogkor" => 2,
        ]);

        Dolgozo::create([
            "nev" => "Fekete Anna",
            "user_nev" => "konyvtar4",
            "jelszo" => "konyv111",
            "telefonszam" => "06704457781",
            "jogkor" => 1,
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
