package agency.entity.listeners;

import agency.entity.Customer;
import org.springframework.data.mongodb.core.mapping.event.AbstractMongoEventListener;
import org.springframework.data.mongodb.core.mapping.event.BeforeSaveEvent;
import org.springframework.util.StringUtils;

import java.util.Date;

public class CustomerListener extends AbstractMongoEventListener<Customer> {

    @Override
    public void onBeforeSave(BeforeSaveEvent<Customer> event) {

        super.onBeforeSave(event);

        Object id = event.getDBObject().get("_id");

        if (StringUtils.isEmpty(id)) {
            event.getDBObject().put("createdAt", new Date());
        }

        event.getDBObject().put("updatedAt", new Date());
    }
}