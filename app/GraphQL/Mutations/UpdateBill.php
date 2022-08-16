<?php

namespace App\GraphQL\Mutations;

use App\Models\Bill;
use App\Models\PointOfSale;

final class UpdateBill
{
    /**
     * @param  null  $_
     * @param  array{}  $args
     */
    public function __invoke($_, array $args)
    {
        $bill = Bill::where('id',$args['id'])->first();
        foreach($args as $key => $value){
            if($key == "id") continue;
            $bill->$key = $value;
        }
        $bill->total = $bill->sum;
        if($bill->tip != 0){
            $bill->total = round($bill->total * (1+($bill->tip/100)),2);
        }
        $bill->save();
        if($bill->status == 2){
            $pos = PointOfSale::where('id',$bill->pos_id)->first();
            $pos->status = 1;
            $pos->save();
        }
        return $bill;
    }
}
