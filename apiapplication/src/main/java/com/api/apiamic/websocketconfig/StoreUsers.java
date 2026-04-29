/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.api.apiamic.websocketconfig;

import java.util.LinkedList;
import java.util.List;
import org.springframework.stereotype.Service;

/**
 *
 * @author Jhon (TheBlack)
 */
@Service
public class StoreUsers 
{
    private static List<User> store = new LinkedList<>();
    
    //retorna todos los usuarios
    public  List<User> getUsers()
    {
        return store;
    }
    
    //filtra los usuarios que sean diferentes al que se pasa por parametro, es decir, ignora al que se pasa por parametro
    public List<User> filterUserById(List<User> users,User user)
    {
        return users.stream().filter(x-> x.getId()!=user.getId()).toList();
    }
    
    //Obtiene un usuario por el objeto usuario
    public User getUser(User user){
        List<User> lstuser=store.stream().filter(x-> x.getId().equals(user.getId())).toList();
        if(!lstuser.isEmpty())
        {
            return lstuser.get(0);
        }
        return null;
    }
    
    //Obtiene un usuario por el id que se pasa por parametro
    public User getUserByID(Long id){
        List<User> lstuser=store.stream().filter(x-> x.getId().equals(id)).toList();
        if(!lstuser.isEmpty())
        {
            return lstuser.get(0);
        }
        return null;
    }
    
    public Boolean addUser(User user)
    {
        store.add(user);
        return true;
    }
    
    public Boolean RemoveUser(User user)
    {
        store.remove(user);
        return true;
    }
}
