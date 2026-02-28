<?php

namespace App\Services;

use File;
use Intervention\Image\Drivers\Gd\Driver;
use Intervention\Image\ImageManager;
use Log;
use Storage;

class ImageService
{
    public function deleteFile($path, $pastFile)
    {
        // もし、画像が存在する場合は削除
        if ($pastFile) {
            try {
                Storage::disk('local')->delete($path.'/'.$pastFile);
            } catch (\Exception $e) {
                Log::error('Error deleting file: '.$e->getMessage());
                throw $e;
            }
        }
    }

    public function deleteDirectory($path)
    {
        try {
            Storage::disk('local')->deleteDirectory($path);
        } catch (\Exception $e) {
            Log::error('Error deleting directory: '.$e->getMessage());
            throw $e;
        }
    }

    public function makeDirectory($path)
    {
        try {
            if (! File::exists($path)) {
                File::makeDirectory($path, $mode = 0775, true, true);
            }
        } catch (\Exception $e) {
            Log::error('ディレクトリ作成エラー: '.$e->getMessage());
            throw $e;
        }
    }

    public function resize($file, $path, $widthtype)
    {
        // ファイル読み取り
        $manager = new ImageManager(new Driver);
        $image = $manager->read($file);

        $ratio = $widthtype / $image->width();
        $width = $widthtype;
        $height = $image->height() * $ratio;
        if ($image->width() < $image->height()) {
            $ratio = $widthtype / $image->height();
            $width = $image->width() * $ratio;
            $height = $widthtype;
        }

        $image->scale(width: (int) $width, height: (int) $height);

        // ファイル名指定
        $filename = md5(date('Y-m-d H:i:s').$file->getClientOriginalName()).'.'.$file->getClientOriginalExtension();
        $image->save($path.'/'.$filename);

        return $filename;
    }
}
