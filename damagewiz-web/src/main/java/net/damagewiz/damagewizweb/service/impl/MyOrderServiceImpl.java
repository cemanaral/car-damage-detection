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

    //POST REQUESTTE ENTITY ICINDE ENTITY VAR ISE POST REQUESTIN ICINDEKI ENTITY FIELDLARINDA SADECE NULLABLE FALSE
    //OLAN FIELDLAR DOLDURULUNCA SORUN OLMUYOR. GEREKSIZ BILGILERI KOYMAYA GEREK YOK!
    @Override
    public List<MyOrder> addMyOrder(List<MyOrder> myOrders) {

        List<MyOrder> allUsersOrders = myOrderRepository.findAll();
        Long orderId;
        if(allUsersOrders.isEmpty()) {
            orderId = 1L;
        }
        else{
            MyOrder largestOrderIdMyOrder = allUsersOrders.get(allUsersOrders.size()-1);
            for(MyOrder myOrder: allUsersOrders){
                if(myOrder.getOrderId() > largestOrderIdMyOrder.getOrderId()){
                    largestOrderIdMyOrder = myOrder;
                }
            }
            orderId = largestOrderIdMyOrder.getOrderId() + 1;
        }
        for(MyOrder myOrder: myOrders){
            if(myOrder.getUser() != null && myOrder.getCarPart() != null) {
                myOrder.setOrderId(orderId);
                myOrderRepository.save(myOrder);

            }
        }
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
