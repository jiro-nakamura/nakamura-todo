<?php

namespace App\Models;

       use Illuminate\Database\Eloquent\Model;

       class Todo extends Model
       {
           protected $table = 'todos';
           protected $fillable = ['title', 'due_date', 'description', 'is_completed', 'user_id'];
           protected $casts = [
               'is_completed' => 'boolean',
               'due_date' => 'datetime',
           ];

           public function user()
           {
               return $this->belongsTo(User::class);
           }
       }