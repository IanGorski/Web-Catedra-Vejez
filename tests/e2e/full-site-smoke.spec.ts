import { test, expect } from '@playwright/test';

test.describe('Full site smoke tests', () => {
  test('renderiza secciones principales y elementos clave', async ({ page }) => {
    await page.goto('/');

    await expect(page.locator('#inicio')).toBeVisible();
    await expect(page.locator('#audiencias')).toBeVisible();
    await expect(page.locator('#hub')).toBeVisible();
    await expect(page.locator('#contacto')).toBeVisible();

    await expect(page.locator('.footer')).toBeVisible();
    await expect(page.locator('.whatsapp-fab')).toBeVisible();
    await expect(page.locator('.back-to-top')).toHaveCount(1);
  });

  test('abre y cierra cards del Hub (smoke multipunto)', async ({ page }) => {
    await page.goto('/');

    await page.locator('#hub').scrollIntoViewIfNeeded();

    const cards = page.locator('.hub-card');
    const total = await cards.count();
    expect(total).toBeGreaterThan(5);

    const indexesToCheck = [0, Math.floor(total / 2), total - 1];

    for (const index of indexesToCheck) {
      await cards.nth(index).click();
      await expect(page.locator('.section-modal.section-modal--open')).toBeVisible();
      await page.getByRole('button', { name: /cerrar panel/i }).click();
      await expect(page.locator('.section-modal.section-modal--open')).toHaveCount(0);
    }
  });

  test('toggle de tema y tamaño de fuente funciona', async ({ page }) => {
    await page.goto('/');

    const root = page.locator('html');
    const themeBefore = await root.getAttribute('data-theme');

    await page.locator('#themeToggle').click();

    const themeAfter = await root.getAttribute('data-theme');
    expect(themeAfter).not.toBe(themeBefore);

    const fontBtn = page.locator('.font-size-toggle');
    await expect(fontBtn).toBeVisible();

    const scaleBefore = await page.evaluate(() =>
      document.documentElement.style.getPropertyValue('--font-scale')
    );

    await fontBtn.click();

    const scaleAfter = await page.evaluate(() =>
      document.documentElement.style.getPropertyValue('--font-scale')
    );

    expect(scaleAfter).not.toBe(scaleBefore);
  });

  test('toggle de idioma cambia atributo lang del documento', async ({ page }) => {
    await page.goto('/');

    const root = page.locator('html');
    const langBefore = await root.getAttribute('lang');

    await page.locator('.lang-switcher').click();

    const langAfter = await root.getAttribute('lang');
    expect(langAfter).not.toBe(langBefore);
    expect(['es', 'en']).toContain(langAfter);
  });
});
