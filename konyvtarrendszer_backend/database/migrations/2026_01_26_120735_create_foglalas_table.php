<?php

use App\Models\Foglalas;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateFoglalasTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('foglalas', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('kolcsonzok');
            $table->foreignId('konyv_id')->constrained('konyvek');
            $table->timestamp('fogl_datum')->useCurrent();
        });

        Foglalas::create([
            "user_id" => 1,
            "konyv_id" => 8,
        ]);

          Foglalas::create([
            "user_id" => 1,
            "konyv_id" => 11,
        ]);
    
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('foglalas');
    }
}
