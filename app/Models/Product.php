<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'active',
        'featured',
        'price',
        'sort_order',
        'user_id'
    ];

    /**
     * @return BelongsTo
     * @version 1.0.0
     * @since 11.08.2022
     * @author MLGDUCK
     * @todo Product/User - [INPUT]BelongsToUser (DONE)
     *
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }
}
