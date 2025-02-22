package edu.icet.ecom.repository;

import edu.icet.ecom.dto.Customer;
import edu.icet.ecom.entity.CustomerEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.yaml.snakeyaml.events.Event;

import java.util.List;

public interface CustomerRepository extends JpaRepository<CustomerEntity , Integer> {

    List<CustomerEntity> findByName(String name);

}
