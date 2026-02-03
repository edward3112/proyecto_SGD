import { expect } from '@playwright/test';

export async function validarDatosContacto(page) {
  await expect(page.locator('text=Datos de Contacto')).toBeVisible();
}

export async function completarDomicilio(page) {
    
    await expect(page.locator('text=Datos de Contacto')).toBeVisible();
    await page.fill('#txtDomicilio', 'Bregante 184');

    const panel = page.locator('#cboDepartamento_label');
    await panel.waitFor({ state: 'visible'});
    await panel.click();
    await page.waitForTimeout(500);
    
    await page.locator('#cboDepartamento_filter').click();
    await page.type('#cboDepartamento_filter','LIMA');
    const selectedText = await page.locator('#cboDepartamento_filter').innerText();
    expect(selectedText).toBe('LIMA');



}