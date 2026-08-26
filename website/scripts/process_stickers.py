import os
from PIL import Image
import numpy as np

src_dir = r"C:\Users\Nishant Gaurav\.gemini\antigravity-ide\brain\5148f88e-2bc6-48cc-9e99-f6b428d87fab\.user_uploaded"
dest_dir = r"c:\Users\Nishant Gaurav\Downloads\gitbackup-main\gitbackup-main\website\public\stickers"
os.makedirs(dest_dir, exist_ok=True)

# 1. Process Book Image (media_1787700943734.jpg)
img1 = Image.open(os.path.join(src_dir, "media_1787700943734.jpg")).convert("RGBA")
arr1 = np.array(img1)
# The background is solid black (0,0,0) or nearly black (< 25)
# Make all black/near-black pixels transparent
mask_black = (arr1[:, :, 0] < 30) & (arr1[:, :, 1] < 30) & (arr1[:, :, 2] < 30)
arr1[mask_black, 3] = 0

# Also do a slight smooth feather on the edges where black touches
book_png = Image.fromarray(arr1)
book_dest = os.path.join(dest_dir, "human-book.png")
book_png.save(book_dest, "PNG")
print("Saved book png:", book_dest, book_png.size)

# 2. Process Plane Image (media_1787701081546.png)
img2 = Image.open(os.path.join(src_dir, "media_1787701081546.png")).convert("RGBA")
arr2 = np.array(img2)
# If it has white background (> 245), make it transparent
mask_white = (arr2[:, :, 0] > 248) & (arr2[:, :, 1] > 248) & (arr2[:, :, 2] > 248)
arr2[mask_white, 3] = 0

plane_png = Image.fromarray(arr2)
plane_dest = os.path.join(dest_dir, "human-plane.png")
plane_png.save(plane_dest, "PNG")
print("Saved plane png:", plane_dest, plane_png.size)
