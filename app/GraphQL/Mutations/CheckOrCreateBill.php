<?php

namespace App\GraphQL\Mutations;

use App\Models\Bill;
use App\Models\PointOfSale;
use App\Models\Worker;

final class CheckOrCreateBill
{
    /**
     * @param  null  $_
     * @param  array{}  $args
     */
    public function __invoke($_, array $args)
    {
        $bill = Bill::where('pos_id',$args['pos_id'])->where('status',1)->first();
        $pos = PointOfSale::where('id',$args['pos_id'])->first();
        $pos->status = 2;
        $pos->save();
        if(!$bill){
            $args['user_id'] = $pos->user_id;
            $worker = Worker::where('user_id',$pos->user_id)->first();
            $args['worker_id'] = $worker->id;
            $bill = new Bill($args);
            $bill->save();
        }
        return $bill;
    }
}
