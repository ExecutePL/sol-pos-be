<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class OrderedProduct extends Model
{
    use HasFactory;

    protected $fillable = [
        'status',
        'bill_id',
        'product_id',
    ];

    /**
     * @return BelongsTo
     * @version 1.0.0
     * @since 17.05.2022
     * @author MLGDUCK
     * @todo OrderedProduct/Bill - [INPUT]BelongsToBill (DONE)
     *
     */
    public function bill(): BelongsTo
    {
        return $this->belongsTo(Bill::class, 'bill_id', 'id');
    }

    /**
     * @return BelongsTo
     * @version 1.0.0
     * @since 17.05.2022
     * @author MLGDUCK
     * @todo OrderedProduct/Product - [INPUT]BelongsToProduct (DONE)
     *
     */
    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class, 'product_id', 'id');
    }
}
