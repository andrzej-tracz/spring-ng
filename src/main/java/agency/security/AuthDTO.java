package agency.security;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;

@Data
@AllArgsConstructor
public class AuthDTO
{
    @Getter
    private String username;

    @Getter
    private String password;

    public AuthDTO () {

    }
}
