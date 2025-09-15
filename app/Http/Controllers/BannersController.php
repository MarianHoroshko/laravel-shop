<?php

namespace App\Http\Controllers;

use App\Models\Banner;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BannersController extends Controller
{
    public function index()
    {
        $banner = Banner::latest('id')->first();

        return Inertia::render('admin/banners/index', compact('banner'));
    }

    public function create()
    {
        return Inertia::render('admin/banners/create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'href' => 'required|string|max:50',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        $image_path = $request->file('image')->store('banners', 'public');

        $banner = Banner::create([
            'href' => $request->get('href'),
            'image_path' => $image_path
        ]);

        return redirect()->route('admin.banners.index')->with('message', 'Banner added successfully.');
    }
}
