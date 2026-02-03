import { expect } from '@playwright/test';

export async function validarDatosContacto(page) {
  await expect(page.locator('text=Datos de Contacto')).toBeVisible();
}

export async function completarDomicilio(page) {

  await expect(page.locator('text=Datos de Contacto')).toBeVisible();
  await page.locator('#txtDomicilio').pressSequentially('Bregante 184', { delay: 100 });

  const panel = page.locator('#cboDepartamento');
  await panel.waitFor({ state: 'visible' });
  await panel.click();

  await page.locator('#cboDepartamento_filter').pressSequentially('LIMA', { delay: 100 });
  const opcionDepa = page.locator('.ui-selectonemenu-item', { hasText: /^LIMA$/ });
  await opcionDepa.waitFor({ state: 'visible' });
  await opcionDepa.click();

  await page.waitForTimeout(500);

  const cbprovincia = page.locator('#cboProvincia');
  await cbprovincia.waitFor({ state: 'visible' });
  await cbprovincia.click();

  await page.locator('#cboProvincia_filter').pressSequentially('LIMA', { delay: 100 });
  const opcionProvi = page.locator('.ui-selectonemenu-items ui-selectonemenu-list', { hasText: /^LIMA$/ });
  await opcionProvi.waitFor({ state: 'visible' });
  await opcionProvi.click();

  await page.waitForTimeout(500);

  const region = page.locator('#cboDistrito');
  await region.waitFor({ state: 'visible' });
  await region.click();

  await page.locator('#cboDistrito_filter').pressSequentially('BARRANCO', { delay: 100 })
  const opcionDistrito = page.locator('#cboDistrito_items', { hasText: /^BARRANCO$/ });
  await opcionDistrito.waitFor({ state: 'visible' });
  await opcionDistrito.click();



  await page.locator('#txtTelefono').pressSequentially('912748851', { delay: 100 });


}