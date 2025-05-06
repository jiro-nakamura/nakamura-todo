<?php

namespace App\Http\Controllers;

use App\Models\Todo;
use Illuminate\Http\Request;

class TodoController extends Controller
{
    public function index()
    {
        return response()->json(Todo::all());
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'due_date' => 'nullable|date',
            'description' => 'nullable|string',
        ]);

        $todo = Todo::create([
            'title' => $request->title,
            'due_date' => $request->due_date,
            'description' => $request->description,
            'is_completed' => false,
        ]);

        return response()->json($todo, 201);
    }

    public function show(Todo $todo)
    {
        return response()->json($todo);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'due_date' => 'nullable|date',
            'description' => 'nullable|string',
            'is_completed' => 'boolean',
        ]);

        $todo = Todo::findOrFail($id);
        $todo->update($request->only(['title', 'due_date', 'description', 'is_completed']));

        return response()->json($todo);
    }

    public function destroy($id)
    {
        $todo = Todo::findOrFail($id);
        $todo->delete();

        return response()->json(null, 204);
    }
}
