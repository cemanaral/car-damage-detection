package net.damagewiz.damagewizweb.repository;

import net.damagewiz.damagewizweb.entity.MyOrder;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MyOrderRepository extends JpaRepository<MyOrder, Long> {

}
