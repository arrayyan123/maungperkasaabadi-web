<?php

namespace App\Http\Controllers;

use App\Models\Newsletter;
use App\Models\Subscriber;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Storage;

class NewsletterController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'body' => 'required|string',
            'image' => 'nullable|image'
        ]);
        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('newsletters', 'public');
            $validated['image'] = $imagePath;
        }
        $newsletter = Newsletter::create($validated);

        $subscribers = Subscriber::all();
        foreach ($subscribers as $subscriber) {
            Mail::send('emails.newsletter', [
                'title' => $newsletter->title,
                'body' => $newsletter->body,
                'image' => $newsletter->image,
                'email' => $subscriber->email,
            ], function ($message) use ($subscriber, $newsletter) {
                $message->to($subscriber->email)
                        ->subject($newsletter->title);
            });
        }

        return response()->json(['message' => 'Newsletter sent successfully']);
    }

    public function index()
    {
        $newsletter = Newsletter::all();
        return response()->json($newsletter);
    }

    public function destroy($id)
    {
        $newsletter = Newsletter::findOrFail($id);

        if ($newsletter->image) {
            Storage::disk('public')->delete($newsletter->image);
        }
        $newsletter->delete();

        return response()->json(['message' => 'Newsletter deleted successfully']);
    }
}