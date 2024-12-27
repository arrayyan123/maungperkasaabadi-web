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
}