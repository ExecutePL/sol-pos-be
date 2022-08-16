<?php

namespace App\GraphQL\Mutations;

use App\Models\Bill;
use App\Models\OrderedProduct;
use App\Models\Product;

final class UpdateOrderedProduct
{
    /**
     * @param  null  $_
     * @param  array{}  $args
     */
    public function __invoke($_, array $args)
    {
        $ordered_product = OrderedProduct::where('id',$args['id'])->first();
        if($ordered_product->status != 3){
            $ordered_product->status = $args['status'];
            if($args['status'] == 3){
                $bill = Bill::where('id',$ordered_product->bill_id)->first();
                $product = Product::where('id',$ordered_product->product_id)->first();
                $bill->sum -= $product->price;
                $bill->total -= $product->price;
                $bill->save();

            }
            $ordered_product->save();
        }
        return $ordered_product;
    }
}
