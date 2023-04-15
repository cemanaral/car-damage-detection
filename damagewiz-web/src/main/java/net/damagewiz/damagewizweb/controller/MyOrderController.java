package net.damagewiz.damagewizweb.controller;

import lombok.RequiredArgsConstructor;
import net.damagewiz.damagewizweb.entity.MyOrder;
import net.damagewiz.damagewizweb.service.MyOrderService;
import org.apache.coyote.Response;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/my_order")
public class MyOrderController {

    private final MyOrderService myOrderService;

    @PostMapping("/add")
    public ResponseEntity<List<MyOrder>> addMyOrders(@RequestBody List<MyOrder> myOrders){
        return ResponseEntity.ok(myOrderService.addMyOrder(myOrders));
    }

    @GetMapping("/{user_id}")
    public ResponseEntity<List<MyOrder>> getAllMyOrders(@PathVariable Long user_id){
        return ResponseEntity.ok(myOrderService.getAllMyOrders(user_id));
    }

}
