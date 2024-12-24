<?php

namespace App\Http\Controllers;

use App\Models\Contact;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;

class ContactController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'subject' => 'required|string|max:255',
            'message' => 'required|string',
        ]);

        $contact = Contact::create($validated);
    
        Mail::send([], [], function ($mail) use ($contact) {
            $mail->to($contact->email)
                 ->subject('Thank You for Contacting Us')
                 ->html(view('emails.contact', [
                     'header' => 'Thank You for Contacting Us',
                     'name' => $contact->name,
                     'body' => 'We have received your message. Our team will get back to you as soon as possible.',
                 ])->render());
        });
    
        return response()->json(['message' => 'Message sent successfully.']);
    }

    public function index()
    {
        $contacts = Contact::orderBy('created_at', 'desc')->get();
        return inertia('DashboardPage/ContactManage', ['contacts' => $contacts]);
    }

    public function reply(Request $request, $id)
    {
        $contact = Contact::findOrfail($id);
    
        Log::info('Request data:', $request->all());
    
        $validated = $request->validate([
            'reply' => 'required|string',
        ]);
    
        try {
            Mail::send([], [], function ($mail) use ($contact, $validated) {
                $mail->to($contact->email)
                    ->subject('Reply to Your Message')
                    ->html(view('emails.contact', [
                        'header' => 'Reply from Admin',
                        'name' => $contact->name,
                        'body' => $validated['reply'],
                    ])->render());
            });
    
            return response()->json(['message' => 'Reply sent successfully.']);
        } catch (\Exception $e) {
            Log::error('Failed to send reply email: ' . $e->getMessage());
            return response()->json(['error' => 'Failed to send reply email.'], 500);
        }
    }    

    public function destroy($id) {
        $contact = Contact::findOrFail($id);
        $contact->delete();
        return response()->json(['message' => 'Contact berhasil di hapus']);
    }
}
