<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class PointOfSale extends Model
{
    use HasFactory;

    protected $table = 'points_of_sale';

    protected $fillable = [
        'name',
        'public_key',
        'status',
        'user_id'
    ];

    /**
     * @return BelongsTo
     * @version 1.0.0
     * @since 11.08.2022
     * @author MLGDUCK
     * @todo PointOfSale/User - [INPUT]BelongsToUser (DONE)
     *
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }

    /**
     * @return HasMany
     * @version 1.0.0
     * @since 17.05.2022
     * @author MLGDUCK
     * @todo PointOfSale/Bill - [INPUT]HasManyArticles (DONE)
     *
     */
    public function bills(): HasMany
    {
        return $this->hasMany(Bill::class, 'pos_id', 'id');
    }
}
