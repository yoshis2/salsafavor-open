<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class InquiryMail extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    protected $inquiry;

    public function __construct($inquiry)
    {
        $this->inquiry = $inquiry;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this
            ->from(config('mail.from.address'), 'SalsaFavor問合せ窓口')
            ->subject('[SalsaFavor]お問合せ承りました。(件名 : '.$this->inquiry['title'].')')
            ->view('mail.inquiry')
            ->with(['inquiry' => $this->inquiry])
            ->withSymfonyMessage(function ($message) {
                $message->getHeaders()
                    ->addTextHeader('X-Mailer', 'salsafavor-mailer')
                    ->addTextHeader('Organization', 'SalsaFavor')
                    ->addTextHeader('X-Priority', '3');
            });
    }
}
