<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class WithdrawMail extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    protected $user;

    public function __construct($user)
    {
        //
        $this->user = $user;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->from(config('mail.from.address'), 'SalsaFavor退会処理委員会')
            ->subject('[salsafavor]退会完了のお知らせ。')
            ->view('mail.withdrawal')
            ->with(['user' => $this->user])
            ->withSymfonyMessage(function ($message) {
                $message->getHeaders()
                    ->addTextHeader('X-Mailer', 'salsafavor-mailer')
                    ->addTextHeader('Organization', 'SalsaFavor')
                    ->addTextHeader('X-Priority', '3');
            });
    }
}
