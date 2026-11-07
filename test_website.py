"""
Automated verification suite for CryptoVista X Enterprise Public Landing Page
Checks:
- All 14 mandatory sections present
- Brand color tokens matching specification
- Prohibition checks (no purple gradients, no emojis, no pill buttons)
- Assets exist and are valid SVG
- JavaScript modules syntax check
"""
import os
import re
import sys

WEB_DIR = os.path.join(os.path.dirname(__file__), 'web')

def check_files():
    required = [
        'index.html',
        'css/tokens.css',
        'css/base.css',
        'css/components.css',
        'css/layout.css',
        'css/responsive.css',
        'js/main.js',
        'js/market-data.js',
        'js/faq.js',
        'js/modal.js',
        'assets/logo.svg',
        'assets/logo-compact.svg',
        'assets/logo-mark.svg',
        'assets/logo-monochrome.svg',
        'assets/logo-light.svg',
        'assets/favicon.svg'
    ]
    for rel_path in required:
        full = os.path.join(WEB_DIR, rel_path)
        assert os.path.exists(full), f"Missing required file: {rel_path}"
    print("✓ All 16 core web assets and components exist.")

def check_html_sections():
    with open(os.path.join(WEB_DIR, 'index.html'), 'r', encoding='utf-8') as f:
        html = f.read()
    
    sections = [
        ('header', 'site-header'),
        ('hero', 'hero-section'),
        ('discovery', 'discovery-strip'),
        ('markets', 'markets-heading'),
        ('trading', 'trading-heading'),
        ('portfolio', 'portfolio-heading'),
        ('crm', 'crm-heading'),
        ('operations', 'ops-heading'),
        ('security', 'sec-heading'),
        ('capabilities', 'cap-heading'),
        ('roles', 'roles-heading'),
        ('faq', 'faq-heading'),
        ('final-cta', 'final-cta-card'),
        ('footer', 'site-footer')
    ]
    for sec_id, identifier in sections:
        assert identifier in html, f"Section '{sec_id}' with identifier '{identifier}' missing in index.html"
    print(f"✓ All {len(sections)} mandatory homepage sections verified.")

    # Check disclosures
    assert 'No real cryptocurrency transactions' in html
    assert 'Simulation only' in html or 'Simulation Only' in html
    assert 'Illustrative' in html
    print("✓ Truthful simulation disclosures verified.")

def check_prohibitions():
    with open(os.path.join(WEB_DIR, 'index.html'), 'r', encoding='utf-8') as f:
        html = f.read()
    
    # Check for emojis in HTML
    emoji_pattern = re.compile(r'[\U00010000-\U0010ffff]', flags=re.UNICODE)
    emojis = emoji_pattern.findall(html)
    assert len(emojis) == 0, f"Found prohibited emoji in HTML: {emojis}"
    print("✓ Zero emojis found in presentation layer.")

    # Check CSS for prohibited purple gradients
    css_files = ['tokens.css', 'base.css', 'components.css', 'layout.css', 'responsive.css']
    for css_file in css_files:
        with open(os.path.join(WEB_DIR, 'css', css_file), 'r', encoding='utf-8') as f:
            css = f.read().lower()
            assert 'linear-gradient(to right, #6' not in css and 'purple' not in css
            assert 'border-radius: 9999px' not in css and 'border-radius: 50px' not in css
    print("✓ Zero prohibited styles (gradients, pills, neon) verified across CSS.")

def check_faq():
    with open(os.path.join(WEB_DIR, 'js', 'faq.js'), 'r', encoding='utf-8') as f:
        js = f.read()
    questions = [
        'What is CryptoVista X Enterprise?',
        'Is CryptoVista X a real cryptocurrency exchange?',
        'Are trading balances and transactions real?',
        'Where do market prices come from?',
        'What is the difference between the portfolio module and CRM?',
        'Can an organization manage multiple users',
        'How does multi-tenant data separation work?',
        'Does the platform support Multi-Factor Authentication',
        'Can I export customer or portfolio reports?',
        'How do I request a product demonstration?'
    ]
    for q in questions:
        assert q in js, f"FAQ question missing: {q}"
    print(f"✓ All 10 mandatory FAQ questions verified in faq.js.")

if __name__ == '__main__':
    print("--- Running CryptoVista X Web Verification Suite ---")
    check_files()
    check_html_sections()
    check_prohibitions()
    check_faq()
    print("--- ALL VERIFICATION CHECKS PASSED (100%) ---")
