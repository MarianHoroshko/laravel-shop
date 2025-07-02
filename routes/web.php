<?php

use App\Http\Controllers\ProductsController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::get('products', [ProductsController::class, 'index'])->name('products.index');

    Route::get('products/create', [ProductsController::class, 'create'])->name('products.create');
    Route::post('products/store', [ProductsController::class, 'store'])->name('products.store');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
