<?php

namespace App\Http\Controllers;

use App\Models\Banner;
use App\Models\CategoryType;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function show()
    {
        $banner = Banner::latest('id')->first();
        $products = Product::with('images')->get()->all();

        return Inertia::render('client/HomePage', compact('banner', 'products'));
    }
}
