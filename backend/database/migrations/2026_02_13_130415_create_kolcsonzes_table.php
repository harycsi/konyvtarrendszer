<?php

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
            $table->foreignId('user_id')->constrained('users');
            $table->foreignId('konyv_id')->constrained('konyv');
            $table->date('kolcs_datum')->useCurrent();
            $table->date('hatarido')->nullable();
            $table->tinyInteger('email')->default(0);
            $table->foreignId('dolg_id')->constrained('dolgozos');
            $table->string('uzenet')->nullable();
            $table->timestamps(); 
        });
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
