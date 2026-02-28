<?php

namespace App\Mail;

use Illuminate\Auth\Notifications\VerifyEmail;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class CustomVerifyEmail extends VerifyEmail
{
    use Queueable, SerializesModels;

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct()
    {
        //
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
     * Get the mail representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return \Illuminate\Notifications\Messages\MailMessage
     */
    public function toMail($notifiable)
    {
        /** @var \Illuminate\Notifications\Messages\MailMessage */
        return (new Mailable)
            ->from(config('mail.from.address'), 'SalsaFavor会員登録窓口')
            ->to($notifiable->email, $notifiable->name)
            ->subject('サルサ総合ポータルSalsaFavor 会員登録メール認証のお知らせ')
            ->view('mail.verify_auth', [
                'url' => $notifiable,
                'actionUrl' => $this->verificationUrl($notifiable),
                'actionText' => 'メール認証確認へ',
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
