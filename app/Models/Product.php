<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $fillable = ["name", "description", "price"];

    public function images(): \Illuminate\Database\Eloquent\Relations\HasMany
    {
        return $this->hasMany(ProductImage::class);
    }
}
