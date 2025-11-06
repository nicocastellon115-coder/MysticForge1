$ProjectPath = "C:\Users\nicoc\Downloads\MysticForge1"
$DbFile      = Join-Path $ProjectPath "database.db"
$BackupDir   = Join-Path $ProjectPath "backups"

# Asegura carpeta
New-Item -ItemType Directory -Force -Path $BackupDir | Out-Null

# Nombre ÚNICO con milisegundos
$stamp      = [DateTime]::Now.ToString("yyyy-MM-dd_HH-mm-ss-fff")
$backupPath = Join-Path $BackupDir ("database_{0}.db" -f $stamp)

Write-Host "DB: $DbFile"
Write-Host "Backup destino: $backupPath"

if (-not (Test-Path $DbFile)) {
  Write-Host "ERROR: No existe database.db en $ProjectPath"
  exit 1
}

# Copia con errores visibles
Copy-Item $DbFile $backupPath -Force -ErrorAction Stop
Write-Host "OK: Copia creada"
