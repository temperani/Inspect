<#
run-expo.ps1
Script para facilitar o start do Expo e preparação adb reverses para dispositivos Android.
Uso:
  - Tunnel: usar tunnel mode (default = false)
  - Android: tentar abrir (npx expo run:android) ou usar expo internal option to open on android
  - UseADB: se `adb` estiver presente, aplica `adb reverse` nas portas relevantes
  - Clear: limpar cache do expo antes de iniciar
  - StartAVD: se `emulator` disponível, inicia o primeiro AVD listado

Exemplos:
  .\run-expo.ps1 -Tunnel -UseADB
  .\run-expo.ps1 -Android -UseADB -StartAVD
#>

param (
    [switch]$Tunnel,
    [switch]$Android,
    [switch]$UseADB,
    [switch]$Clear,
    [switch]$StartAVD
)

function Write-Info($msg) { Write-Host "[INFO] $msg" -ForegroundColor Cyan }
function Write-Warn($msg) { Write-Host "[WARN] $msg" -ForegroundColor Yellow }
function Write-ErrorLog($msg) { Write-Host "[ERROR] $msg" -ForegroundColor Red }

# Ensure we are in the project root or current folder
$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
Push-Location $scriptDir

# Helper: check if a command exists
function Command-Exists($cmd) {
    $null -ne (Get-Command $cmd -ErrorAction SilentlyContinue)
}

# 1) Basic checks
if (-not (Command-Exists node)) {
    Write-ErrorLog "Node.js não encontrado. Instale Node e tente novamente."
    Exit 1
}

# Is npx available? Usually comes with npm
if (-not (Command-Exists npx)) {
    Write-Warn "npx não foi encontrado — tente instalar expo-cli globalmente com 'npm i -g expo-cli' ou verifique o Node/npm no PATH."
}

# 2) Optional: Try to use adb for reverse if requested
if ($UseADB) {
    if (-not (Command-Exists adb)) {
        Write-Warn "adb não está no PATH. Ignorando adb reverse. Você pode instalar platform-tools ou conectar dispositivo via Wi-Fi."
    } else {
        Write-Info "Verificando dispositivos conectados com adb..."
        $devices = adb devices | Select-Object -Skip 1 | ForEach-Object { $_.Trim() } | Where-Object { $_ -ne "" }
        if (-not $devices) {
            Write-Warn "Nenhum dispositivo/emulador conectado via adb. (verifique com 'adb devices')"
        } else {
            Write-Info "Dispositivos detectados:"
            $devices | ForEach-Object { Write-Host " - $_" }

            # Apply reverse for default ports used by expo & Metro
            $ports = @(19000,19001,8081)
            foreach ($p in $ports) {
                Write-Info "Aplicando adb reverse na porta $p..."
                # extract device serial if line contains <serial>\tdevice
                foreach ($dline in $devices) {
                    if ($dline -match "^([^\s]+)\s+device") {
                        $serial = $Matches[1]
                        try {
                            adb -s $serial reverse tcp:$p tcp:$p | Out-Null
                            Write-Info "Reversed $p for $serial"
                        } catch {
                            Write-Warn "Falha ao aplicar reverse em porta $p para $serial: $_"
                        }
                    }
                }
            }
        }
    }
}

# 3) Optional: Start AVD if requested and emulator command is available
if ($StartAVD) {
    if (-not (Command-Exists emulator)) {
        Write-Warn "emulator (Android SDK) não encontrado no PATH; não será iniciado."
    } else {
        try {
            $avds = emulator -list-avds
            if (-not $avds) {
                Write-Warn "Nenhum AVD encontrado. Crie um AVD com avdmanager create avd -n <name> ..."
            } else {
                $selectedAvd = $avds.Split("`n")[0].Trim()
                Write-Info "Iniciando AVD: $selectedAvd"
                Start-Process -FilePath emulator -ArgumentList "-avd", $selectedAvd -NoNewWindow
                Start-Sleep -Seconds 4
            }
        } catch {
            Write-Warn "Falha ao listar/abrir AVD: $_"
        }
    }
}

# 4) Decide expo start flags
$expoArgs = @()
if ($Tunnel) { $expoArgs += "--tunnel" }
if ($Clear) { $expoArgs += "--clear" }

$expoArgsString = $expoArgs -join ' '

# 5) Start Expo in a new terminal window so logs remain visible
Write-Info "Iniciando Expo (npx expo start $expoArgsString) em nova janela de Terminal..."
$psCommand = "npx expo start $expoArgsString"
Start-Process -FilePath powershell -ArgumentList "-NoExit","-Command`,"$psCommand" -WindowStyle Normal

# 6) Optionally open on Android (if the user chose it)
if ($Android) {
    if (-not (Command-Exists adb)) {
        Write-Warn "adb não encontrado — opção Android pode não abrir automaticamente."
    }
    Write-Info "Tentando abrir no Android (npx expo run:android or npx expo start --android)" 
    Start-Process -FilePath powershell -ArgumentList "-NoExit","-Command`,`"npx expo start --android" -WindowStyle Normal
}

Write-Info "Script finalizado. Verifique a nova janela do terminal do Expo para o QR code. Abra o Expo Go no dispositivo e escaneie o QR (ou utilize Tunnel se problemas de rede)."

Pop-Location
