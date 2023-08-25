
$accountaudit = Get-LocalGroupMember -Group "Administrators" | Where-Object { $_.Name -notlike "*Administrator" -and $_.Name -notlike "*ADNS" -and $_.Name -notlike "*Domain Admins"} | Select-Object Name

if ([string]::IsNullOrEmpty($accountaudit)){
    Write-Host "The administrators group meets standards"
} else {
    Write-Host "Standard not met"
    $accountaudit.Name
}