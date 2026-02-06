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

  await page.locator('#cboServicio_filter').pressSequentially('PRONABI', { delay: 100 });
  await page.waitForTimeout(500); // Esperar que filtre los resultados
  await page.locator('#cboServicio_filter').press('Enter');
  await page.waitForTimeout(500);

  const tipoDoc = page.locator('#cboTipoDocumento');
  await tipoDoc.waitFor({ state: 'visible' });
  await tipoDoc.click();
  
  await page.locator('#cboTipoDocumento_filter').pressSequentially('CARTA', { delay:100 });
  await page.waitForTimeout(200); 
  await page.locator('#cboTipoDocumento_filter').press('Enter');
  await page.waitForTimeout(200); 
  
  await page.locator('#txtNumeroDocumento').pressSequentially('0001', { delay: 100 });

  await page.locator('#txtNumeroDocumentoSigla').pressSequentially('MINJUS-ODSI', { delay: 100 });

  await page.locator('#txtAsunto').pressSequentially('PRUEBA EZEVALLOS', { delay:100});

  await page.locator('#txtDestinatario').click();
  await page.locator('#txtDestinatario').pressSequentially('ODSI', { delay:100});
  await page.waitForTimeout(200); 

  await page.locator('#txtFolio').pressSequentially('10', { delay:100});
  await page.locator('td:nth-child(3) > .ui-radiobutton').click();

}

export async function cargaArchivosTramite(page){
  await expect(page.locator('text=Archivos del Tramite')).toBeVisible();
  await page.waitForTimeout(200); 

  await page.locator('#chkFlagNotificacion').click();
  await page.waitForTimeout(200); 

  await page.locator('#chkFlagDatosPersonales').click();

  await page.waitForTimeout(200); 


}