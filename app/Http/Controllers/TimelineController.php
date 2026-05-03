<?php

namespace App\Http\Controllers;

use App\Models\Timeline;
use Illuminate\Http\Request;

class TimelineController extends Controller
{
    public function index()
    {
        return Timeline::orderBy('year')->get();
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'year' => 'required|string|max:20',
            'title' => 'required|string|max:255',
            'desc' => 'required|string',
            'tags' => 'nullable|array',
            'tags.*.text' => 'required_with:tags|string',
            'tags.*.class' => 'required_with:tags|string',
            'right' => 'boolean',
            'gradient' => 'boolean',
            'pulse' => 'boolean',
        ]);
        return Timeline::create($data);
    }

    public function show(Timeline $timeline)
    {
        return $timeline;
    }

    public function update(Request $request, Timeline $timeline)
    {
        $data = $request->validate([
            'year' => 'required|string|max:20',
            'title' => 'required|string|max:255',
            'desc' => 'required|string',
            'tags' => 'nullable|array',
            'tags.*.text' => 'required_with:tags|string',
            'tags.*.class' => 'required_with:tags|string',
            'right' => 'boolean',
            'gradient' => 'boolean',
            'pulse' => 'boolean',
        ]);
        $timeline->update($data);
        return $timeline;
    }

    public function destroy(Timeline $timeline)
    {
        $timeline->delete();
        return response()->json(['success' => true]);
    }
}