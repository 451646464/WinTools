"""Capture genuine screenshots of each WinTools page using Selenium + Edge (headless)."""
import os, sys, time
from selenium import webdriver
from selenium.webdriver.edge.options import Options
from selenium.webdriver.edge.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DOCS = os.path.join(ROOT, 'docs')
os.makedirs(DOCS, exist_ok=True)
BASE = 'http://localhost:8767/'

def make_driver():
    opts = Options()
    opts.add_argument('--headless=new')
    opts.add_argument('--window-size=1440,1000')
    opts.add_argument('--force-device-scale-factor=1')
    opts.add_argument('--hide-scrollbars')
    opts.add_argument('--disable-gpu')
    opts.add_argument('--no-sandbox')
    # avoid Google Fonts network stalls; page must still render
    driver = webdriver.Edge(options=opts)  # Selenium Manager resolves msedgedriver
    driver.set_page_load_timeout(45)
    return driver

def wait_render(driver, selector, timeout=20):
    WebDriverWait(driver, timeout).until(
        EC.presence_of_element_located((By.CSS_SELECTOR, selector)))

def shot(driver, name, full=True):
    path = os.path.join(DOCS, name)
    driver.save_screenshot(path)
    print('  captured', name, f'({os.path.getsize(path)//1024} KB)')

def main():
    driver = make_driver()
    try:
        # Home (full page)
        driver.get(BASE + 'index.html')
        wait_render(driver, '.hero')
        driver.execute_script('document.fonts && document.fonts.ready')
        time.sleep(1.2)
        shot(driver, 'home.png', full=True)

        # OS pages: taller viewport, expand the first card to show detail
        os_pages = {
            'linux.html': ('linuxList', 'linux.png'),
            'windows.html': ('winList', 'windows.png'),
            'macos.html': ('macList', 'macos.png'),
            'cisco.html': ('ciscoList', 'cisco.png'),
            'servers.html': ('srvList', 'servers.png'),
        }
        for page, (listid, out) in os_pages.items():
            driver.set_window_size(1440, 1500)
            driver.get(BASE + page)
            wait_render(driver, '#' + listid + ' .cmd-card')
            time.sleep(0.8)
            # expand the first two cards so options + examples are visible
            heads = driver.find_elements(By.CSS_SELECTOR, '#' + listid + ' .cmd-head')
            for h in heads[:2]:
                driver.execute_script('arguments[0].click();', h)
            time.sleep(0.6)
            # scroll so the list top is in view (skip the tall hero)
            driver.execute_script('document.querySelector(".cmd-toolbar").scrollIntoView({block:"start"});')
            time.sleep(0.5)
            shot(driver, out, full=False)

        # About (full page)
        driver.set_window_size(1440, 1000)
        driver.get(BASE + 'about.html')
        wait_render(driver, '.hero')
        time.sleep(1.0)
        shot(driver, 'about.png', full=True)

        print('DONE')
    finally:
        driver.quit()

if __name__ == '__main__':
    try:
        main()
    except Exception as e:
        print('SCREENSHOT ERROR:', repr(e))
        sys.exit(2)
