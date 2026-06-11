import os
import glob

html_files = glob.glob('**/*.html', recursive=True)

preconnect_tags = """  <!-- Google Fonts Preconnect & Cairo Font -->
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;600;700&display=swap" rel="stylesheet" />
"""

for filepath in html_files:
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    if 'fonts.googleapis.com' not in content:
        # Find </head> and insert before it
        if '</head>' in content:
            new_content = content.replace('</head>', preconnect_tags + '</head>')
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print(f"Updated {filepath}")
