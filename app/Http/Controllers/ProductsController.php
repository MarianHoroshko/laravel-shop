<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class ProductsController extends Controller
{
    public function index(): \Inertia\Response
    {
        $products = Product::all();

        return Inertia::render('admin/products/index', compact('products'));
    }

    public function create(): \Inertia\Response
    {
        return Inertia::render('admin/products/create');
    }

    public function store(Request $request): \Illuminate\Http\RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string|max:1500',
            'price' => 'required|numeric|min:0.01|max:999999.99',
        ]);

        Product::create($request->all());

        return Redirect::route('products.index');
    }
}
