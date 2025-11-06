# === Configuración ===
$env:PM2_HOME = "C:\pm2"
$AppName      = "mysticforge"
$ProjectPath  = "C:\Users\nicoc\Downloads\MysticForge1"
$ServerJs     = Join-Path $ProjectPath "server.js"
$DbFile       = Join-Path $ProjectPath "database.db"
$BackupDir    = Join-Path $ProjectPath "backups"

# Crear carpeta backups si no existe
New-Item -ItemType Directory -Force -Path $BackupDir | Out-Null

# Nombre del backup con milisegundos para evitar duplicados
$timestamp   = [DateTime]::Now.ToString("yyyy-MM-dd_HH-mm-ss-fff")
$backupPath  = Join-Path $BackupDir ("database_{0}.db" -f $timestamp)

Write-Host "Creando backup de MysticForge..."

# Detener aplicación (si está corriendo)
pm2 stop $AppName 2>$null | Out-Null

# Copiar base de datos
Copy-Item $DbFile $backupPath -Force

# Volver a iniciar aplicación
pm2 start $AppName | Out-Null

Write-Host "✅ Backup creado correctamente: $backupPath"
