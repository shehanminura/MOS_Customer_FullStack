package edu.icet.ecom.service.impl;

import edu.icet.ecom.dto.Customer;
import edu.icet.ecom.entity.CustomerEntity;
import edu.icet.ecom.repository.CustomerRepository;
import edu.icet.ecom.service.CustomerService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CustomerServiceImpl implements CustomerService {



    final CustomerRepository repository;
    final ModelMapper mapper;

    @Override
    public void addCustomer(Customer customer) {
        repository.save(mapper.map(customer , CustomerEntity.class));
    }


    public List<Customer> getAll(){
        List<Customer> customerList = new ArrayList<>();
        List<CustomerEntity> all = repository.findAll();

        all.forEach(customerEntity -> {
            customerList.add(mapper.map(customerEntity,Customer.class));
        });
        return customerList;
    }

    @Override
    public void deleteCustomer(Integer id) {
        repository.deleteById(id);
    }

    @Override
    public void updateCustomer(Customer customer) {
        repository.save(mapper.map(customer, CustomerEntity.class));
    }

    @Override
    public Customer searchById(Integer id) {
        return mapper.map(repository.findById(id),Customer.class);
    }

    @Override
    public List<Customer> findByName(String name) {
        List<CustomerEntity> byName = repository.findByName(name);
        List<Customer> customerList = new ArrayList<>();

        byName.forEach(customerEntity -> {
            customerList.add(mapper.map(customerEntity,Customer.class));
        });
        return customerList;
    }




}
