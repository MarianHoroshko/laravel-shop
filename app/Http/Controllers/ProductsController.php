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
        $pages = Product::with('images')->paginate(10);

        return Inertia::render('admin/products/index', compact('pages'));
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
            'images.*' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        $product = Product::create($request->only(['name', 'description', 'price']));
        if ($request->has('images')) {
            foreach ($request->images as $image) {
                // If you're receiving file uploads (e.g., from an HTML form with <input type="file" multiple>)
                $path = $image->store('product_images', 'public');

                $product->images()->create([
                    'image_path' => $path,
                ]);
            }
        }

        return redirect()->route('products.index')->with('message', 'Product created successfully.');
    }
}
