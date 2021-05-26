package com.schooldevops.ddoboard;

import static com.tngtech.archunit.lang.syntax.ArchRuleDefinition.noClasses;

import com.tngtech.archunit.core.domain.JavaClasses;
import com.tngtech.archunit.core.importer.ClassFileImporter;
import com.tngtech.archunit.core.importer.ImportOption;
import org.junit.jupiter.api.Test;

class ArchTest {

    @Test
    void servicesAndRepositoriesShouldNotDependOnWebLayer() {
        JavaClasses importedClasses = new ClassFileImporter()
            .withImportOption(ImportOption.Predefined.DO_NOT_INCLUDE_TESTS)
            .importPackages("com.schooldevops.ddoboard");

        noClasses()
            .that()
            .resideInAnyPackage("com.schooldevops.ddoboard.service..")
            .or()
            .resideInAnyPackage("com.schooldevops.ddoboard.repository..")
            .should()
            .dependOnClassesThat()
            .resideInAnyPackage("..com.schooldevops.ddoboard.web..")
            .because("Services and repositories should not depend on web layer")
            .check(importedClasses);
    }
}
