from googletrans import Translator
import re

# File paths
input_file = 'objectius.md'  # Original .md file
output_file = 'objectiusen.md'  # Translated .md file


# Translator setup
translator = Translator()

# Regex patterns to detect code blocks
code_block_pattern = re.compile(r"```.*?\n.*?```", re.DOTALL)  # Matches multi-line code blocks
inline_code_pattern = re.compile(r"`.*?`")  # Matches inline code

def translate_markdown(content, src_lang='ca', dest_lang='en'):
    """
    Translates a Markdown string while preserving code blocks.
    """
    def translate_non_code(text):
        return translator.translate(text, src=src_lang, dest=dest_lang).text

    # Find all code blocks and inline code
    code_blocks = code_block_pattern.findall(content)
    inline_codes = inline_code_pattern.findall(content)

    # Temporarily replace code blocks and inline codes with placeholders
    for i, block in enumerate(code_blocks):
        content = content.replace(block, f"{{CODE_BLOCK_{i}}}")
    for i, code in enumerate(inline_codes):
        content = content.replace(code, f"{{INLINE_CODE_{i}}}")

    # Translate the remaining text
    translated_content = translate_non_code(content)

    # Replace placeholders with original code
    for i, block in enumerate(code_blocks):
        translated_content = translated_content.replace(f"{{CODE_BLOCK_{i}}}", block)
    for i, code in enumerate(inline_codes):
        translated_content = translated_content.replace(f"{{INLINE_CODE_{i}}}", code)

    return translated_content

def main():
    with open(input_file, 'r', encoding='utf-8') as infile:
        content = infile.read()
        translated_content = translate_markdown(content)

    with open(output_file, 'w', encoding='utf-8') as outfile:
        outfile.write(translated_content)

    print("Translation complete! Translated content saved to:", output_file)

if __name__ == "__main__":
    main()
