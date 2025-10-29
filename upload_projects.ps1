# Script to upload projects to GitHub
$gitPath = "C:\Program Files\Git\bin\git.exe"
$username = "elviszhao1222"

# Function to upload a project
function Upload-Project {
    param(
        [string]$projectPath,
        [string]$repoName,
        [string]$description
    )
    
    Write-Host "Uploading $repoName from $projectPath"
    
    if (-not (Test-Path $projectPath)) {
        Write-Host "Path not found: $projectPath" -ForegroundColor Red
        return $false
    }
    
    Push-Location $projectPath
    
    try {
        # Initialize git if not already
        if (-not (Test-Path ".git")) {
            & $gitPath init
            & $gitPath add .
            & $gitPath commit -m "Initial commit: $description"
            & $gitPath branch -M main
        }
        
        # Add remote (will fail if already exists, that's ok)
        & $gitPath remote remove origin 2>$null
        & $gitPath remote add origin "https://github.com/$username/$repoName.git"
        
        # Push (may need authentication)
        & $gitPath push -u origin main --force
        
        Write-Host "Successfully uploaded $repoName" -ForegroundColor Green
        Pop-Location
        return $true
    }
    catch {
        Write-Host "Error uploading $repoName : $_" -ForegroundColor Red
        Pop-Location
        return $false
    }
}

# Python Projects
Upload-Project "C:\Users\Lenovo\PycharmProjects\missileGuidance" "missile-guidance" "Missile Guidance System"
Upload-Project "C:\Users\Lenovo\PycharmProjects\PythonProject1" "graph-algorithms" "Graph Algorithms (BFS, DFS)"
Upload-Project "C:\Users\Lenovo\PycharmProjects\PhysicsResistanceTest" "physics-resistance" "Physics Resistance Test"
Upload-Project "C:\Users\Lenovo\PycharmProjects\Eulersmethod" "eulers-method" "Euler's Method"
Upload-Project "C:\Users\Lenovo\PycharmProjects\pygameTest" "pygame-test" "Pygame Test"

# C++ Projects  
Upload-Project "C:\Users\Lenovo\source\repos\AccToDisplace\AccToDisplace" "acc-to-displace" "Acceleration to Displacement"
Upload-Project "C:\Users\Lenovo\source\repos\AutoCar\AutoCar" "autonomous-car" "Autonomous Car"
Upload-Project "C:\Users\Lenovo\source\repos\VEX_98060C_v4.0\VEX_98060C_v4.0" "vex-ekf" "VEX Robotics EKF"
Upload-Project "C:\Users\Lenovo\source\repos\GameProject_1\GameProject_1" "time-maze-game" "Time Maze Game"

# Stanford AI Projects - combine into one repo
Upload-Project "C:\Users\Lenovo\Downloads\Stanford Summer School" "stanford-ai-projects" "Stanford Summer School AI Projects"

# VEX Projects
Upload-Project "C:\Users\Lenovo\Documents\vexcode-projects\programtest" "vex-programtest" "VEX Program Test"
Upload-Project "C:\Users\Lenovo\Documents\vexcode-projects\turtle" "vex-turtle" "VEX Turtle"
Upload-Project "C:\Users\Lenovo\Documents\vexcode-projects\turtle2.0" "vex-turtle-2" "VEX Turtle 2.0"
Upload-Project "C:\Users\Lenovo\Documents\vexcode-projects\VEXEZ" "vex-ez" "VEXEZ"

Write-Host "`nAll projects upload attempts completed!" -ForegroundColor Cyan
Write-Host "Note: Some repos may need to be created on GitHub first at https://github.com/new"

