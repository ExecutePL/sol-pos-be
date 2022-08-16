<?php

namespace App\GraphQL\Mutations;

final class UpdateBill
{
    /**
     * @param  null  $_
     * @param  array{}  $args
     */
    public function __invoke($_, array $args)
    {
        print_r($args);
        die();
        // TODO implement the resolver
    }
}
