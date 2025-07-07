<?php

namespace App\Http\Controllers;

use App\Models\CategoryType;
use App\Models\Product;
use App\Models\ProductCategory;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class ProductsController extends Controller
{
    public function index(): Response
    {
        $pages = Product::with('images')->paginate(10);

        return Inertia::render('admin/products/index', compact('pages'));
    }

    public function create(): Response
    {
        $productCategories = CategoryType::with('categories')->get()->all();

        return Inertia::render('admin/products/create', compact('productCategories'));
    }

    public function store(Request $request): RedirectResponse
    {
//        dd($request);

        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string|max:1500',
            'price' => 'required|numeric|min:0.01|max:999999.99',
            'images.*' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'category_id' => 'required|numeric|exists:product_categories,id',
        ]);

        $product = Product::create([
            "name" => $request->get('name'),
            "description" => $request->get('description'),
            "price" => $request->get('price'),
            "product_category_id" => $request->get('category_id'),
        ]);

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

    public function destroy(Product $product): RedirectResponse
    {
        // Delete image from storage if it exists
        if ($product->image && Storage::disk('public')->exists($product->image)) {
            Storage::disk('public')->delete($product->image);
        }

        $product->delete();
        return redirect()->route('products.index')->with('message', 'Product deleted successfully.');
    }
}
