const { test, expect } = require('@playwright/test');

test('registro de formulario MVP MINJUS', async ({ page }) => {
    await page.goto('https://sgd.minjus.gob.pe/sgd-virtual/public/ciudadano/ciudadanoMain.xhtml');

    await expect(page).toHaveTitle(/MPV - Mesa de Partes Virtual/);

    const modal = page.locator('#dlgIntroduccion');
    if (await modal.isVisible()) {
        await page.click('#dlgIntroduccion .ui-dialog-titlebar-close');
        await page.locator('#dlgIntroduccion_modal').waitFor({ state: 'hidden' });
    }

    await page.click('#cboPersonaJuridica .ui-selectonemenu-trigger');
    const opcion = page.locator('li.ui-selectonemenu-item', {
        hasText: 'ENTIDAD PUBLICA'
    });
    await opcion.waitFor({ state: 'visible' });
    await opcion.click();

    await page.click('#j_idt64');
    await expect(page.locator('#dlgBuscarEntidad')).toBeVisible();

    // ⭐ SOLUCIÓN: Llenar el campo de forma más explícita
    const campoRuc = page.locator('#frmBuscarEntidad\\:txtRucFilter');
    
    // Esperar que el campo esté visible y habilitado
    await campoRuc.waitFor({ state: 'visible' });
    await page.waitForTimeout(500);
    
    // Hacer clic en el campo para enfocarlo
    await campoRuc.click();
    
    // Limpiar cualquier contenido previo
    await campoRuc.clear();
    
    // Escribir caracter por caracter (simula escritura humana)
    await campoRuc.pressSequentially('20131371617', { delay: 100 });
    
    // Verificar que se escribió correctamente
    await expect(campoRuc).toHaveValue('20131371617');
    
    console.log('✅ RUC ingresado correctamente');

    // Esperar un poco antes de hacer clic en buscar
    await page.waitForTimeout(500);
    
    const botonBuscar = page.locator('#frmBuscarEntidad\\:j_idt312');
    await botonBuscar.waitFor({ state: 'visible' });
    await botonBuscar.click();
    
    console.log('✅ Botón buscar clickeado');

    // Esperar a que el modal se cierre
    await page.locator('#dlgBuscarEntidad').waitFor({ state: 'hidden', timeout: 20000 });
    
    console.log('✅ Modal cerrado');

    // Locators para los campos principales
    const ruc = page.getByRole('textbox', { name: 'Nro de RUC*' });
    const razonSocial = page.locator('#txtRazonSocial');

    await expect(ruc).toBeVisible();
    await expect(razonSocial).toBeVisible();
    await expect(ruc).not.toBeEditable();
    await expect(ruc).toHaveValue('20131371617', { timeout: 10000 });
    await expect(razonSocial).toHaveValue('MINISTERIO DE JUSTICIA Y DERECHOS HUMANOS', { timeout: 10000 });

    console.log('✅ Test completado exitosamente');
});