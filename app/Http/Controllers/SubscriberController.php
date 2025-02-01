<?php

namespace App\Http\Controllers;

use App\Models\Subscriber;
use App\Mail\ThankYouForSubscribing;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class SubscriberController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:subscribers,email',
        ]);

        $subscriber = Subscriber::create($validated);
        Mail::to($subscriber->email)->send(new ThankYouForSubscribing($subscriber->name, $subscriber->email));

        return response()->json(['message' => 'You have successfully subscribed to the newsletter']);
    }

    public function index()
    {
        $subscriber = Subscriber::orderBy('created_at', 'desc')->get();
        return response()->json($subscriber);
    }

    public function unsubscribe(Request $request)
    {
        $email = $request->query('email');

        // Temukan subscriber berdasarkan email
        $subscriber = Subscriber::where('email', $email)->first();

        if ($subscriber) {
            // Hapus subscriber
            $subscriber->delete();
            return response()->json(['message' => 'You have been unsubscribed successfully.']);
        }

        return response()->json(['message' => 'Subscriber not found.'], 404);
    }

    public function destroy($id)
    {
        $subscriber = Subscriber::findOrFail($id);
        $subscriber->delete();

        return response()->json(['message' => 'Subscriber deleted successfully']);
    }
}