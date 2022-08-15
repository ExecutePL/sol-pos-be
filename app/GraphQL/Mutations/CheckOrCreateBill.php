<?php

namespace App\GraphQL\Mutations;

use App\Models\Bill;

final class CheckOrCreateBill
{
    /**
     * @param  null  $_
     * @param  array{}  $args
     */
    public function __invoke($_, array $args)
    {
        $bill = Bill::where('pos_id',$args['pos_id'])->where('worker_id',$args['worker_id'])->where('user_id',$args['user_id'])->where('status',1)->first();
        if(!$bill){
            $bill = new Bill($args);
            $bill->save();
        }
        return $bill;
    }
}
