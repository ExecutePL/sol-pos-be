<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Worker extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'remember_token',
        'user_id'
    ];

    /**
     * @return BelongsTo
     * @version 1.0.0
     * @since 11.08.2022
     * @author MLGDUCK
     * @todo Worker/User - [INPUT]BelongsToUser (DONE)
     *
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }

    /**
     * @return HasMany
     * @version 1.0.0
     * @since 11.08.2022
     * @author MLGDUCK
     * @todo Worker/Bill - [INPUT]HasManyBills (DONE)
     *
     */
    public function bills(): HasMany
    {
        return $this->hasMany(Bill::class, 'worker_id', 'id');
    }
}
