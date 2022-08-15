<?php

namespace App\GraphQL\Mutations;

use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

final class LoginUser
{
    /**
     * @param null $_
     * @param array{} $args
     */
    public function __invoke($_, array $args)
    {
        /**
         * @param null $_
         * @param array<string, mixed> $args
         */
        $user = User::where('email', $args['email'])->first();

        if (!$user || !Hash::check($args['password'], $user->password)) {
            throw ValidationException::withMessages([
                                                        'email' => ['The provided credentials are incorrect.'],
                                                    ]);
        }

        return $user->createToken($user->name)->plainTextToken;
    }
}
