# Script para consolidar código de todos os arquivos em um único arquivo
# Ignora a pasta node_modules

# Define o caminho de saída
$outputFile = "codigo_consolidado.txt"

# Remove o arquivo de saída se já existir
if (Test-Path $outputFile) {
    Remove-Item $outputFile
}

# Cria o arquivo de saída
New-Item -Path $outputFile -ItemType File | Out-Null

# Função para verificar se o caminho contém node_modules
function Should-Ignore {
    param($path)
    return $path -like "*\node_modules\*" -or $path -like "*/node_modules/*"
}

# Obtém todos os arquivos recursivamente, excluindo node_modules
$files = Get-ChildItem -Path . -File -Recurse | Where-Object {
    -not (Should-Ignore $_.FullName)
}

# Contador de arquivos processados
$count = 0

# Processa cada arquivo
foreach ($file in $files) {
    $count++
    
    # Adiciona separador e informações do arquivo
    $separator = "`n" + "="*80 + "`n"
    $fileInfo = "ARQUIVO: $($file.FullName)`n"
    $fileInfo += "CAMINHO RELATIVO: $($file.FullName.Replace($PWD.Path, '.'))`n"
    $fileInfo += "="*80 + "`n`n"
    
    Add-Content -Path $outputFile -Value $separator
    Add-Content -Path $outputFile -Value $fileInfo
    
    try {
        # Lê e adiciona o conteúdo do arquivo
        $content = Get-Content -Path $file.FullName -Raw -ErrorAction Stop
        Add-Content -Path $outputFile -Value $content
    }
    catch {
        # Se houver erro ao ler o arquivo (binário, etc)
        Add-Content -Path $outputFile -Value "[ERRO: Não foi possível ler este arquivo - pode ser binário]"
    }
    
    Add-Content -Path $outputFile -Value "`n"
}

# Mensagem final
Write-Host "Consolidação concluída!" -ForegroundColor Green
Write-Host "Total de arquivos processados: $count" -ForegroundColor Cyan
Write-Host "Arquivo de saída: $outputFile" -ForegroundColor Yellow