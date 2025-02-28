<?php

namespace App\Http\Controllers;

use App\Models\Blog;
use App\Models\BlogImage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;


class BlogController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $blogs = Blog::with('images', 'comments', 'blogType')->orderBy('created_at', 'desc')->get();
        return response()->json($blogs);
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
            'author' => 'required|string|max:255',
            'blog_type_id' => 'required|exists:blog_types,id',
            'images.*' => 'nullable|image',
        ]);
    
        $blog = Blog::create([
            'title' => $validated['title'],
            'description' => $validated['description'],
            'author' => $validated['author'],
            'blog_type_id' => $validated['blog_type_id'],
        ]);
    
        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $image) {
                $path = $image->store('blogs', 'public');
                BlogImage::create(['blog_id' => $blog->id, 'path' => $path]);
            }
        }
    
        return response()->json(['message' => 'Blog berhasil ditambahkan', 'blog' => $blog]);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $blog = Blog::with(['images', 'comments', 'blogType'])->findOrFail($id);

        if (!$blog) {
            return redirect()->json(['message' => 'Blog tidak ditemukan'], 404);
        }
        return response()->json($blog);
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
            'author' => 'sometimes|required|string|max:255',
            'blog_type_id' => 'sometimes|required|exists:blog_types,id',
            'images.*' => 'nullable|image',
            'delete_images' => 'nullable|array', 
            'delete_images.*' => 'string|uuid',
        ]);
    
        $blog->update([
            'title' => $validated['title'] ?? $blog->title,
            'description' => $validated['description'] ?? $blog->description,
            'author' => $validated['author'] ?? $blog->author,
            'blog_type_id' => $validated['blog_type_id'] ?? $blog->blog_type_id,
        ]);

        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $image) {
                $path = $image->store('blogs', 'public');
                BlogImage::create(['blog_id' => $blog->id, 'path' => $path]);
            }
        }
    
        if ($request->filled('delete_images')) {
            $deleteImages = $request->input('delete_images');
            if (is_countable($deleteImages)) {
                BlogImage::whereIn('id', $deleteImages)->each(function ($image) {
                    Storage::disk('public')->delete($image->path);
                    $image->delete();
                });
            }
        }
        
        return response()->json(['message' => 'Blog berhasil diupdate', 'blog' => $blog]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $blog = Blog::findOrFail($id);

        foreach ($blog->images as $image) {
            Storage::disk('public')->delete($image->path);
        }

        $blog->delete();

        return response()->json(['message' => 'Blog dan semua gambar terkait berhasil dihapus']);
    }
}