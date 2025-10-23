@echo off
:: ==============================
::  AUTO PUSH + LOCAL PREVIEW
:: ==============================

:: Go to your project folder (change this path if needed)
cd /d "C:\Users\hamex\OneDrive\Desktop\av-values"

echo ----------------------------------------
echo Adding, committing, and pushing changes...
echo ----------------------------------------

git add .
git commit -m "auto update"
git push

if %errorlevel% neq 0 (
    echo ❌ Push failed. Check your internet or Git setup.
    pause
    exit /b
)

echo.
echo ✅ Code pushed successfully!
echo Vercel will now auto-deploy your latest commit.
echo ----------------------------------------

:: Start local dev server
echo Starting local development server...
//call npm run dev

:: Keep window open at end
pause
