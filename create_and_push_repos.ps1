# Script to create GitHub repos and push code
# Requires GitHub Personal Access Token with repo scope
# Get token at: https://github.com/settings/tokens

param(
    [string]$token = ""
)

$gitPath = "C:\Program Files\Git\bin\git.exe"
$username = "elviszhao1222"
$baseUrl = "https://api.github.com"

# Projects to create
$projects = @(
    @{path="C:\Users\Lenovo\PycharmProjects\missileGuidance"; repo="missile-guidance"; desc="Missile Guidance System"},
    @{path="C:\Users\Lenovo\PycharmProjects\PythonProject1"; repo="graph-algorithms"; desc="Graph Algorithms"},
    @{path="C:\Users\Lenovo\PycharmProjects\PhysicsResistanceTest"; repo="physics-resistance"; desc="Physics Resistance Test"},
    @{path="C:\Users\Lenovo\PycharmProjects\Eulersmethod"; repo="eulers-method"; desc="Euler's Method"},
    @{path="C:\Users\Lenovo\PycharmProjects\pygameTest"; repo="pygame-test"; desc="Pygame Test"},
    @{path="C:\Users\Lenovo\source\repos\AccToDisplace\AccToDisplace"; repo="acc-to-displace"; desc="Acceleration to Displacement"},
    @{path="C:\Users\Lenovo\source\repos\AutoCar\AutoCar"; repo="autonomous-car"; desc="Autonomous Car"},
    @{path="C:\Users\Lenovo\source\repos\VEX_98060C_v4.0\VEX_98060C_v4.0"; repo="vex-ekf"; desc="VEX Robotics EKF"},
    @{path="C:\Users\Lenovo\source\repos\GameProject_1\GameProject_1"; repo="time-maze-game"; desc="Time Maze Game"},
    @{path="C:\Users\Lenovo\Downloads\Stanford Summer School"; repo="stanford-ai-projects"; desc="Stanford AI Projects"},
    @{path="C:\Users\Lenovo\Documents\vexcode-projects\programtest"; repo="vex-programtest"; desc="VEX Program Test"},
    @{path="C:\Users\Lenovo\Documents\vexcode-projects\turtle"; repo="vex-turtle"; desc="VEX Turtle"},
    @{path="C:\Users\Lenovo\Documents\vexcode-projects\turtle2.0"; repo="vex-turtle-2"; desc="VEX Turtle 2.0"},
    @{path="C:\Users\Lenovo\Documents\vexcode-projects\VEXEZ"; repo="vex-ez"; desc="VEXEZ"}
)

if ($token) {
    $headers = @{
        "Authorization" = "token $token"
        "Accept" = "application/vnd.github.v3+json"
    }

    foreach ($proj in $projects) {
        Write-Host "Creating repo: $($proj.repo)" -ForegroundColor Cyan
        
        $body = @{
            name = $proj.repo
            description = $proj.desc
            private = $false
            auto_init = $false
        } | ConvertTo-Json

        try {
            $response = Invoke-RestMethod -Uri "$baseUrl/user/repos" -Method Post -Headers $headers -Body $body
            Write-Host "  ✓ Created $($proj.repo)" -ForegroundColor Green
        }
        catch {
            if ($_.Exception.Response.StatusCode -eq 422) {
                Write-Host "  ⚠ Repo already exists: $($proj.repo)" -ForegroundColor Yellow
            } else {
                Write-Host "  ✗ Error: $_" -ForegroundColor Red
            }
        }
    }
}

# Now push all projects
Write-Host "`nPushing all projects..." -ForegroundColor Cyan
foreach ($proj in $projects) {
    if (Test-Path $proj.path) {
        Push-Location $proj.path
        try {
            & $gitPath branch -M main 2>$null
            & $gitPath push -u origin main --force 2>&1 | Out-Null
            Write-Host "  ✓ Pushed $($proj.repo)" -ForegroundColor Green
        }
        catch {
            Write-Host "  ✗ Failed to push $($proj.repo): $_" -ForegroundColor Red
        }
        Pop-Location
    }
}

Write-Host "`nDone! If repos weren't created, create them manually at https://github.com/new" -ForegroundColor Cyan

