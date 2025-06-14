# AI Rules Management Guide

This project uses **vibe-rules** to manage AI assistant rules across multiple editors with a single source of truth.

## 🎯 Overview

We maintain all AI rules in a unified `.rules` file at the project root. This ensures consistency across all team members and editors.

## 🚀 Quick Start

```bash
# 1. Install vibe-rules globally (one-time setup)
pnpm run ai:install-vibe

# 2. Sync rules to all supported editors
pnpm run ai:setup

# 3. List all available rules
pnpm run ai:list
```

## 📁 File Structure

```
project-root/
├── .rules                    # Single source of truth for all AI rules
├── scripts/
│   └── setup-ai-rules.sh    # Automation script for syncing rules
├── .cursor/rules/           # Cursor-specific rules (auto-generated)
├── .windsurfrules          # Windsurf rules (auto-generated)
├── .github/instructions/    # VSCode rules (auto-generated)
└── CLAUDE.md               # Claude Code rules (auto-generated)
```

## 📝 Managing Rules

### Adding a New Rule

1. Edit the `.rules` file and add your rule within XML-like tags:

```xml
<your-rule-name>
# Your Rule Title

Your rule content here...
</your-rule-name>
```

2. Run the sync command to propagate to all editors:
```bash
pnpm run ai:sync
```

### Updating Existing Rules

1. Edit the rule content in `.rules`
2. Run `pnpm run ai:sync` to update all editors

### Rule Categories in This Project

- **main-project-rules**: Core project configuration and standards
- **auth-api**: Better Auth UI API documentation references
- **development-workflow**: Team workflow preferences
- **database-schema**: Database structure references

## 🔧 Advanced Usage

### Apply to Specific Editors

```bash
# Apply a single rule to a specific editor
vibe-rules load main-project-rules cursor

# Apply to global configuration
vibe-rules load development-workflow claude-code --global
```

### Share Rules via NPM

1. Create a package with an `llms` export:

```javascript
// my-rules-package/llms/index.js
export default [
  {
    name: "my-rule",
    rule: "Rule content here...",
    description: "What this rule does"
  }
];
```

2. Install in any project:
```bash
vibe-rules install cursor my-rules-package
```

## 🎨 Supported Editors

- **Cursor**: Individual `.mdc` files in `.cursor/rules/`
- **Windsurf**: Appended to `.windsurfrules`
- **Claude Code**: Tagged blocks in `CLAUDE.md`
- **VSCode**: Individual `.instructions.md` files
- **Codex**: Tagged blocks in `AGENTS.md`
- **Amp**: Tagged blocks in `AGENT.md`
- **ZED**: Tagged blocks in `.rules`
- **Cline/Roo**: Individual `.md` files

## 🤝 Team Workflow

1. **Initial Setup**: New team members run `pnpm run ai:setup`
2. **Updates**: When `.rules` is updated, run `pnpm run ai:sync`
3. **Consistency**: The `.rules` file should be committed to version control
4. **Editor Files**: Generated editor-specific files can be gitignored or committed based on team preference

## 🔍 Troubleshooting

- **Rule not applying?** Check if the editor is supported
- **Sync failed?** Ensure vibe-rules is installed globally
- **Custom paths?** Use the `-t` flag: `vibe-rules load rule-name editor -t /custom/path`

## 📚 Resources

- [vibe-rules GitHub](https://github.com/futureexcited/vibe-rules)
- [Unified .rules Convention](https://github.com/futureexcited/vibe-rules/blob/main/UNIFIED_RULES_CONVENTION.md) 