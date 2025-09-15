<?php

namespace App\Http\Controllers;

use App\Models\Banner;
use App\Models\CategoryType;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function show()
    {
        $banner = Banner::latest('id')->first();

        return Inertia::render('client/HomePage', compact('banner'));
    }
}
