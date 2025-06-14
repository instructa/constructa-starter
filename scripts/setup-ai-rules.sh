#!/bin/bash

# Setup AI Rules for All Editors
# This script syncs rules from the unified .rules file to all supported editors

echo "🚀 Setting up AI rules across all editors..."

# Array of rules to sync
RULES=(
  "main-project-rules"
  "auth-api"
  "development-workflow"
  "database-schema"
)

# Array of editors to sync to
EDITORS=(
  "cursor"
  "windsurf"
  "claude-code"
  "vscode"
  "codex"
  "amp"
  "zed"
)

# First, ensure vibe-rules is installed
if ! command -v vibe-rules &> /dev/null; then
    echo "❌ vibe-rules is not installed. Installing globally..."
    pnpm add -g vibe-rules
fi

# Save rules from unified file to vibe-rules store
echo "📦 Saving rules to vibe-rules store..."
for rule in "${RULES[@]}"; do
  echo "  - Saving $rule..."
  # Extract content between tags from .rules file
  awk "/<$rule>/,/<\/$rule>/" .rules | sed '1d;$d' > /tmp/vibe-rule-temp.md
  vibe-rules save "$rule" -f /tmp/vibe-rule-temp.md -d "Extracted from project .rules file"
  rm /tmp/vibe-rule-temp.md
done

# Apply rules to each editor
for editor in "${EDITORS[@]}"; do
  echo "📝 Applying rules to $editor..."
  for rule in "${RULES[@]}"; do
    echo "  - Loading $rule..."
    vibe-rules load "$rule" "$editor" || echo "    ⚠️  Failed to load $rule for $editor (might not be supported)"
  done
done

echo "✅ AI rules setup complete!"
echo ""
echo "📋 Summary:"
echo "  - Rules saved: ${#RULES[@]}"
echo "  - Editors configured: ${#EDITORS[@]}"
echo ""
echo "💡 Tip: Run this script whenever you update your .rules file to sync changes." 