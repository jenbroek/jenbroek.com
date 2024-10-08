#!/bin/bash

export OUTPUT_DIR=static/img

process() {
	p=$1
	f=${p##*/}
	shift
	for w in $(sed -nr '/imgSizes/s/[^0-9]+/ /gp' hugo.toml); do
		mkdir -p $OUTPUT_DIR/$w
		magick.exe -quiet "$p" -resize $w "$OUTPUT_DIR/$w/$f"
		"$@" "$OUTPUT_DIR/$w/$f"
		magick.exe -quiet -quality 90 "$OUTPUT_DIR/$w/$f" "$OUTPUT_DIR/$w/${f%.*}.webp"
	done
}

export -f process

for f in "${@:?no args given}"; do
	case $(file -b --mime-type "$f") in
		image/png)
			sem -j+0 process "$f" optipng -q
			;;
		image/jpeg)
			sem -j+0 process "$f" jpegoptim -qs
			;;
		*)
			echo unrecognized type >&2
			exit 1
			;;
	esac
done
sem --wait
