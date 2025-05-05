<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TodoController;

Route::get('test', function () { return 'テスト成功'; });
Route::post('test', function () { return 'POST成功'; });
Route::apiResource('todos', TodoController::class);