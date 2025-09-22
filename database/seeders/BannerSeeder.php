<?php

namespace Database\Seeders;

use App\Models\Banner;
use Database\Factories\BannerFactory;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class BannerSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Banner::factory(1)->create();
    }
}
