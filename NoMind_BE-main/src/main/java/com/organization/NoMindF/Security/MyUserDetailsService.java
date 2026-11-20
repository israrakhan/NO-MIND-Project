package com.organization.NoMindF.Security;

import com.organization.NoMindF.Model.Admin;
import com.organization.NoMindF.Repository.AdminRegistrationRepository;
import com.organization.NoMindF.Repository.InquiryRepository;
//import com.sun.security.auth.UserPrincipal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class MyUserDetailsService implements UserDetailsService {

    @Autowired
    AdminRegistrationRepository adminRegistrationRepository;

    @Autowired
    InquiryRepository inquiryRepository;

    @Override
    public UserDetails loadUserByUsername(String phone) throws UsernameNotFoundException {
        Admin admin = adminRegistrationRepository.findByPhone(phone);
        if (admin != null)
        {
            return new UserPrincipal(admin);
        }
        else
        {
        throw new UsernameNotFoundException("Admin not found with phone: " + phone);}
        }
    }


