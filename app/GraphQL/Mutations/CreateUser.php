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
        $user = new User($args);
        $user->save();
        return $user->createToken($user->email)->plainTextToken;
    }
}
