<?php

namespace App\Http\Controllers;

use App\Models\OurService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class OurServiceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $service = OurService::all();
        return response()->json($service);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'link_web' => 'required|string',
            'image' => 'nullable|image'
        ]);

        if ($request->hasFile('image')) {
            $validated['image'] = $request->file('image')->store('services', 'public');
        }

        OurService::create($validated);

        return redirect()->back()->with('success', 'Service success being added');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
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
        $service = OurService::findOrFail($id);
        
        $validated = $request->validate([
            'title' => 'sometimes|required|string|max:255',
            'link_web' => 'nullable|string',
            'image' => 'nullable|image'
        ]);

        if ($request->hasFile('image')) {
            if ($service->image){
                Storage::disk('public')->delete($service->image);
            }
            $validated['image'] = $request->file('image')->store('services', 'public');
        } else {
            $validated['image'] = $service->image;
        }

        $updated = $service->update($validated);

        return response()->json([
            'message' => $updated ? 'Product updated successfully' : 'Failed to update product',
            'Service' => $service,
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $service = OurService::findOrFail($id);

        if($service->image) {
            Storage::disk('public')->delete($service->image);
        }

        $service->delete();

        return response()->json(['message' => 'service berhasil di hapus']);
    }
}
