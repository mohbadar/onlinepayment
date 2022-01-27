## Online Payment System BackOffice

#### How to setup the project
- Download Keycloak from (https://www.keycloak.org/downloads.html)
- Setup Anar Framework
```xml
git clone https://github.com/Anar-Framework/anar-parent.git
cd anar-parent/script/setup/
bash setup.sh
cd ../..
```
- Clone nid_service_kit repository

```xml
git clone https://github.com/nsia-infosys/nid_service_kit_backoffice.git
```
- Open the nid_service_kit_backoffice with `intellij` IDE
- Add imported libraries in `pom.xml` from `File>New>Module from Existing Sources...`

- Setup nid_service_kit_web
```xml
git clone https://github.com/nsia-infosys/nid_service_kit_web
cd nid_service_kit_web
npm install 
npm start
```

#### How to build the source code
- Run the Keycloak `cd keycloak_path/bin` and `bash standalone.sh`
- Run `main` method from `af.gov.anar.service_kit.Application`

#### How to setup development enviroment
```
$ cd nid_service_kit
$ bash setup.sh
$ mvn clean install -DskipTests
$ cd nid_service_kit_backoffice
$ mvn spring-boot:run
```

Client Sid UI: https://github.com/nsia-infosys/nid_service_kit_web

#### Documentation

Refer to this repository **Wiki** section.
https://github.com/nsia-infosys/nid_service_kit_backoffice/wiki
