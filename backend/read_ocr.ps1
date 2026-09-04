Add-Type -AssemblyName System.Drawing
[Windows.Globalization.Language, Windows.Foundation, ContentType = WindowsRuntime] | Out-Null
[Windows.Graphics.Imaging.BitmapDecoder, Windows.Foundation, ContentType = WindowsRuntime] | Out-Null
[Windows.Media.Ocr.OcrEngine, Windows.Foundation, ContentType = WindowsRuntime] | Out-Null
[Windows.Storage.StorageFile, Windows.Foundation, ContentType = WindowsRuntime] | Out-Null

$engine = [Windows.Media.Ocr.OcrEngine]::TryCreateFromUserProfileLanguages()
if (-not $engine) {
    $lang = New-Object Windows.Globalization.Language("fr-FR")
    $engine = [Windows.Media.Ocr.OcrEngine]::TryCreateFromLanguage($lang)
}

function Run-Ocr($filePath) {
    $absPath = [System.IO.Path]::GetFullPath($filePath)
    $fileTask = [Windows.Storage.StorageFile]::GetFileFromPathAsync($absPath)
    $file = $fileTask.AsTask().GetAwaiter().GetResult()
    
    $streamTask = $file.OpenAsync([Windows.Storage.FileAccessMode]::Read)
    $stream = $streamTask.AsTask().GetAwaiter().GetResult()
    
    $decoderTask = [Windows.Graphics.Imaging.BitmapDecoder]::CreateAsync($stream)
    $decoder = $decoderTask.AsTask().GetAwaiter().GetResult()
    
    $bitmapTask = $decoder.GetSoftwareBitmapAsync()
    $bitmap = $bitmapTask.AsTask().GetAwaiter().GetResult()
    
    $ocrTask = $engine.RecognizeAsync($bitmap)
    $result = $ocrTask.AsTask().GetAwaiter().GetResult()
    
    return $result.Text
}

$files = 7..17 | ForEach-Object { "../extracted_media_full/image$_.jpeg" }
foreach ($f in $files) {
    if (Test-Path $f) {
        Write-Output "========================================"
        Write-Output "FILE: $f"
        $text = Run-Ocr $f
        Write-Output $text
    }
}
