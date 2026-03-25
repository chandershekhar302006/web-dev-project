# Verify PostgreSQL Installation

Write-Host "Checking PostgreSQL installation..." -ForegroundColor Green
Write-Host ""

# Check if psql is installed
$psql = Get-Command psql -ErrorAction SilentlyContinue

if ($psql) {
    Write-Host "✓ PostgreSQL is installed!" -ForegroundColor Green
    Write-Host "Location: $($psql.Source)"
    Write-Host ""
    Write-Host "PostgreSQL Version:"
    psql --version
} else {
    Write-Host "✗ PostgreSQL is not installed or not in PATH" -ForegroundColor Red
    Write-Host ""
    Write-Host "Please install PostgreSQL from: https://www.postgresql.org/download/windows/" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Or add PostgreSQL to your PATH:" -ForegroundColor Yellow
    Write-Host "1. Search 'Environment Variables' in Windows"
    Write-Host "2. Edit 'Path' variable"
    Write-Host "3. Add PostgreSQL bin folder (usually: C:\Program Files\PostgreSQL\15\bin)"
    exit 1
}

Write-Host ""
Write-Host "✓ You're ready to use PostgreSQL!" -ForegroundColor Green
