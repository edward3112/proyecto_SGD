const { test, expect } = require('@playwright/test');
import { validarDatosContacto, validarDatosDocumento, cargaArchivosTramite } from '../pages/datosContacto';

test('registro de formulario MVP MINJUS', async ({ page }) => {

    //Le dice al navegador que vaya a una URL
    await page.goto('http://sgd.minjus.gob.pe/sgd-virtual/public/ciudadano/ciudadanoMain.xhtml');

    //expect(page): Vamos a verificar algo sobre la página
    //.toHaveTitle(...): Verifica que el título de la pestaña sea correcto
    await expect(page).toHaveTitle(/MPV - Mesa de Partes Virtual/);
    //locator(...Encuentra un elemento en la página usando un selector CSS
    const modal = page.locator('#dlgIntroduccion');

    if (await modal.isVisible()) {
        //Selector CSS que encuentra el botón de cerrar
        await page.click('#dlgIntroduccion .ui-dialog-titlebar-close');

        //Espera a que el modal se oculte completamente
        await page.locator('#dlgIntroduccion_modal').waitFor({ state: 'hidden' });
    }

    //Hace clic en la flecha del dropdown para abrirlo
    await page.click('#cboPersonaJuridica .ui-selectonemenu-trigger');
    //Busca elementos <li> con la clase CSS especificada Filtra para encontrar solo el que contiene ese texto
    //Guardamos la opción en una variable
    const opcion = page.locator('li.ui-selectonemenu-item', {
        hasText: 'ENTIDAD PUBLICA'
    });
    //Espera a que la opción aparezca en pantalla
    await opcion.waitFor({ state: 'visible' });
    await opcion.click();

    //en el botón que abre el modal de búsqueda
    await page.getByRole('button', { name: 'Buscar Entidad' }).click();
    //Valida que el modal realmente apareció
    await expect(page.locator('#dlgBuscarEntidad')).toBeVisible();

    const campoRuc = page.locator('#frmBuscarEntidad\\:txtRucFilter');
    await campoRuc.waitFor({ state: 'visible' });
    await page.waitForTimeout(500);
    //Enfoca el campo (como si hicieras clic con el mouse)
    //Algunos frameworks como JSF necesitan que el campo esté enfocado para funcionar correctamente
    await campoRuc.click();
    //limpia el campo
    await campoRuc.clear();
    //Escribe el texto caracter por caracter (simulando a un humano)
    //¿Por qué no usar .fill()? Porque JavaSprimeFaces a veces no detecta el evento cuando llenas todo de golpe
    await campoRuc.pressSequentially('20131371617', { delay: 100 });
    //Valida que el campo realmente tiene el valor que escribimos
    await expect(campoRuc).toHaveValue('20131371617');

    console.log('✅ RUC ingresado correctamente');
    await page.waitForTimeout(500);

    //Ubica el boton espera que sea visible y le da click
    await page.getByRole('button', { name: 'Buscar', exact: true }).click();

    console.log('✅ Botón buscar clickeado');

    //Espera a que el modal desaparezca
    await page.locator('#dlgBuscarEntidad').waitFor({ state: 'hidden', timeout: 20000 });
    console.log('✅ Modal cerrado');

    // Locators para los campos principales
    const ruc = page.getByRole('textbox', { name: 'Nro de RUC*' });
    const razonSocial = page.locator('#txtRazonSocial');

    await expect(ruc).toBeVisible();
    await expect(razonSocial).toBeVisible();

    // ⭐ Validar que ambos campos NO son editables (vienen de la búsqueda)
    await expect(ruc).not.toBeEditable();
    await expect(razonSocial).not.toBeEditable();

    // Validar los valores
    await expect(ruc).toHaveValue('20131371617', { timeout: 10000 });
    await expect(razonSocial).toHaveValue('MINISTERIO DE JUSTICIA Y DERECHOS HUMANOS', { timeout: 10000 });

    console.log('✅ Test completado exitosamente');

    await validarDatosContacto(page);
    console.log('✅ Datos de contacto completo');

    await validarDatosDocumento(page);
    console.log('✅ Datos de Documento completos');

    await cargaArchivosTramite(page);
    console.log('✅ Archivos de tramite completos');
    
    await page.waitForTimeout(20000);

});
