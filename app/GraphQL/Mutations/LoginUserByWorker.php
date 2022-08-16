<?php

namespace App\GraphQL\Mutations;

use App\Models\User;
use App\Models\Worker;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

final class LoginUserByWorker
{
    /**
     * @param  null  $_
     * @param  array{}  $args
     */
    public function __invoke($_, array $args)
    {
        $worker = Worker::where('remember_token', $args['remember_token'])->first();
        $user = User::where('id', $worker->user_id)->first();

        return $user->createToken($user->mail)->plainTextToken;
    }
}
