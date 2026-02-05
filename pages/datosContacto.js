import { expect } from '@playwright/test';

export async function validarDatosContacto(page) {

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
  const opcionProvi = page.locator('#cboProvincia_panel .ui-selectonemenu-item', { hasText: /^LIMA$/ });
  await opcionProvi.waitFor({ state: 'visible' });
  await opcionProvi.click();

  await page.waitForTimeout(500);

  const region = page.locator('#cboDistrito');
  await region.waitFor({ state: 'visible' });
  await region.click();

  await page.locator('#cboDistrito_filter').pressSequentially('BARRANCO', { delay: 100 })
  const opcionDistrito = page.locator('#cboDistrito_panel .ui-selectonemenu-item ', { hasText: /^BARRANCO$/ });
  await opcionDistrito.waitFor({ state: 'visible' });
  await opcionDistrito.click();

  await page.locator('#txtTelefono').pressSequentially('912748851', { delay: 100 });
  await page.locator('#txtCelular').pressSequentially('912748851', { delay: 100 });
  await page.locator('#txtEmail').pressSequentially('edwardzh.31@gmail.com', { delay: 100 });

}

export async function validarDatosDocumento(page) {
  await expect(page.locator('text=Datos del Documento')).toBeVisible();

  const servicio = page.locator('#cboServicio');
  await servicio.waitFor({ state: 'visible' });
  await servicio.click();

  //await page.locator('#cboServicio_filter').pressSequentially('PRONABI', { delay: 100 });
  //const opcionDepa = page.locator('#cboServicio_panel .ui-selectonemenu-item', { hasText: /^PRONABI$/ });
  //await opcionDepa.waitFor({ state: 'visible' });
  //await opcionDepa.click();

  await page.locator('#cboServicio_filter').pressSequentially('PRONABI', { delay: 100 });
  await page.waitForTimeout(500); // Esperar que filtre los resultados
  await page.locator('#cboServicio_filter').press('Enter');





  await page.waitForTimeout(500);



}