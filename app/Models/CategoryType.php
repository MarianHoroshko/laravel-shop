<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CategoryType extends Model
{
    protected $fillable = ["name"];

    public function categories(): \Illuminate\Database\Eloquent\Relations\HasMany
    {
        return $this->hasMany(ProductCategory::class);
    }
}
