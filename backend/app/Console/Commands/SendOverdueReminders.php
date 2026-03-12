<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class SendOverdueReminders extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:send-overdue-reminders';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $lejartKolcsonzesek = \App\Models\Kolcsonzes::with('user')
            ->where('hatarido', '<', now())
            ->where('email', 0) // Csak azoknak, akiknek még nem küldtünk
            ->get();

        foreach ($lejartKolcsonzesek as $kolcsonzes) {
            \Illuminate\Support\Facades\Mail::to($kolcsonzes->user->email)
                ->send(new \App\Mail\KesesiErtesito($kolcsonzes));

            // Jelöljük meg, hogy az e-mail elment
            $kolcsonzes->update(['email' => 1]);
        }
    }
}
