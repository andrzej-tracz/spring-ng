package agency.entity.listeners;

import agency.entity.Policy;
import org.springframework.data.mongodb.core.mapping.event.AbstractMongoEventListener;
import org.springframework.data.mongodb.core.mapping.event.AfterConvertEvent;
import org.springframework.data.mongodb.core.mapping.event.BeforeSaveEvent;
import org.springframework.util.StringUtils;

import java.util.Date;

public class PolicyListener extends AbstractMongoEventListener<Policy> {

    @Override
    public void onBeforeSave(BeforeSaveEvent<Policy> event) {

        super.onBeforeSave(event);

        Object id = event.getDBObject().get("_id");

        if (StringUtils.isEmpty(id)) {
            event.getDBObject().put("createdAt", new Date());
        }

        event.getDBObject().put("updatedAt", new Date());
    }

    @Override
    public void onAfterConvert(AfterConvertEvent<Policy> event) {
        event.getSource().checkGeneratedFile();
    }
}