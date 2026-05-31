import { test, expect } from '@playwright/test';

test.describe('Navegacion movil y regresiones visuales', () => {
  test('cerrar card del Hub usando atras del navegador movil', async ({ page }) => {
    await page.goto('/');

    const hubSection = page.locator('#hub');
    await hubSection.scrollIntoViewIfNeeded();

    const firstHubCard = page.locator('.hub-card').first();
    await expect(firstHubCard).toBeVisible();
    await firstHubCard.click();

    const modalOpen = page.locator('.section-modal.section-modal--open');
    await expect(modalOpen).toBeVisible();

    await page.goBack();

    await expect(page.locator('.section-modal.section-modal--open')).toHaveCount(0);
    await expect(page.locator('main#main-content')).toBeVisible();
    await expect(page.locator('#hub')).toBeVisible();
    await expect(page.locator('.hub-card').first()).toBeVisible();
  });

  test('boton volver arriba visible con icono al hacer scroll', async ({ page }) => {
    await page.goto('/');
    const topButton = page.locator('.back-to-top');
    await page.mouse.wheel(0, 2000);

    await expect(topButton).toHaveClass(/is-visible/);
    await expect(page.locator('.back-to-top svg')).toBeVisible();
  });
});
