#!/bin/bash

# Specify the path to your CSV file and image folder
csv_file="Photo.csv"
image_folder="../../../Downloads/photos"

# Specify the destination folder where you want to copy the images
destination_folder="../client-side/public/photos/"

# Read the CSV file and copy the corresponding images
while IFS=',' read -r pid _; do
  image_file="${image_folder}/${pid}.jpg"
  if [ -f "$image_file" ]; then
    cp "$image_file" "$destination_folder"
    echo "Copied $image_file to $destination_folder"
  else
    echo "Image file $image_file not found."
  fi
done < "$csv_file"
