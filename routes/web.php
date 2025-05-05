<?php

use Illuminate\Support\Facades\Route;

Route::get('/test', function () {
    return response()->json(['message' => 'Test OK', 'app' => config('app.name')]);
});

Route::get('/', function () {
    return view('app');
});
