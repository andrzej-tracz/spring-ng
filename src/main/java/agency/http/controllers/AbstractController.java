package agency.http.controllers;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.RequestMapping;

abstract class AbstractController {

    @Value("${pagination.per_page}")
    int perPage;
}
