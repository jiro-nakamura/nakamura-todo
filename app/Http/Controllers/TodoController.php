<?php

namespace App\Http\Controllers;

use App\Models\Todo;
use Illuminate\Http\Request;

class TodoController extends Controller
{
    public function index(Request $request)
    {
        return $request->user()->todos()->whereNotNull('user_id')->get();
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'due_date' => 'nullable|date',
            'description' => 'nullable|string',
        ]);

        $todo = $request->user()->todos()->create([
            'title' => $request->title,
            'due_date' => $request->due_date,
            'description' => $request->description,
            'is_completed' => false,
            'user_id' => $request->user()->id,
        ]);

        return response()->json($todo, 201);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'due_date' => 'nullable|date',
            'description' => 'nullable|string',
            'is_completed' => 'boolean',
        ]);

        $todo = $request->user()->todos()->whereNotNull('user_id')->findOrFail($id);
        $todo->update($request->only(['title', 'due_date', 'description', 'is_completed']));

        return response()->json($todo);
    }

    public function destroy(Request $request, $id)
    {
        $todo = $request->user()->todos()->whereNotNull('user_id')->findOrFail($id);
        $todo->delete();

        return response()->json(null, 204);
    }
}
