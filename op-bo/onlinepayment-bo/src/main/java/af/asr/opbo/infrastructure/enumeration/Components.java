package af.asr.opbo.infrastructure.enumeration;

import lombok.Getter;

/**
 * Enum for Application Modules to be used in Audit
 */
public enum Components {

    ORGANIZATION(" eBreshna-ANAR-101", "ORGANIZATION"),
    PROJECT(" eBreshna-ANAR-102", "PROJECT"),
    PROGRAME(" eBreshna-ANAR-103", "PROGRAME"),
    FUND(" eBreshna-ANAR-104", "FUND"),
    OFFICE(" eBreshna-ANAR-105", "OFFICE");

    /**
     * The constructor
     */
    Components(String id, String name) {
        this.id = id;
        this.name = name;
    }

    @Getter
    private final String id;
    @Getter
    private final String name;


    public String getId() {
        return id;
    }

    public String getName() {
        return name;
    }
}