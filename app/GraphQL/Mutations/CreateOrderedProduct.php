<?php

namespace App\GraphQL\Mutations;

use App\Models\Bill;
use App\Models\OrderedProduct;
use App\Models\Product;

final class CreateOrderedProduct
{
    /**
     * @param  null  $_
     * @param  array{}  $args
     */
    public function __invoke($_, array $args)
    {
        for($i = 0; $i < $args['quantity']; $i++){
            $new_ordered_product = new OrderedProduct();
            $new_ordered_product->bill_id = $args['bill']['connect'];
            $new_ordered_product->product_id = $args['product']['connect'];
            $bill = Bill::where('id',$args['bill']['connect'])->first();
            $product = Product::where('id',$args['product']['connect'])->first();
            $bill->sum += $product->price;
            $bill->total = round($bill->sum * (1+($bill->tip/100)),2);
            $bill->save();
            $new_ordered_product->save();
        }
        return "Done";
    }
}
