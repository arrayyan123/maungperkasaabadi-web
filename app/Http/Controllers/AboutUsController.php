<?php

namespace App\Http\Controllers;

use App\Models\AboutUs;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class AboutUsController extends Controller
{
    /**
     * Fetch all About Us data and pass to the frontend.
     */
    public function index()
    {
        $aboutUs = AboutUs::all(); 
        return response()->json($aboutUs);
    }

    /**
     * Store a new About Us record.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'image1' => 'required|image',
            'image2' => 'required|image',
            'image3' => 'required|image',
        ]);

        $validated['image1'] = $request->file('image1')->store('about_us', 'public');
        $validated['image2'] = $request->file('image2')->store('about_us', 'public');
        $validated['image3'] = $request->file('image3')->store('about_us', 'public');

        AboutUs::create($validated);

        return response()->json(['success' => 'About Us created successfully!']);
    }

    /**
     * Update an existing About Us record.
     */
    public function update(Request $request, $id)
    {
        $aboutUs = AboutUs::findOrFail($id);

        $validated = $request->validate([
            'title' => 'sometimes|required|string|max:255',
            'description' => 'sometimes|required|string',
            'image1' => 'nullable|image',
            'image2' => 'nullable|image',
            'image3' => 'nullable|image',
        ]);

        if ($request->hasFile('image1')) {
            Storage::disk('public')->delete($aboutUs->image1);
            $validated['image1'] = $request->file('image1')->store('about_us', 'public');
        } else {
            $validated['image1'] = $aboutUs->image1;
        }

        if ($request->hasFile('image2')) {
            Storage::disk('public')->delete($aboutUs->image2);
            $validated['image2'] = $request->file('image2')->store('about_us', 'public');
        } else {
            $validated['image2'] = $aboutUs->image2;
        }

        if ($request->hasFile('image3')) {
            Storage::disk('public')->delete($aboutUs->image3);
            $validated['image3'] = $request->file('image3')->store('about_us', 'public');
        } else {
            $validated['image3'] = $aboutUs->image3;
        }

        $aboutUs->update($validated);

        return response()->json(['success' => 'About Us updated successfully!']);
    }

    /**
     * Delete an About Us record.
     */
    public function destroy($id)
    {
        $aboutUs = AboutUs::findOrFail($id);
        Storage::disk('public')->delete([$aboutUs->image1, $aboutUs->image2, $aboutUs->image3]);
        $aboutUs->delete();
        return response()->json(['success' => 'About Us deleted successfully!']);
    }
}
