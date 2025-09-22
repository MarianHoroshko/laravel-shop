<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Banner>
 */
class BannerFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $sampleFile = ['banner', 'jpg'];

        // Generate file path
        $filePath = "banners/{$sampleFile[0]}.{$sampleFile[1]}";

        return [
            'href' => 'sale',
            'image_path' => $filePath
        ];
    }
}
