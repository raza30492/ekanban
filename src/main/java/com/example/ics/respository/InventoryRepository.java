/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.example.ics.respository;

import com.example.ics.entity.Inventory;
import java.io.Serializable;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 *
 * @author razamd
 */
public interface InventoryRepository extends JpaRepository<Inventory, Long>{
    
}
