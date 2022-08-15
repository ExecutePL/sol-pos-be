<?php

namespace App\GraphQL\Mutations;

use App\Models\Bill;
use App\Models\OrderedProduct;
use App\Models\Product;

final class DeleteOrderedProduct
{
    /**
     * @param  null  $_
     * @param  array{}  $args
     */
    public function __invoke($_, array $args)
    {
        $ordered_product = OrderedProduct::where('id',$args['id'])->first();
        $bill = Bill::where('id',$ordered_product->bill_id)->first();
        $product = Product::where($ordered_product->product_id)->first();
        $bill->sum -= $product->price;
        $bill->save();
        $ordered_product->delete();
        return $ordered_product;
    }
}
