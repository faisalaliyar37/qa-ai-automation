import time
import sys
import subprocess
try:
    from selenium import webdriver
except (ImportError, ModuleNotFoundError):
    subprocess.check_call([sys.executable, "-m", "pip", "install", "selenium"])
    import site
    import importlib
    importlib.reload(site)
    subprocess.check_call([sys.executable, "-m", "pip", "install", "--user", "selenium"])
    try:
        from selenium import webdriver
    except ImportError:
        import site
        import importlib
        importlib.reload(site)
        from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

from selenium.webdriver.chrome.service import Service

def run_zenda_test():
    # Initialize Chrome Driver
    options = webdriver.ChromeOptions()
    # options.add_argument("--headless") # Commented out for visibility
    options.add_argument("--window-size=1280,800")
    
    # Use locally cached ChromeDriver to avoid network download issues
    service = Service(executable_path=r'C:\Users\faisa\AppData\Local\Temp\chromedriver\win64-144.0.7559.110\chromedriver-win64\chromedriver.exe')
    driver = webdriver.Chrome(service=service, options=options)
    
    try:
        # Step 1: Land on Zenda Login Page
        print("Step 1: Land on Zenda Login Page")
        driver.get("https://sps1.zenda.com")
        assert "Sharjah Public School" in driver.title
        time.sleep(3) # 3s delay
        print("Step 1 Complete: Landed on page")

        # Step 2: Switch to Staff Tab
        print("Step 2: Switch to Staff Tab")
        staff_tab = WebDriverWait(driver, 10).until(
            EC.element_to_be_clickable((By.ID, "staffTabLink"))
        )
        staff_tab.click()
        
        # Verify switch
        WebDriverWait(driver, 10).until(
            EC.visibility_of_element_located((By.ID, "staffTab"))
        )
        time.sleep(3) # 3s delay
        print("Step 2 Complete: Switched to Staff Tab")

        # Step 3: Click on Username Field
        print("Step 3: Click on Username Field")
        username_input = WebDriverWait(driver, 10).until(
            EC.visibility_of_element_located((By.ID, "txtuser"))
        )
        username_input.click()
        
        # Verify focus (optional, usually just clicking is enough for this demo)
        # In Python Selenium, verifying focus is a bit more manual with execute_script, skipping for brevity matching JS
        
        time.sleep(3) # 3s delay
        print("Step 3 Complete: Clicked Username field")
        
        print("\nTest Passed Successfully! [OK]")

    except Exception as e:
        print(f"\nTest Failed: {e} [FAIL]")
        
    finally:
        driver.quit()

if __name__ == "__main__":
    run_zenda_test()
