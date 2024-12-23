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
        $aboutUs = AboutUs::all(); // Fetch all AboutUs records
        return response()->json($aboutUs);
    }

    /**
     * Store a new About Us record.
     */
    public function store(Request $request)
    {
        // Validate incoming request
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'image1' => 'required|image|mimes:jpeg,png,jpg|max:2048',
            'image2' => 'required|image|mimes:jpeg,png,jpg|max:2048',
            'image3' => 'required|image|mimes:jpeg,png,jpg|max:2048',
        ]);

        // Upload images and store their paths
        $validated['image1'] = $request->file('image1')->store('about_us', 'public');
        $validated['image2'] = $request->file('image2')->store('about_us', 'public');
        $validated['image3'] = $request->file('image3')->store('about_us', 'public');

        // Create a new About Us record
        AboutUs::create($validated);

        return response()->json(['success' => 'About Us created successfully!']);
    }

    /**
     * Update an existing About Us record.
     */
    public function update(Request $request, $id)
    {
        // Temukan record berdasarkan ID
        $aboutUs = AboutUs::findOrFail($id);

        // Validasi request
        $validated = $request->validate([
            'title' => 'sometimes|required|string|max:255',
            'description' => 'sometimes|required|string',
            'image1' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
            'image2' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
            'image3' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
        ]);

        // Update gambar hanya jika ada file baru yang diunggah
        if ($request->hasFile('image1')) {
            Storage::disk('public')->delete($aboutUs->image1); // Hapus gambar lama
            $validated['image1'] = $request->file('image1')->store('about_us', 'public');
        } else {
            $validated['image1'] = $aboutUs->image1; // Gunakan gambar lama
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

        // Update record
        $aboutUs->update($validated);

        return response()->json(['success' => 'About Us updated successfully!']);
    }

    /**
     * Delete an About Us record.
     */
    public function destroy($id)
    {
        $aboutUs = AboutUs::findOrFail($id);

        // Delete associated images
        Storage::disk('public')->delete([$aboutUs->image1, $aboutUs->image2, $aboutUs->image3]);

        // Delete the record
        $aboutUs->delete();

        return response()->json(['success' => 'About Us deleted successfully!']);
    }
}
