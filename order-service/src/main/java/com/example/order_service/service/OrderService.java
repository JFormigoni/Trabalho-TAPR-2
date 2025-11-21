package com.example.order_service.service;

import com.example.order_service.dto.CreateOrderRequest;
import com.example.order_service.model.Order;
import com.example.order_service.model.OrderItem;
import com.example.order_service.model.OrderStatus;
import com.example.order_service.repository.OrderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;

@Service
@RequiredArgsConstructor
public class OrderService {
    
    private final OrderRepository orderRepository;
    
    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }
    
    public Order getOrderById(Long id) {
        return orderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Pedido não encontrado"));
    }
    
    public List<Order> getOrdersByUserId(Long userId) {
        return orderRepository.findByUserId(userId);
    }
    
    public List<Order> getOrdersByStatus(OrderStatus status) {
        return orderRepository.findByStatus(status);
    }
    
    @Transactional
    public Order createOrder(CreateOrderRequest request) {
        Order order = new Order();
        order.setUserId(request.getUserId());
        order.setStatus(OrderStatus.PENDING);
        order.setDeliveryAddress(request.getDeliveryAddress());
        order.setDeliveryCity(request.getDeliveryCity());
        order.setDeliveryState(request.getDeliveryState());
        order.setDeliveryZipCode(request.getDeliveryZipCode());
        
        BigDecimal totalPrice = BigDecimal.ZERO;
        
        for (var itemRequest : request.getItems()) {
            OrderItem item = new OrderItem();
            item.setTireId(itemRequest.getTireId());
            item.setTireBrand(itemRequest.getTireBrand());
            item.setTireModel(itemRequest.getTireModel());
            item.setTireSize(itemRequest.getTireSize());
            item.setPrice(itemRequest.getPrice());
            item.setQuantity(itemRequest.getQuantity());
            
            BigDecimal subtotal = itemRequest.getPrice().multiply(BigDecimal.valueOf(itemRequest.getQuantity()));
            item.setSubtotal(subtotal);
            totalPrice = totalPrice.add(subtotal);
            
            order.addItem(item);
        }
        
        order.setTotalPrice(totalPrice);
        
        return orderRepository.save(order);
    }
    
    @Transactional
    public Order updateOrderStatus(Long id, OrderStatus status) {
        Order order = getOrderById(id);
        order.setStatus(status);
        return orderRepository.save(order);
    }
    
    @Transactional
    public void cancelOrder(Long id) {
        Order order = getOrderById(id);
        if (order.getStatus() == OrderStatus.DELIVERED) {
            throw new RuntimeException("Não é possível cancelar um pedido já entregue");
        }
        order.setStatus(OrderStatus.CANCELLED);
        orderRepository.save(order);
    }
}
