# Instructions to Create GitHub Repositories

Your projects are ready to push but the GitHub repositories need to be created first.

## Option 1: Create Repos Manually (Easiest)

1. Go to https://github.com/new
2. Create each repository with these exact names (all lowercase with hyphens):
   - `missile-guidance`
   - `graph-algorithms`
   - `physics-resistance`
   - `eulers-method`
   - `pygame-test`
   - `acc-to-displace`
   - `autonomous-car`
   - `vex-ekf`
   - `time-maze-game`
   - `stanford-ai-projects`
   - `vex-programtest`
   - `vex-turtle`
   - `vex-turtle-2`
   - `vex-ez`

3. **Important**: When creating each repo:
   - ✅ Make it **Public**
   - ❌ Do **NOT** initialize with README
   - ❌ Do **NOT** add .gitignore or license

4. After creating all repos, run:
   ```powershell
   powershell -ExecutionPolicy Bypass -File create_and_push_repos.ps1
   ```

## Option 2: Use GitHub API (Automatic)

1. Create a Personal Access Token:
   - Go to https://github.com/settings/tokens
   - Click "Generate new token (classic)"
   - Name: "Upload Projects"
   - Select scope: `repo` (full control)
   - Click "Generate token"
   - **Copy the token** (you won't see it again!)

2. Run the script with your token:
   ```powershell
   powershell -ExecutionPolicy Bypass -File create_and_push_repos.ps1 -token "YOUR_TOKEN_HERE"
   ```

## After Repos Are Created

Once all repos are pushed, your portfolio website will automatically link to them!

