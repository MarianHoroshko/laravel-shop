<?php

use App\Http\Controllers\BannersController;
use App\Http\Controllers\Client\ProductsController as ClientProductsController;
use App\Http\Controllers\Admin\ProductsController as AdminProductsController;
use App\Http\Controllers\HomeController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/**
 * Client routes
 */

Route::get('/', [HomeController::class, 'show'])->name('home');

Route::get('products/{product}', [ClientProductsController::class, 'product'])->name('product');


/**
 * Admin routes
 */

Route::middleware(['auth', 'verified'])->group(function () {
    Route::prefix("admin")->group(function () {
        Route::get('dashboard', function () {
            return Inertia::render('dashboard');
        })->name('dashboard');

        Route::prefix("dashboard")->group(function () {
            Route::get('products', [AdminProductsController::class, 'index'])->name('admin.products.index');
            Route::get('products/create', [AdminProductsController::class, 'create'])->name('admin.products.create');
            Route::post('products/store', [AdminProductsController::class, 'store'])->name('admin.products.store');
            Route::get('products/edit/{product}', [AdminProductsController::class, 'edit'])->name('admin.products.edit');
            Route::put('products/update/{product}', [AdminProductsController::class, 'update'])->name('admin.products.update');
            Route::delete('products/delete/{product}', [AdminProductsController::class, 'destroy'])->name('admin.products.destroy');

            Route::get('banners', [BannersController::class, 'index'])->name('admin.banners.index');
            Route::get('banners/create', [BannersController::class, 'create'])->name('admin.banners.create');
            Route::post('banners/store', [BannersController::class, 'store'])->name('admin.banners.store');
            Route::get('banners/edit/{banner}', [BannersController::class, 'edit'])->name('admin.banners.edit');
            Route::put('banners/update/{banner}', [BannersController::class, 'update'])->name('admin.banners.update');
            Route::delete('banners/delete/{banner}', [BannersController::class, 'destroy'])->name('admin.banners.destroy');
        });
    });
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
