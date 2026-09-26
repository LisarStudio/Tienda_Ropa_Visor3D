import os
import subprocess

repo_dir = os.path.dirname(os.path.abspath(__file__))
dist_dir = os.path.join(repo_dir, "dist")

print("Building production bundle with Vite...")
subprocess.run(["npm", "run", "build"], cwd=repo_dir, check=True, shell=True)

if not os.path.exists(dist_dir):
    print("Error: dist folder not found after build.")
    exit(1)

with open(os.path.join(dist_dir, ".nojekyll"), "w", encoding="utf-8") as f:
    f.write("")

print("Force pushing dist to GitHub Pages branch (gh-pages)...")
cmd = "npx --yes gh-pages -d dist --dotfiles -f"
subprocess.run(cmd, cwd=repo_dir, check=True, shell=True)
print("Deployment to GitHub Pages successfully completed!")
