<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Always encrypt the password when it is updated.
     *
     * @param string $value
     * @return void
     */
    public function setPasswordAttribute(string $value)
    {
        $this->attributes['password'] = bcrypt($value);
    }

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    /**
     * @return HasMany
     * @version 1.0.0
     * @since 11.08.2022
     * @author MLGDUCK
     * @todo User/Product - [INPUT]HasManyProducts (DONE)
     *
     */
    public function products(): HasMany
    {
        return $this->hasMany(Product::class, 'user_id', 'id');
    }

    /**
     * @return HasMany
     * @version 1.0.0
     * @since 11.08.2022
     * @author MLGDUCK
     * @todo User/PointOfSale - [INPUT]HasManyPointOfSale (DONE)
     *
     */
    public function pointsOfSale(): HasMany
    {
        return $this->hasMany(PointOfSale::class, 'user_id', 'id');
    }

    /**
     * @return HasMany
     * @version 1.0.0
     * @since 11.08.2022
     * @author MLGDUCK
     * @todo User/Worker - [INPUT]HasManyWorkers (DONE)
     *
     */
    public function workers(): HasMany
    {
        return $this->hasMany(Worker::class, 'user_id', 'id');
    }

    /**
     * @return HasMany
     * @version 1.0.0
     * @since 11.08.2022
     * @author MLGDUCK
     * @todo User/Bill - [INPUT]HasManyBills (DONE)
     *
     */
    public function bills(): HasMany
    {
        return $this->hasMany(Bill::class, 'user_id', 'id');
    }
}
