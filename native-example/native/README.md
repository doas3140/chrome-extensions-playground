# Docs

More info: `https://developer.chrome.com/docs/apps/nativeMessaging/`

NOTE: We use following name: `pingpong`

## Prep

1. Change allowed_origins in manifest.json to match your extension key (found in chrome://extensions/)

## Install

### Linux

NOTE: `we will install to /usr/local/bin/`
NOTE: this is for chrome. for chromium read docs

```bash
cargo build --release
sudo cp target/release/pingpong /usr/local/bin/pingpong
sudo cp manifest.json ~/.config/google-chrome/NativeMessagingHosts/pingpong.json
```

### Windows (only tested on Linux, so this can be a bit wrong)

Installer must create registry key:
`HKEY_LOCAL_MACHINE\SOFTWARE\Google\Chrome\NativeMessagingHosts\pingpong`
or 
`HKEY_CURRENT_USER\SOFTWARE\Google\Chrome\NativeMessagingHosts\pingpong`
and set default value of that key to the full path to the manifest file.

Do that w/ folowing:

```bash
REG ADD "HKCU\Software\Google\Chrome\NativeMessagingHosts\pingpong" /ve /t REG_SZ /d "C:\path\to\nmh-manifest.json" /f
```

or w/ .reg file

```reg
Windows Registry Editor Version 5.00
[HKEY_CURRENT_USER\Software\Google\Chrome\NativeMessagingHosts\pingpong]
@="C:\\path\\to\\nmh-manifest.json"
```
