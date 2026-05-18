#!/usr/bin/env bash
# Publish a writing post: verify it's not a draft, commit, push.
# Usage: ./scripts/publish-post.sh your-slug
#    or: npm run publish-post -- your-slug

set -euo pipefail

if [ $# -lt 1 ]; then
  echo "Usage: $0 your-slug" >&2
  echo "(the slug is the filename without .md, e.g. 'why-ai-now')" >&2
  exit 1
fi

SLUG="$1"
REPO_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
FILE="$REPO_ROOT/content/writing/$SLUG.md"

if [ ! -f "$FILE" ]; then
  echo "Error: $FILE not found." >&2
  echo "Use 'npm run new-post' to create it first, or check the slug." >&2
  exit 1
fi

# Refuse to publish if still marked draft
if grep -qE '^draft:\s*true' "$FILE"; then
  echo "Error: $FILE still has 'draft: true' in frontmatter." >&2
  echo "Remove that line (or set draft: false) before publishing." >&2
  exit 1
fi

# Refuse to publish if excerpt or title is empty
if grep -qE '^title:\s*""' "$FILE"; then
  echo "Error: $FILE has an empty title." >&2
  exit 1
fi
if grep -qE '^excerpt:\s*""' "$FILE"; then
  echo "Warning: $FILE has an empty excerpt. The index card will look sparse." >&2
  read -r -p "Publish anyway? [y/N] " ANSWER
  case "$ANSWER" in
    [yY]|[yY][eE][sS]) ;;
    *) echo "Aborted."; exit 1 ;;
  esac
fi

cd "$REPO_ROOT"

echo "Staging $FILE..."
git add "$FILE"

echo "Committing..."
git commit -m "writing: $SLUG"

echo "Pushing to origin/main..."
git push origin main

echo ""
echo "Pushed. Vercel will auto-deploy in ~60 seconds."
echo "Live URL: https://hau.ge/writing/$SLUG"
