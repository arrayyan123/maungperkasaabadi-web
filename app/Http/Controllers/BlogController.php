<?php

namespace App\Http\Controllers;

use App\Models\Blog;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class BlogController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $blog = Blog::orderBy('created_at', 'desc')->get();
        return response()->json($blog);
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
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'image' => 'nullable|image',
        ]);

        if ($request->hasFile('image')) {
            $validated['image'] = $request->file('image')->store('blogs', 'public');
        }
        Blog::create($validated);

        return redirect()->back()->with('success', 'Blog berhasil di tambah');
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $blog = Blog::findOrFail($id);

        if (!$blog) {
            return redirect()->json(['message' => 'Blog tidak ditemukan'], 404);
        }
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
        $blog = Blog::findOrFail($id);

        $validated = $request->validate([
            'title' => 'sometimes|required|string|max:255',
            'description' => 'sometimes|required|string',
            'image' => 'nullable|image'
        ]);
        
        if ($request->hasFile('image')) {
            if ($blog->image) {
                Storage::disk('public')->delete($blog->image);
            }
            $validated['image'] = $request->file('image')->store('blogs', 'public');
        } else {
            $validated['image'] = $blog->image;
        }

        $updated = $blog->update($validated);

        return response()->json([
            'message' => $updated ? 'Blog berhasil di update' : 'gagal untuk mengupdate blog',
            'Blogs' => $blog
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $blog = Blog::findOrFail($id);

        if ($blog->image) {
            Storage::disk('public')->delete($blog->image);
        }

        $blog->delete();

        return response()->json(['message' => 'Blog berhasil di hapus']);
    }
}
