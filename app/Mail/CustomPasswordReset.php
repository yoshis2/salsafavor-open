<?php

namespace App\Mail;

use Illuminate\Auth\Notifications\ResetPassword;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class CustomPasswordReset extends ResetPassword
{
    use Queueable, SerializesModels;

    /** @var string */
    public $token;

    /**
     * Create a new message instance.
     *
     * @param  string  $token
     * @return void
     */
    public function __construct($token)
    {
        $this->token = $token;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function via($notifiable)
    {
        return ['mail'];
    }

    /**
     * @param  mixed  $notifiable
     * @return \Illuminate\Notifications\Messages\MailMessage
     */
    public function toMail($notifiable)
    {
        /** @var \Illuminate\Notifications\Messages\MailMessage */
        return (new Mailable)
            ->from(config('mail.from.address'), 'SalsaFavor問合せ窓口')
            ->to($notifiable->email, $notifiable->name)
            ->subject(config('mail.from.name').__('auth.reset_password').'リンク送信のお知らせ')
            ->view('mail.password_reset', [
                'url' => $notifiable,
                'actionUrl' => $this->resetUrl($notifiable),
                'actionText' => 'メール再設定画面へ',
            ])
            ->withSymfonyMessage(function ($message) {
                $message->getHeaders()
                    ->addTextHeader('X-Mailer', 'salsafavor-mailer')
                    ->addTextHeader('Organization', 'SalsaFavor')
                    ->addTextHeader('X-Priority', '3');
            });
    }

    /**
     * Get the array representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function toArray($notifiable)
    {
        return [
            //
        ];
    }
}
