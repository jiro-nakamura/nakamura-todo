<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TodoController;

Route::get('/test', function () {
    return response()->json(['message' => 'Test OK', 'app' => config('app.name')]);
});

Route::get('/', [TodoController::class, 'index']);
Route::post('/todos', [TodoController::class, 'store']);
