"""Frontend regression checks for romantic landing page preview.

Run inside an async Playwright context with `page` available.
"""


async def run_frontend_regression(page):
    try:
        page.on("console", lambda msg: print(f"CONSOLE: {msg.type}: {msg.text}"))
        page.on("pageerror", lambda err: print(f"PAGEERROR: {err}"))

        await page.set_viewport_size({"width": 1920, "height": 1080})
        await page.goto(
            "https://fd31d7ec-cc9f-4eff-a5ad-847f112c28b1.preview.emergentagent.com",
            wait_until="domcontentloaded",
        )

        await page.wait_for_selector('[data-testid="gift-screen"]', timeout=10000)
        await page.click('[data-testid="open-letter-button"]', force=True)
        await page.wait_for_timeout(1600)

        reasons_count = await page.locator('[data-testid^="reason-card-"]').count()
        memories_count = await page.locator('[data-testid^="memory-card-"]').count()
        playlist_count = await page.locator('[data-testid^="playlist-track-"]').count()
        print(
            f"Regression snapshot: reasons={reasons_count}, memories={memories_count}, playlist={playlist_count}"
        )

        # Get error messages using specific selectors
        error_text = await page.evaluate("""() => {
        const errorElements = Array.from(document.querySelectorAll('.error, [class*="error"], [id*="error"]'));
        return errorElements.map(el => el.textContent).join(", ");
        }""")
        if error_text:
            print(f"Found error message: {error_text}")
        else:
            print("No error messages found on the page")
    except Exception as exc:
        print(f"Frontend regression failed: {exc}")
