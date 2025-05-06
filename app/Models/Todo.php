<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Todo extends Model
{
    protected $table = 'todos';
    protected $fillable = ['title', 'due_date', 'description', 'is_completed'];
    protected $casts = [
        'is_completed' => 'boolean',
        'due_date' => 'date',
    ];
}
