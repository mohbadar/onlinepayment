package af.gov.anar.service_kit.infrastructure.datatype;

import com.fasterxml.jackson.databind.ObjectMapper;

public abstract class AbstractGenericJsonAttributeConverter<X> implements GenericJsonAttributeConverter<X> {

    private static final ObjectMapper objectmapper = new ObjectMapper();

    @Override
    public ObjectMapper getObjectMapper() {
        return AbstractGenericJsonAttributeConverter.objectmapper;
    }
}