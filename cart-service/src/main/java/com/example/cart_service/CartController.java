package com.example.cart_service;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.concurrent.CopyOnWriteArrayList;
import java.util.concurrent.atomic.AtomicLong;

@RestController
@RequestMapping("/cart")
public class CartController {

    private final List<CartItem> items = new CopyOnWriteArrayList<>();
    private final AtomicLong idGen = new AtomicLong(1);

    @GetMapping
    public List<CartItem> getCart() {
        return items;
    }

    @GetMapping("/{id}")
    public ResponseEntity<CartItem> getItem(@PathVariable Long id) {
        return items.stream()
                .filter(i -> i.getId().equals(id))
                .findFirst()
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<CartItem> addItem(@RequestBody CartItem item) {
        item.setId(idGen.getAndIncrement());
        items.add(item);
        return ResponseEntity.status(HttpStatus.CREATED).body(item);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> removeItem(@PathVariable Long id) {
        boolean removed = items.removeIf(i -> i.getId().equals(id));
        return removed ? ResponseEntity.noContent().build() : ResponseEntity.notFound().build();
    }
}