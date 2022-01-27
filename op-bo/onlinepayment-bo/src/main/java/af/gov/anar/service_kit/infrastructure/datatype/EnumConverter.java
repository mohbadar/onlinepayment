package af.gov.anar.service_kit.infrastructure.datatype;

public class EnumConverter<T extends Enum<T>>
{

    Class<T> type;

    public EnumConverter(Class<T> type)
    {
        this.type = type;
    }

    public Enum<T> convert(String text)
    {
        for (Enum<T> candidate : type.getEnumConstants()) {
            if (candidate.name().equalsIgnoreCase(text)) {
                return candidate;
            }
        }

        return null;
    }
}