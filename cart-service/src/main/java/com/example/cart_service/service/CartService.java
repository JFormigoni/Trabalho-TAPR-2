package com.example.cart_service.service;

import com.example.cart_service.dto.AddToCartRequest;
import com.example.cart_service.model.Cart;
import com.example.cart_service.model.CartItem;
import com.example.cart_service.repository.CartItemRepository;
import com.example.cart_service.repository.CartRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class CartService {
    
    private final CartRepository cartRepository;
    private final CartItemRepository cartItemRepository;
    
    public Cart getCartByUserId(Long userId) {
        return cartRepository.findByUserId(userId)
                .orElseGet(() -> {
                    Cart cart = new Cart();
                    cart.setUserId(userId);
                    return cartRepository.save(cart);
                });
    }
    
    @Transactional
    public Cart addItemToCart(Long userId, AddToCartRequest request) {
        Cart cart = getCartByUserId(userId);
        
        // Verificar se o item já existe no carrinho
        CartItem existingItem = cart.getItems().stream()
                .filter(item -> item.getTireId().equals(request.getTireId()))
                .findFirst()
                .orElse(null);
        
        if (existingItem != null) {
            existingItem.setQuantity(existingItem.getQuantity() + request.getQuantity());
        } else {
            CartItem newItem = new CartItem();
            newItem.setTireId(request.getTireId());
            newItem.setTireBrand(request.getTireBrand());
            newItem.setTireModel(request.getTireModel());
            newItem.setTireSize(request.getTireSize());
            newItem.setPrice(request.getPrice());
            newItem.setQuantity(request.getQuantity());
            cart.addItem(newItem);
        }
        
        return cartRepository.save(cart);
    }
    
    @Transactional
    public Cart updateItemQuantity(Long userId, Long itemId, Integer quantity) {
        Cart cart = getCartByUserId(userId);
        
        CartItem item = cart.getItems().stream()
                .filter(i -> i.getId().equals(itemId))
                .findFirst()
                .orElseThrow(() -> new RuntimeException("Item não encontrado no carrinho"));
        
        if (quantity <= 0) {
            cart.removeItem(item);
        } else {
            item.setQuantity(quantity);
        }
        
        return cartRepository.save(cart);
    }
    
    @Transactional
    public void removeItemFromCart(Long userId, Long itemId) {
        Cart cart = getCartByUserId(userId);
        
        CartItem item = cart.getItems().stream()
                .filter(i -> i.getId().equals(itemId))
                .findFirst()
                .orElseThrow(() -> new RuntimeException("Item não encontrado no carrinho"));
        
        cart.removeItem(item);
        cartRepository.save(cart);
    }
    
    @Transactional
    public void clearCart(Long userId) {
        Cart cart = getCartByUserId(userId);
        cart.getItems().clear();
        cartRepository.save(cart);
    }
}
