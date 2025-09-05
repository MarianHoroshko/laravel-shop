<?php

namespace App\Providers;

use App\Models\CategoryType;
use Illuminate\Support\ServiceProvider;
use Inertia\Inertia;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Inertia::share([
            'productCategories' => function () {
                return CategoryType::with('categories')->get()->all();
            },
        ]);
    }
}
