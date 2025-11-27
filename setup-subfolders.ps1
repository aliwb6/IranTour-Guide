Write-Host "Creating sub-folders..." -ForegroundColor Green

# Public sub-folders
New-Item -ItemType Directory -Path "public\images\events" -Force
New-Item -ItemType Directory -Path "public\images\cities" -Force
New-Item -ItemType Directory -Path "public\images\organizations" -Force
New-Item -ItemType Directory -Path "public\fonts\vazirmatn" -Force
New-Item -ItemType Directory -Path "public\icons" -Force
New-Item -ItemType Directory -Path "public\locales\fa" -Force
New-Item -ItemType Directory -Path "public\locales\en" -Force

# Prisma sub-folders
New-Item -ItemType Directory -Path "prisma\migrations" -Force
New-Item -ItemType Directory -Path "prisma\seeds" -Force

# Docs sub-folders
New-Item -ItemType Directory -Path "docs\architecture" -Force
New-Item -ItemType Directory -Path "docs\api" -Force

# Src sub-folders
New-Item -ItemType Directory -Path "src\app\api" -Force
New-Item -ItemType Directory -Path "src\components\ui" -Force
New-Item -ItemType Directory -Path "src\components\layout" -Force
New-Item -ItemType Directory -Path "src\components\shared" -Force
New-Item -ItemType Directory -Path "src\features\events" -Force
New-Item -ItemType Directory -Path "src\features\auth" -Force
New-Item -ItemType Directory -Path "src\features\search" -Force
New-Item -ItemType Directory -Path "src\lib\api" -Force
New-Item -ItemType Directory -Path "src\lib\db" -Force
New-Item -ItemType Directory -Path "src\lib\utils" -Force

# Tests sub-folders
New-Item -ItemType Directory -Path "tests\unit" -Force
New-Item -ItemType Directory -Path "tests\integration" -Force

Write-Host "Done! All sub-folders created!" -ForegroundColor Cyan