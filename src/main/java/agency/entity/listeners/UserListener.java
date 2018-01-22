package agency.entity.listeners;

import agency.entity.User;
import agency.services.security.Hash;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.mapping.event.AbstractMongoEventListener;
import org.springframework.data.mongodb.core.mapping.event.BeforeSaveEvent;
import org.springframework.util.StringUtils;

import java.util.Date;

public class UserListener extends AbstractMongoEventListener<User> {

    @Autowired
    private Hash hash;

    @Override
    public void onBeforeSave(BeforeSaveEvent<User> event) {

        super.onBeforeSave(event);

        String plainPassword = (String) event.getDBObject().get("password");
        Object id = event.getDBObject().get("_id");

        if (! StringUtils.isEmpty(plainPassword) && StringUtils.isEmpty(id)) {
            event.getDBObject().put("password", this.hash.encode(plainPassword));
            event.getDBObject().put("createdAt", new Date());
        }

        event.getDBObject().put("updatedAt", new Date());
    }
}