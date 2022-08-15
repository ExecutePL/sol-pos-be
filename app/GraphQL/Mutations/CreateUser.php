<?php

namespace App\GraphQL\Mutations;

use App\Models\User;

final class CreateUser
{
    /**
     * @param  null  $_
     * @param  array{}  $args
     */
    public function __invoke($_, array $args)
    {
        $new_user = new User($args);
        $new_user->save();

    }
}
