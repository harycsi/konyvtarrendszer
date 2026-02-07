<?php

use App\Models\Kolcsonzes;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateKolcsonzesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('kolcsonzes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('kolcsonzok');
            $table->foreignId('konyv_id')->constrained('konyvek');
            $table->date('kolcs_datum');
            $table->date('vissza_datum')->nullable();
            $table->tinyInteger('email')->default(0);
            $table->foreignId('dolg_id')->constrained('dolgozok');
            $table->string('uzenet')->default("");
        });

        Kolcsonzes::create([
            "user_id" => 24,
            "konyv_id" =>30,
            "kolcs_datum" => '2025-10-15',
            "dolg_id" => 4,
        ]);

        Kolcsonzes::create([
            "user_id" => 7,
            "konyv_id" => 9,
            "kolcs_datum" => '2025-11-12',
            "dolg_id" => 1,
        ]);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('kolcsonzes');
    }
}
