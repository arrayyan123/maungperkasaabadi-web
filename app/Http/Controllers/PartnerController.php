<?php

namespace App\Http\Controllers;

use App\Models\PartnerContent;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;


class PartnerController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $partnerContent = PartnerContent::all();
        return response()->json($partnerContent);
        
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
        Log::info('Update Partnership Request:', $request->all());
        $validated = $request->validate([
            'title' =>'required|string|max:255',
            'description' => 'required|string',
            'image' => 'nullable|image',
        ]);

        if ($request->hasFile('image')) {
            $validated['image'] = $request->file('image')->store('partnership', 'public');
        }
        PartnerContent::create($validated);

        return redirect()->back()->with('success', 'Partnership success being added');
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
        $partner = PartnerContent::findOrFail($id);
        
        $validated = $request->validate([
            'title' => 'sometimes|required|string|max:255',
            'description' => 'nullable|string',
            'image' => 'nullable|image'
        ]);

        if ($request->hasFile('image')) {
            if ($partner->image){
                Storage::disk('public')->delete($partner->image);
            }
            $validated['image'] = $request->file('image')->store('partnership', 'public');
        } else {
            $validated['image'] = $partner->image;
        }

        $updated = $partner->update($validated);

        return response()->json([
            'message' => $updated ? 'Product updated successfully' : 'Failed to update product',
            'Partnership' => $partner,
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $partner = PartnerContent::findOrFail($id);

        if($partner->image) {
            Storage::disk('public')->delete($partner->image);
        }

        $partner->delete();

        return response()->json(['message' => 'partner berhasil di hapus']);
    }
}
