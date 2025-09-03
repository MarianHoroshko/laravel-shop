<?php

use App\Http\Controllers\HomeController;
use App\Http\Controllers\ProductsController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [HomeController::class, 'show'])->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::prefix("admin")->group(function () {
        Route::get('dashboard', function () {
            return Inertia::render('dashboard');
        })->name('dashboard');

        Route::prefix("dashboard")->group(function () {
            Route::get('products', [ProductsController::class, 'index'])->name('admin.products.index');

            Route::get('products/create', [ProductsController::class, 'create'])->name('admin.products.create');
            Route::post('products/store', [ProductsController::class, 'store'])->name('admin.products.store');
            Route::get('products/edit/{product}', [ProductsController::class, 'edit'])->name('admin.products.edit');
            Route::put('products/update/{product}', [ProductsController::class, 'update'])->name('admin.products.update');
            Route::delete('products/delete/{product}', [ProductsController::class, 'destroy'])->name('admin.products.destroy');
        });
    });
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
