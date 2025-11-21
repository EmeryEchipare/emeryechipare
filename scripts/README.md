# Scripts

Helper scripts for managing the Emery Echipare website.

## sync-artwork.ps1

**Purpose:** Manually sync new artwork from your scan folders to the website.

**Usage:**
```powershell
.\scripts\sync-artwork.ps1
```

**What it does:**
1. Copies all JPG and PNG files from your two source folders:
   - `C:\Users\micha\Pictures\Epson V600 Scans\Converted to JPEG to SHARE\Uploaded to Emery Google Drive`
   - `C:\Users\micha\Pictures\Epson V600 Scans\Converted to JPEG to SHARE\Uploaded to Emery Google Drive\Posted to Instagram`
2. Copies them to `public/artwork/`
3. Shows you how many files were added/updated
4. Tells you the next steps

**After running this script:**
1. Tell Warp/AI: "Update lib/artworks.ts with the new images from public/artwork/"
2. Build: `npm run build`
3. Deploy: `npx wrangler pages deploy out --project-name=emeryechipare --branch=main`
4. Commit changes: `git add . && git commit -m "Add new artwork" && git push`

## Desktop Shortcut

A shortcut named "Emery Website.lnk" has been created on your Desktop.

**What it does:**
- Opens Warp
- Automatically sets your working directory to: `C:\Users\micha\Projects\emeryechipare`

**To use:**
1. Double-click "Emery Website.lnk" on your Desktop
2. Warp opens in your project directory
3. Tell the AI: "My project is at C:\Users\micha\Projects\emeryechipare. Please read README.md and the docs folder to get context."
4. Start working!

## Quick Reference

**To add new artwork:**
```powershell
# 1. Run sync script
.\scripts\sync-artwork.ps1

# 2. In Warp, tell AI:
"Update lib/artworks.ts with new images from public/artwork/"

# 3. Build and deploy
npm run build
npx wrangler pages deploy out --project-name=emeryechipare --branch=main

# 4. Commit
git add .
git commit -m "Add new artwork"
git push origin main
```

**To start development server:**
```bash
npm run dev
```
Visit http://localhost:3000

**To build for production:**
```bash
npm run build
```

**To deploy:**
```bash
npx wrangler pages deploy out --project-name=emeryechipare --branch=main
```
