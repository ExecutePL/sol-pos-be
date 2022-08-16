<?php

namespace App\GraphQL\Mutations;

use App\Models\Worker;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;

final class CreateWorker
{
    /**
     * @param  null  $_
     * @param  array{}  $args
     */
    public function __invoke($_, array $args)
    {
        $guard = Auth::guard();
        $worker = new Worker();
        $worker->name = $args['name'];
        $worker->remember_token = Str::random(60);
        $worker->user_id = $guard->id();
        $worker->save();
        return $worker;
    }
}
