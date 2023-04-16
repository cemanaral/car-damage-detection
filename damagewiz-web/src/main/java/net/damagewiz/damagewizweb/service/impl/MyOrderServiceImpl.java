package net.damagewiz.damagewizweb.service.impl;

import lombok.RequiredArgsConstructor;
import net.damagewiz.damagewizweb.entity.MyOrder;
import net.damagewiz.damagewizweb.repository.MyOrderRepository;
import net.damagewiz.damagewizweb.service.MyOrderService;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class MyOrderServiceImpl implements MyOrderService {

    private final MyOrderRepository myOrderRepository;
    private static Long order_id = 1L;


    //POST REQUESTTE ENTITY ICINDE ENTITY VAR ISE POST REQUESTIN ICINDEKI ENTITY FIELDLARINDA SADECE NULLABLE FALSE
    //OLAN FIELDLAR DOLDURULUNCA SORUN OLMUYOR. GEREKSIZ BILGILERI KOYMAYA GEREK YOK!
    @Override
    public List<MyOrder> addMyOrder(List<MyOrder> myOrders) {
        boolean isSuccess = false;
        Long orderId = order_id;
        for(MyOrder myOrder: myOrders){
            if(myOrder.getUser() != null && myOrder.getCarPart() != null) {
                myOrder.setOrderId(orderId);
                myOrderRepository.save(myOrder);
                isSuccess = true;
            }
        }
        if(isSuccess)
            order_id++;
        return myOrders;
    }

    @Override
    public List<MyOrder> getAllMyOrders(Long user_id) {
        List<MyOrder> myOrders = myOrderRepository.findAll();
        List<MyOrder> myOrderList = new ArrayList<>();
        for(MyOrder myOrder: myOrders){
            if(myOrder.getUser().getId().equals(user_id)){
                myOrderList.add(myOrder);
            }
        }
        return myOrderList;
    }
}
