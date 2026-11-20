package com.organization.NoMindF.Security;

import com.organization.NoMindF.Model.Admin;
import jakarta.annotation.Nullable;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Collections;
import java.util.List;

public class UserPrincipal implements UserDetails {

    private Admin admin;
    public UserPrincipal(Admin admin) {
        if(admin==null){
            throw new IllegalArgumentException("Admin cannot be null");
        }
        this.admin = admin;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
    if(admin!=null){
        return Collections.singleton(new SimpleGrantedAuthority("ROLE_ADMIN"));
    }
        throw new IllegalStateException("UserPrincipal has no associated registration modal");
    }

    @Override
    public @Nullable String getPassword() {
        if (admin != null) {
            return admin.getPassword();
        }
        return null;
    }
    @Override
    public String getUsername() {
        System.out.println("inside getusername: userprinciple");
        if((admin!=null)&&(admin.getPhone()!=null)) {
            return admin.getPhone();
        }
        throw new IllegalStateException("UserPrincipal has no valid user registration model with phone");

    }
    @Override
    public boolean isAccountNonExpired() {
        //return UserDetails.super.isAccountNonExpired();
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return UserDetails.super.isAccountNonLocked();
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return UserDetails.super.isCredentialsNonExpired();
    }

    @Override
    public boolean isEnabled() {
        return UserDetails.super.isEnabled();
    }
}
