#!/bin/zsh
# ══════════════════════════════════════════════════════════════
# Asset Optimization Script for JavaGNP
# ══════════════════════════════════════════════════════════════

FFMPEG=$(node -e "console.log(require('ffmpeg-static'))")
SCRIPT_DIR="${0:a:h}"
PUBLIC_DIR="${SCRIPT_DIR}/../public"
PUBLIC_DIR="${PUBLIC_DIR:A}"
BACKUP_DIR="$PUBLIC_DIR/_originals_backup"

echo "══════════════════════════════════════════"
echo "  JavaGNP Asset Optimization"
echo "══════════════════════════════════════════"

mkdir -p "$BACKUP_DIR"

# ──────────────────────────────────────────
# 1. VIDEO OPTIMIZATION
# ──────────────────────────────────────────
echo ""
echo "─── VIDEO OPTIMIZATION ───"

for video in "$PUBLIC_DIR"/*.mp4; do
  [[ -f "$video" ]] || continue
  filename="${video:t}"
  backup="$BACKUP_DIR/$filename"
  
  if [[ -f "$backup" ]]; then
    echo "  ○ $filename: Already processed, skipping"
    continue
  fi
  
  orig_size=$(stat -f%z "$video")
  echo ""
  echo "  Processing: $filename ($(( orig_size / 1048576 ))MB)"
  
  cp "$video" "$backup"
  
  dimensions=$($FFMPEG -i "$video" 2>&1 | grep -o '[0-9]\{3,5\}x[0-9]\{3,5\}' | head -1)
  width="${dimensions%%x*}"
  
  output="${video%.mp4}_optimized.mp4"
  
  if [[ -n "$width" ]] && (( width > 1920 )); then
    echo "    ↳ 4K (${dimensions}) → Downscaling to 1080p + CRF 20"
    $FFMPEG -y -i "$video" \
      -vf "scale=1920:-2" \
      -c:v libx264 -preset slow -crf 20 \
      -profile:v high -level 4.1 \
      -pix_fmt yuv420p -an \
      -movflags +faststart \
      "$output" 2>/dev/null
  else
    echo "    ↳ ${dimensions} → Re-encoding CRF 23, stripping audio"
    $FFMPEG -y -i "$video" \
      -c:v libx264 -preset slow -crf 23 \
      -profile:v high -level 4.1 \
      -pix_fmt yuv420p -an \
      -movflags +faststart \
      "$output" 2>/dev/null
  fi
  
  new_size=$(stat -f%z "$output")
  echo "    ✓ $(( orig_size / 1048576 ))MB → $(( new_size / 1048576 ))MB"
  mv "$output" "$video"
done

# ──────────────────────────────────────────
# 2. IMAGE OPTIMIZATION
# ──────────────────────────────────────────
echo ""
echo "─── IMAGE OPTIMIZATION ───"

count=0

for img in "$PUBLIC_DIR"/**/*.png "$PUBLIC_DIR"/*.png; do
  [[ -f "$img" ]] || continue
  [[ "$img" == *"_originals_backup"* ]] && continue
  
  filename="${img:t}"
  relpath="${img#$PUBLIC_DIR/}"
  dirpart="${relpath:h}"
  
  orig_size=$(stat -f%z "$img")
  
  # Skip tiny files
  (( orig_size < 102400 )) && continue
  
  # Build backup path
  if [[ "$dirpart" == "." || "$dirpart" == "$relpath" ]]; then
    backup_path="$BACKUP_DIR/$filename"
  else
    mkdir -p "$BACKUP_DIR/$dirpart"
    backup_path="$BACKUP_DIR/$dirpart/$filename"
  fi
  
  # Skip if already done
  [[ -f "$backup_path" ]] && continue
  
  cp "$img" "$backup_path"
  
  output="${img%.png}_opt.png"
  
  $FFMPEG -y -i "$img" \
    -compression_level 100 \
    -pred mixed \
    "$output" 2>/dev/null
  
  new_size=$(stat -f%z "$output")
  
  if (( new_size < orig_size )); then
    savings=$(( (orig_size - new_size) * 100 / orig_size ))
    echo "  ✓ $relpath: $(( orig_size / 1024 ))KB → $(( new_size / 1024 ))KB (${savings}% smaller)"
    mv "$output" "$img"
    count=$(( count + 1 ))
  else
    echo "  ○ $relpath: Already optimal"
    rm -f "$output"
  fi
done

echo ""
echo "══════════════════════════════════════════"
echo "  OPTIMIZATION COMPLETE"
echo "  $count images optimized"
echo "  Originals backed up to: public/_originals_backup/"
echo "══════════════════════════════════════════"
