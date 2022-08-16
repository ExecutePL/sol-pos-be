<?php

namespace App\GraphQL\Mutations;

use App\Models\Worker;
use Illuminate\Support\Str;

final class CreateWorker
{
    /**
     * @param  null  $_
     * @param  array{}  $args
     */
    public function __invoke($_, array $args)
    {
        $worker = new Worker($args);
        $worker->remember_token = Str::random(60);
        $worker->save();
        return $worker;
    }
}
