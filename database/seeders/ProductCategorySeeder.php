<?php

namespace Database\Seeders;

use App\Models\CategoryType;
use App\Models\ProductCategory;
use Illuminate\Database\Seeder;

class ProductCategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $data = [
            'Menu' => [
                'Espresso-Based Drinks',
                'Brewed Coffee',
                'Specialty Drinks',
                'Non-Coffee Drinks',
                'Cold Drinks',
                'Alternative Milks',
                'Food & Pastries',
                'Breakfast Items',
            ],
            'Ambience' => [
                'Cozy Corners',
                'Remote Work-Friendly',
                'Group Seating',
                'Pet-Friendly Area',
                'Outdoor Patio',
                'Art & Decor Features',
            ],
            'Retail' => [
                'Coffee Beans',
                'Brewing Equipment',
                'Branded Merchandise',
                'Apparel',
                'Gift Cards',
                'Local Artisan Goods',
            ],
            'Events' => [
                'Open Mic Nights',
                'Coffee Tasting Events',
                'Workshops',
                'Live Music',
                'Pop-Up Markets',
                'Art Exhibitions',
            ],
            'Sustainability' => [
                'Local Ingredients',
                'Fair-Trade Coffee',
                'Compostable Packaging',
                'BYO Cup Discount',
                'Zero-Waste',
            ]
        ];

        foreach ($data as $type => $categories) {
            $typeModel = CategoryType::where('name', $type)->first();

            foreach ($categories as $category) {
                ProductCategory::create([
                    'name' => $category,
                    'category_type_id' => $typeModel->id,
                ]);
            }
        }
    }
}
