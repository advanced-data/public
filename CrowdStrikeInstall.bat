REG ADD "HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows\CurrentVersion\Group Policy\State\Machine" /v Site-Name /t REG_SZ /d NC035 /f

%~dp0WindowsSensor.exe /install /quiet /norestart CID=0330919A41314BDA80011D5313F8D4A2-99
