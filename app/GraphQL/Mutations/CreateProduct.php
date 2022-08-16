<?php

namespace App\GraphQL\Mutations;

use App\Models\Product;
use Illuminate\Support\Facades\Auth;

final class CreateProduct
{
    /**
     * @param  null  $_
     * @param  array{}  $args
     */
    public function __invoke($_, array $args)
    {
        $guard = Auth::guard();
        $product = new Product($args);
        $product->user_id = $guard->id();
        $product->save();
        return $product;
    }
}
