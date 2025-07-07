<?php

namespace Database\Seeders;

use App\Models\CategoryType;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CategoryTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $types = [
            'Menu',
            'Ambience',
            'Retail',
            'Events',
            'Sustainability',
        ];

        foreach ($types as $type) {
            CategoryType::create(['name' => $type]);
        }
    }
}
