Write-Host "Creating folders..." -ForegroundColor Green

New-Item -ItemType Directory -Path ".github" -Force
New-Item -ItemType Directory -Path ".husky" -Force
New-Item -ItemType Directory -Path ".vscode" -Force
New-Item -ItemType Directory -Path "docs" -Force
New-Item -ItemType Directory -Path "public" -Force
New-Item -ItemType Directory -Path "prisma" -Force
New-Item -ItemType Directory -Path "scripts" -Force
New-Item -ItemType Directory -Path "src" -Force
New-Item -ItemType Directory -Path "tests" -Force

New-Item -ItemType Directory -Path "src\app" -Force
New-Item -ItemType Directory -Path "src\components" -Force
New-Item -ItemType Directory -Path "src\features" -Force
New-Item -ItemType Directory -Path "src\lib" -Force
New-Item -ItemType Directory -Path "src\config" -Force
New-Item -ItemType Directory -Path "src\types" -Force
New-Item -ItemType Directory -Path "src\hooks" -Force
New-Item -ItemType Directory -Path "src\styles" -Force

Write-Host "Done! Folders created successfully!" -ForegroundColor Cyan
