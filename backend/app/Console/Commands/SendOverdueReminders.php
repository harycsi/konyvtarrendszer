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
            ->whereDate('hatarido', '<', now())
            ->where('email', 0)
            ->get();

        foreach ($lejartKolcsonzesek as $kolcsonzes) {
            if ($kolcsonzes->user && !empty($kolcsonzes->user->email_cim)) {

                \Illuminate\Support\Facades\Mail::to($kolcsonzes->user->email_cim)
                    ->send(new \App\Mail\KesesiErtesito($kolcsonzes));

                $kolcsonzes->update(['email' => 1]);

                $this->info("Email elküldve: " . $kolcsonzes->user->email_cim);
            } else {
                $this->warn("Kölcsönzés ID: {$kolcsonzes->id} - Hiányzó email cím!");
            }
        }
    }
}
