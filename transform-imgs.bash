#!/bin/bash

dest=static/img

process() {
	p=$1
	f=${p##*/}
	shift
	for w in $(sed -nr '/imgSizes/s/[^0-9]+/ /gp' hugo.toml); do
		mkdir -p $dest/$w
		magick.exe -quiet "$p" -resize $w "$dest/$w/$f"
		"$@" "$dest/$w/$f"
		magick.exe -quiet -quality 90 "$dest/$w/$f" "$dest/$w/${f%.*}.webp"
	done
}

for f in "${@:?no args given}"; do
	case $(file -b --mime-type "$f") in
		image/png)
			process "$f" optipng -q &
			;;
		image/heic)
			magick.exe mogrify -format jpeg "$f"
			f=${f%.*}.jpeg
			;&
		image/jpeg)
			process "$f" jpegoptim -qs &
			;;
		*)
			echo unrecognized type >&2
			exit 1
			;;
	esac
done

wait
