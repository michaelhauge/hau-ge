#!/usr/bin/env bash
# Create a new writing post with frontmatter scaffolded.
# Usage: ./scripts/new-post.sh "Your Article Title"
#    or: npm run new-post -- "Your Article Title"

set -euo pipefail

if [ $# -lt 1 ]; then
  echo "Usage: $0 \"Your Article Title\"" >&2
  exit 1
fi

TITLE="$*"

# Slugify: lowercase, replace non-alphanumeric with hyphens, collapse repeats, trim ends
SLUG=$(printf '%s' "$TITLE" \
  | tr '[:upper:]' '[:lower:]' \
  | sed -E 's/[^a-z0-9]+/-/g' \
  | sed -E 's/^-+|-+$//g')

if [ -z "$SLUG" ]; then
  echo "Error: title produced an empty slug" >&2
  exit 1
fi

REPO_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
FILE="$REPO_ROOT/content/writing/$SLUG.md"

if [ -e "$FILE" ]; then
  echo "Error: $FILE already exists. Pick a different title or remove the existing file." >&2
  exit 1
fi

TODAY=$(date +%Y-%m-%d)

cat > "$FILE" <<EOF
---
title: "$TITLE"
date: "$TODAY"
excerpt: ""
tags: []
draft: true
---

EOF

echo "Created: $FILE"
echo ""
echo "Next steps:"
echo "  1. Open the file and write your article."
echo "  2. Fill in the excerpt and tags in the frontmatter."
echo "  3. When ready to publish, remove the draft: true line."
echo "  4. Run: npm run publish-post -- $SLUG"
echo ""
echo "  Or quick-open in VS Code:  code \"$FILE\""

# Open in editor if $EDITOR is set
if [ -n "${EDITOR:-}" ]; then
  echo ""
  echo "Opening in \$EDITOR ($EDITOR)..."
  $EDITOR "$FILE"
fi
