<?php

namespace Database\Seeders;

use App\Models\Poli;
use Illuminate\Database\Seeder;

class PoliSeeder extends Seeder
{

    public function run(): void
    {
        Poli::factory(3)->create();
    }
}
