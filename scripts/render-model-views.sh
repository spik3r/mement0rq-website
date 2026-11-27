#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."
mode=${1:-}
case "$mode" in --write|--check) ;; *) echo 'usage: render-model-views.sh --write|--check /absolute/path/to/diagramgen' >&2; exit 2 ;; esac
diagramgen=${2:?Supply the absolute path to the Foundry diagramgen binary}
[[ "$diagramgen" = /* && -x "$diagramgen" ]] || { echo 'Expected an absolute path to an executable diagramgen' >&2; exit 2; }
node scripts/project-site-model.mjs "$mode"

shopt -s nullglob
models=(docs/model/architecture.json docs/model/sequence-*.json)
if [[ "$mode" = --check ]]; then
  for model in "${models[@]}"; do
    name=$(basename "$model" .json)
    "$diagramgen" check "$model" "docs/model/rendered/$name"
  done
else
  output=$(mktemp -d)
  trap 'rm -rf -- "$output"' EXIT
  for model in "${models[@]}"; do
    name=$(basename "$model" .json)
    "$diagramgen" generate "$model" "$output/$name"
  done
  for model in "${models[@]}"; do
    name=$(basename "$model" .json)
    mkdir -p "docs/model/rendered/$name"
    cp "$output/$name/"* "docs/model/rendered/$name/"
  done
fi
