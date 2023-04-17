package net.damagewiz.damagewizweb.service;

import net.damagewiz.damagewizweb.entity.MyOrder;

import java.util.List;

public interface MyOrderService {

    List<MyOrder> addMyOrder(List<MyOrder> myOrders);

    List<MyOrder> getAllMyOrders(Long user_id);

}
