@ECHO OFF
ECHO OPENNING UP YOUR PROJECTS
SET DEVELOPMENT_HOME=C:\Users\Jalil\Documents\nsia

start "" cmd /b /c code %DEVELOPMENT_HOME%\eBreshna\eBreshna-core 

start "" cmd /b /c code %DEVELOPMENT_HOME%\eBreshna-web

call %DEVELOPMENT_HOME%\keycloak-9.0.0\bin\standalone.bat
