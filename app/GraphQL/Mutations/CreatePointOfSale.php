<?php

namespace App\GraphQL\Mutations;

use App\Models\PointOfSale;
use Illuminate\Support\Facades\Auth;

final class CreatePointOfSale
{
    /**
     * @param  null  $_
     * @param  array{}  $args
     */
    public function __invoke($_, array $args)
    {
        $guard = Auth::guard();
        $pos = new PointOfSale($args);
        $pos->user_id = $guard->id();
        $pos->save();
        return $pos;
    }
}
