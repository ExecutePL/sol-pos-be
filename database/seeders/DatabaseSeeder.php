<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\Product;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        User::create(
            [
                'name' => 'Admin',
                'email' => 'admin@admin.com',
                'password' => 'TestHash',
                'wallet_address' => '7GK7JHRtsmDCBx8H3bRi4kUDE9NpUtaC31bTGDA6aLYJ',
                'remember_token' => Str::random(60),
            ]
        );

        Product::create(
            [
                'name' => 'Burger',
                'description' => '200g burger',
                'price' => 3.99,
                'user_id' => 1,
            ]
        );
        Product::create(
            [
                'name' => 'Cheesburger',
                'description' => '200g burger but with chees',
                'price' => 4.99,
                'user_id' => 1,
            ]
        );
        Product::create(
            [
                'name' => 'Cheese Chips',
                'description' => '100g chips but with chees',
                'price' => 2.99,
                'user_id' => 1,
            ]
        );
        \App\Models\PointOfSale::create(
            [
                'name' => 'Table 1',
                'user_id' => 1,
            ]
        );
        \App\Models\PointOfSale::create(
            [
                'name' => 'Table 2',
                'user_id' => 1,
            ]
        );
        \App\Models\PointOfSale::create(
            [
                'name' => 'Table 3',
                'user_id' => 1,
            ]
        );
        \App\Models\Worker::create(
            [
                'name' => 'Kristine',
                'remember_token' => Str::random(60),
                'user_id' => 1,
            ]
        );
    }
}
