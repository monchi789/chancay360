#!/bin/sh

# Animate the dance
dance() {
  frames=(
    "💃   (o_o)  💃\n    \_/\     /\_/"
    "💃  (o_o)   💃\n     /\_/     \_/\"
    "💃 (o_o)    💃\n    \_/\     /\_/"
    "💃  (o_o)   💃\n     /\_/     \_/\"
    "💃   (o_o)  💃\n    \_/\     /\_/"
  )
  for frame in "${frames[@]}"; do
    echo -e "$frame"
    sleep 0.2
    clear
  done
}

# Wait for the backend to be available
while ! nc -z -v -w30 db 3000; do
  dance
done
