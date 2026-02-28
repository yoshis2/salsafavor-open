<?php

namespace App\Services;

use App\Mail\InquiryMail;
use Illuminate\Support\Facades\Mail;

class InquiryService
{
    public function send($inquiry)
    {
        // メール送信
        $addresses = [$inquiry['mail'], config('mail.from.address')];
        foreach ($addresses as $address) {
            Mail::to($address)->send(new InquiryMail($inquiry));
        }
    }
}
