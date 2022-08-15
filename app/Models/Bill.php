<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasManyThrough;

class Bill extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'worker_id',
        'pos_id',
        'status',
        'sum',
        'tip',
        'total'
    ];

    /**
     * @return HasManyThrough
     * @version 1.0.0
     * @since 17.05.2022
     * @author MLGDUCK
     * @todo Bill/Product - [QUERY]products (DONE)
     *
     */
    public function products(): HasManyThrough
    {
        return $this->hasManyThrough(Product::class,OrderedProduct::class, 'bill_id','id','id', 'product_id');
    }

    /**
     * @return HasMany
     * @version 1.0.0
     * @since 17.05.2022
     * @author MLGDUCK
     * @todo Bill/OrderedProduct - [INPUT]HasManyOrderedProducts (DONE)
     *
     */
    public function orderedProducts(): HasMany
    {
        return $this->hasMany(OrderedProduct::class, 'bill_id', 'id');
    }

    /**
     * @return BelongsTo
     * @version 1.0.0
     * @since 17.05.2022
     * @author MLGDUCK
     * @todo Bill/User - [INPUT]BelongsToUser (DONE)
     *
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }

    /**
     * @return BelongsTo
     * @version 1.0.0
     * @since 17.05.2022
     * @author MLGDUCK
     * @todo Bill/Worker - [INPUT]BelongsToWorker (DONE)
     *
     */
    public function worker(): BelongsTo
    {
        return $this->belongsTo(Worker::class, 'worker_id', 'id');
    }

    /**
     * @return BelongsTo
     * @version 1.0.0
     * @since 17.05.2022
     * @author MLGDUCK
     * @todo Bill/PointOfSale - [INPUT]BelongsToPointOfSale (DONE)
     *
     */
    public function pointOfSale(): BelongsTo
    {
        return $this->belongsTo(PointOfSale::class, 'pos_id', 'id');
    }
}
