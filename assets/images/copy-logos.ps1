# Copy NOVOS FOGOS logo assets from Cursor storage to site images folder.
# Run from project root or assets/images: .\copy-logos.ps1

$srcBase = "$env:USERPROFILE\.cursor\projects\c-Users-migue-OneDrive-Ambiente-de-Trabalho-Pessoal-Cursor-casas-da-porteira-site\assets"
$prefix = "c__Users_migue_AppData_Roaming_Cursor_User_workspaceStorage_cb16b588de62f9bd8299027479a71185_images_"
$dest = $PSScriptRoot

$map = @{
  "${prefix}logo-azul-pequeno-277d1068-7c65-4882-8749-974f6cf329ec.png" = "logo-novos-fogos-azul.png"
  "${prefix}logo-azul-df504a2f-b8bf-4ffb-87e8-f126951d766c.png" = "logo-novos-fogos-azul-full.png"
  "${prefix}logo-azul-medio-41fdedcb-c237-4272-b9f7-c597e65f699e.png" = "logo-novos-fogos-azul-medio.png"
  "${prefix}logo-branco-44a025da-93c0-4cb3-a3da-c948bb79ab72.png" = "logo-novos-fogos-branco.png"
  "${prefix}logo-branco-pequeno-aecc7700-a304-4795-aa4e-eda9d406e4b2.png" = "logo-novos-fogos-branco-pequeno.png"
  "${prefix}logo-branco-medio-62c546d5-892d-43c9-b945-cd63fac7f54f.png" = "logo-novos-fogos-branco-medio.png"
  "${prefix}logo-azul-s-nome-648aeda3-fa48-4ba1-967c-06eb6e17321f.png" = "logo-novos-fogos-icon-azul.png"
  "${prefix}logo-branco-s-nome-3242cfb9-a65a-4f06-ba50-7e1928b3d496.png" = "logo-novos-fogos-icon-branco.png"
  "${prefix}logotipos-06-0b34e17f-89cd-4f8a-92a9-87a63a723b56.png" = "logo-novos-fogos-azul-claro.png"
  "${prefix}logotipos-05-e9126d6b-cb63-45f9-b2c8-9e5106cab9ff.png" = "logo-novos-fogos-branco-variant.png"
}

foreach ($entry in $map.GetEnumerator()) {
  $src = Join-Path $srcBase $entry.Key
  $dst = Join-Path $dest $entry.Value
  if (Test-Path $src) {
    Copy-Item $src -Destination $dst -Force
    Write-Host "Copied: $($entry.Value)"
  } else {
    Write-Host "Skip (not found): $($entry.Key)"
  }
}
Write-Host "Done. Header uses logo-novos-fogos-azul.png, footer uses logo-novos-fogos-branco.png, favicon uses logo-novos-fogos-icon-azul.png"
