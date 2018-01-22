package agency.repositories;

import agency.entity.Policy;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.Date;

public interface PoliciesRepository extends MongoRepository<Policy, String> {

    @Query(value = "{'status': 'CLOSED' }", count = true)
    public int getActivePoliciesCount();

    @Query(value = "{'closedAt': { $gt: ?0, $lt: ?1 }  }", count = true)
    public int findByClosedAtBetweenCount(Date from, Date to);
}
