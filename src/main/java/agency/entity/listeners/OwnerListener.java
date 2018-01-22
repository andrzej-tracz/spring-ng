package agency.entity.listeners;

import agency.entity.Owner;
import org.springframework.data.mongodb.core.mapping.event.AbstractMongoEventListener;
import org.springframework.data.mongodb.core.mapping.event.BeforeSaveEvent;
import org.springframework.util.StringUtils;

import java.util.Date;

public class OwnerListener extends AbstractMongoEventListener<Owner> {

    @Override
    public void onBeforeSave(BeforeSaveEvent<Owner> event) {

        super.onBeforeSave(event);

        Object id = event.getDBObject().get("_id");

        if (StringUtils.isEmpty(id)) {
            event.getDBObject().put("createdAt", new Date());
        }

        event.getDBObject().put("updatedAt", new Date());
    }
}