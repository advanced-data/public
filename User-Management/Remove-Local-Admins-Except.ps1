Get-LocalGroupMember administrators | 
where { $_.name -NotLike '*\Administrator*' -and $_.name -notlike '*Domain Admins*' } |
Remove-LocalGroupMember administrators -Verbose