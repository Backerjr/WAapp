#!/bin/bash
# GitHub Actions Workflow Health Monitoring Script
# Checks workflow status and provides diagnostics

set -e

REPO_OWNER="${GITHUB_REPOSITORY_OWNER:-Backerjr}"
REPO_NAME="${GITHUB_REPOSITORY##*/}"
REPO_NAME="${REPO_NAME:-WAapp}"

echo "🔍 GitHub Actions Workflow Health Check"
echo "========================================"
echo "Repository: $REPO_OWNER/$REPO_NAME"
echo ""

# Check if gh CLI is available
if ! command -v gh &> /dev/null; then
    echo "⚠️  GitHub CLI (gh) not found. Install it to use this script."
    echo "   Visit: https://cli.github.com/"
    exit 1
fi

# Check authentication
if ! gh auth status &> /dev/null; then
    echo "⚠️  Not authenticated with GitHub CLI"
    echo "   Run: gh auth login"
    exit 1
fi

echo "✅ GitHub CLI authenticated"
echo ""

# Get recent workflow runs
echo "📊 Recent Workflow Run Status:"
echo "------------------------------"
gh run list --limit 10 --json displayTitle,status,conclusion,workflowName,createdAt \
    --jq '.[] | "\(.workflowName) - \(.conclusion // .status) (\(.createdAt | split("T")[0]))"'

echo ""
echo "🔴 Failed Runs (Last 20):"
echo "-------------------------"
FAILED_RUNS=$(gh run list --limit 20 --json conclusion,workflowName,number,createdAt \
    --jq '.[] | select(.conclusion == "failure") | "\(.number): \(.workflowName) - \(.createdAt | split("T")[0])"')

if [ -z "$FAILED_RUNS" ]; then
    echo "✅ No failed runs in the last 20 workflow executions"
else
    echo "$FAILED_RUNS"
fi

echo ""
echo "📋 Workflow Summary:"
echo "--------------------"
gh workflow list --json name,state,path \
    --jq '.[] | "[\(.state)] \(.name)\n   Path: \(.path)"'

echo ""
echo "💡 Quick Commands:"
echo "------------------"
echo "  View specific workflow:    gh run view <run-id>"
echo "  Watch workflow in browser: gh run view <run-id> --web"
echo "  Re-run failed workflow:    gh run rerun <run-id>"
echo "  List all workflows:        gh workflow list"
echo ""
