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
    Route::get('products/edit/{product}', [ProductsController::class, 'edit'])->name('products.edit');
    Route::put('products/update/{product}', [ProductsController::class, 'update'])->name('products.update');
    Route::delete('products/delete/{product}', [ProductsController::class, 'destroy'])->name('products.destroy');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
