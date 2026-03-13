<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('adatmodositas', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users');
            $table->string('uj_nev')->nullable();
            $table->string('uj_email')->nullable();
            $table->string('uj_cim')->nullable();
            $table->string('uj_tel')->nullable();
            $table->enum('statusz', ['fuggo', 'elfogadva', 'elutasitva'])->default('fuggo');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('adatmodositas');
    }
};
