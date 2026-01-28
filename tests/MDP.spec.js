import { test, expect } from '@playwright/test';

test('registro de formulario MVP MINJUS', async ({ page }) => {
    await page.goto('https://srvcalidadw1.minjus.gob.pe/sgd-virtual/public/ciudadano/ciudadanoMain.xhtml');



    await expect(page).toHaveTitle(/MPV - Mesa de Partes Virtual/);

    const modal = page.locator('#dlgIntroduccion');
    if (await modal.isVisible()) {
        await page.click('#dlgIntroduccion .ui-dialog-titlebar-close');
        await page.locator('#dlgIntroduccion_modal').waitFor({ state: 'hidden' });
    }

    //await page.selectOption('#cboPersonaJuridica_label', { label: 'ENTIDAD PUBLICA' });
    await page.click('#cboPersonaJuridica .ui-selectonemenu-trigger');
    const opcion = page.locator('li.ui-selectonemenu-item', {
        hasText: 'ENTIDAD PUBLICA'
    });

    await opcion.waitFor({ state: 'visible' });
    await opcion.click();

    await page.click('#j_idt64')
    await expect(page.locator('#dlgBuscarEntidad')).toBeVisible();

    await page.fill('#frmBuscarEntidad\\:txtRucFilter', '20131371617');
    await page.click('#frmBuscarEntidad\\:j_idt312'); // botón buscar

    // ⭐ Esperar a que el modal se cierre automáticamente
    await page.locator('#dlgBuscarEntidad').waitFor({ state: 'hidden', timeout: 10000 });

    // Locators para los campos principales
    const ruc = page.getByRole('textbox', { name: 'Nro de RUC*' });
    const razonSocial = page.locator('#txtRazonSocial');

    // Esperar que los campos estén visibles
    await expect(ruc).toBeVisible();
    await expect(razonSocial).toBeVisible();

    // Validar que el RUC NO es editable
    await expect(ruc).not.toBeEditable();

    // ⭐ Esperar y validar que los valores se hayan llenado
    await expect(ruc).toHaveValue('20131371617', { timeout: 10000 });

    // Validar que la razón social SÍ es editable
    await expect(razonSocial).not.toBeEditable();

    await expect(razonSocial).toHaveValue('MINISTERIO DE JUSTICIA Y DERECHOS HUMANOS', { timeout: 10000 });

    console.log('✅ Test completado exitosamente');


});