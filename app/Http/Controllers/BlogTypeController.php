<?php

namespace App\Http\Controllers;

use App\Models\BlogType;
use Illuminate\Http\Request;

class BlogTypeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $blogTypes = BlogType::all();
        return response()->json($blogTypes);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'type_blog' => 'required|string|unique:blog_types|max:255',
        ]);

        $blogType = BlogType::create($validated);

        return response()->json(['message' => 'Blog type berhasil ditambahkan', 'blogType' => $blogType]);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $blogType = BlogType::findOrFail($id);
        return response()->json($blogType);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'type_blog' => 'required|string|unique:blog_types,type_blog,'.$id.'|max:255',
        ]);
    
        $blogType = BlogType::findOrFail($id);
        $blogType->update($validated);
    
        return response()->json(['message' => 'Blog type berhasil diperbarui', 'blogType' => $blogType]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $blogType = BlogType::findOrFail($id);
        $blogType->delete();

        return response()->json(['message' => 'Blog type berhasil dihapus']);
    }
}
