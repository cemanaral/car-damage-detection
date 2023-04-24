package net.damagewiz.damagewizweb.controller;

import lombok.RequiredArgsConstructor;
import net.damagewiz.damagewizweb.entity.CarPart;
import net.damagewiz.damagewizweb.entity.MyOrder;
import net.damagewiz.damagewizweb.entity.MyOrderFromIdsRequest;
import net.damagewiz.damagewizweb.entity.User;
import net.damagewiz.damagewizweb.service.CarPartService;
import net.damagewiz.damagewizweb.service.MyOrderService;
import net.damagewiz.damagewizweb.service.UserService;
import org.apache.coyote.Response;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/my_order")
@CrossOrigin()
public class MyOrderController {

    private final MyOrderService myOrderService;
    private final CarPartService carPartService;
    private final UserService userService;

    @PostMapping("/add")
    public ResponseEntity<List<MyOrder>> addMyOrders(@RequestBody List<MyOrder> myOrders){
        return ResponseEntity.ok(myOrderService.addMyOrder(myOrders));
    }

    @PostMapping("/add_order")
    public ResponseEntity<List<MyOrder>> addOrderFromIds(@RequestBody MyOrderFromIdsRequest req) {
        User user = userService.getUserInformation(req.getUsername());
        List<CarPart> carParts = carPartService.getCarPartsFromIds(req.getCarPartIds());

        List<MyOrder> myOrders = new ArrayList<>();
        MyOrder newOrder;
        for (CarPart carPart : carParts) {
            newOrder = new MyOrder();
            newOrder.setUser(user);
            newOrder.setCarPart(carPart);
            myOrders.add(newOrder);
        }

        return ResponseEntity.ok(myOrderService.addMyOrder(myOrders));
    }

    @GetMapping("/{user_id}")
    public ResponseEntity<List<MyOrder>> getAllMyOrders(@PathVariable Long user_id){
        return ResponseEntity.ok(myOrderService.getAllMyOrders(user_id));
    }

}
