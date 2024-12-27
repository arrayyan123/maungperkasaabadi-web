<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class ThankYouForSubscribing extends Mailable
{
    use Queueable, SerializesModels;
    
    public $name;
    public $email; // Guest email

    /**
     * Create a new message instance.
     *
     * @param string $email
     */
    public function __construct($name, $email)
    {
        $this->name = $name;
        $this->email = $email;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->subject('Thank You for Subscribing!')
                    ->view('emails.thankyou')
                    ->with([
                        'name' => $this->name,
                        'email' => $this->email,
                    ]);
    }
}