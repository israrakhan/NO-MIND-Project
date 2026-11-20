package com.organization.NoMindF.Security;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class JwtFilter extends OncePerRequestFilter {

    @Autowired
    JwtService jwtService;
    @Autowired
    MyUserDetailsService userDetailsService;

    public static final String[] PUBLIC_URLS = {
            "/api/v1/admin/login",
            "/api/v1/admin/register",
            "/api/v1/follower/inquiries",
            "/api/v1/follower/programs",
            "/api/v1/uploads/"
    };

//    @Override
//    protected boolean shouldNotFilter(HttpServletRequest request) {
//        String requestURI = request.getRequestURI();
//        for (String url : PUBLIC_URLS) {
//            if (url.endsWith("/") && requestURI.startsWith(url)) {
//                return true;
//            } else if (requestURI.equals(url)) {
//                return true;
//            }
//        }
//        return false;
//    }
@Override
protected boolean shouldNotFilter(HttpServletRequest request) {

    String uri = request.getRequestURI();
    System.out.println("inside JWT filter: "+request.getRequestURI());
    return uri.startsWith("/api/v1/admin/login")
            || uri.startsWith("/api/v1/admin/register")
            || uri.startsWith("/api/v1/follower/")
            || uri.startsWith("/api/v1/uploads/");
}


    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException
    {

        String authHeader =request.getHeader("Authorization");
        String token = null;
        String phone = null;

        if(authHeader!=null && authHeader.startsWith("Bearer ")){
            token = authHeader.substring(7);
            try {
                phone = jwtService.extractPhone(token);// jwtService.extractEmail(token);
            } catch (Exception e) {
               e.getMessage();
            }
        }



        if(phone != null && SecurityContextHolder.getContext().getAuthentication()==null)
        {
            try {
                UserDetails userDetails = userDetailsService.loadUserByUsername(phone);

                if(jwtService.validateToken(token, userDetails))
                {
                    UsernamePasswordAuthenticationToken authToken =
                            new UsernamePasswordAuthenticationToken(userDetails, null,userDetails.getAuthorities());
                    authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                    SecurityContextHolder.getContext().setAuthentication(authToken);

                }
                else
                {
                    //it gives validation failed
                    System.out.println("token validation failed");
                }
            } catch (org.springframework.security.core.userdetails.UsernameNotFoundException ex) {
                System.out.println("Operator not found for phone: " + phone);
            } catch (Exception ex) {
                System.out.println("Error loading user details: " + ex.getMessage());
            }

        }
        filterChain.doFilter(request,response);
    }

}
