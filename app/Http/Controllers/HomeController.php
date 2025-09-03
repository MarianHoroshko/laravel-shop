<?php

namespace App\Http\Controllers;

use App\Models\CategoryType;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function show()
    {
        $productCategories = CategoryType::with('categories')->get()->all();

        return Inertia::render('HomePage', compact('productCategories'));
    }
}
