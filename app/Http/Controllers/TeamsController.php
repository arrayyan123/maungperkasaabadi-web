<?php

namespace App\Http\Controllers;

use App\Models\Teams;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class TeamsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $teams = Teams::all();
        return response()->json($teams);
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
            'name' => 'required|string|max:255',
            'position' => 'required|string',
            'description' => 'required|string',
            'image' => 'nullable|image'
        ]);

        if ($request->hasFile('image')) {
            $validated['image'] = $request->file('image')->store('teams', 'public');
        }
        Teams::create($validated);

        return redirect()->back()->with('success', 'Team Member success being added');
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
        $member = Teams::findOrFail($id);

        $validated = $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'position' => 'sometimes|required|string',
            'description' => 'nullable|string',
            'image' => 'nullable|image'
        ]);

        if ($request->hasFile('image')) {
            if ($member->image) {
                Storage::disk('public')->delete($member->image);
            }
            $validated['image'] = $request->file('image')->store('teams', 'public');
        } else {
            $validated['image'] = $member->image;
        }

        $updated = $member->update($validated);

        return response()->json([
            'message' => $updated ? 'Member updated successfully' : 'Failed to update member',
            'Teams' => $member,
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $member = Teams::findOrFail($id);
        
        if($member->image) {
            Storage::disk('public')->delete($member->image);
        }

        $member->delete();

        return response()->json(['message' => 'partner berhasil di hapus']);
    }
}
