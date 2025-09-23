<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use App\Models\CategoryType;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductsController extends Controller
{
    public function product(Product $product)
    {
        $product->load('images');
        $product->load('category');

        return Inertia::render('client/ProductPage', compact(['product']));
    }
}
