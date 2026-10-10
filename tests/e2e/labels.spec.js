import { expect, test } from '@playwright/test';

const legend = (page) => page.locator('#legendItems .legend-row');

test('shows the legend in Portuguese on a Portuguese link', async ({ page }) => {
  await page.goto('/?date=2020-01-01&lang=pt&guide=0');
  await expect(page.locator('#statStations')).toHaveText('2.610', { timeout: 30_000 });
  await expect(legend(page)).toHaveText(['Normal', 'Alerta', 'Inundação', 'Inundação extrema', 'Sem dados']);
  await expect(page.locator('#legendItems .legend-note')).toContainText('Pontos maiores');
});

test('uses the English class names and switches the legend with the language', async ({ page }) => {
  await page.goto('/?date=2020-01-01&lang=en&guide=0');
  await expect(page.locator('#statStations')).toHaveText('2,610', { timeout: 30_000 });
  await expect(legend(page)).toHaveText(['Normal', 'Warning', 'Flood', 'Extreme flood', 'No data']);
  await expect(page.locator('#statusFilter option[value="flooded"]')).toHaveText('Flood');
  await page.locator('.lang-button[data-lang="pt"]').click();
  await expect(legend(page)).toHaveText(['Normal', 'Alerta', 'Inundação', 'Inundação extrema', 'Sem dados']);
  await expect(page.locator('#statusFilter option[value="extreme_flooding"]')).toHaveText('Inundação extrema');
});
