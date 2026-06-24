package com.education.controller;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.stereotype.Controller;

import com.education.model.Message;
import com.education.service.ChatService;

import lombok.RequiredArgsConstructor;

@Controller
@RequiredArgsConstructor
public class ChatController {
    private final ChatService chatService;

    @MessageMapping("/chat.send")
    @SendTo("/topic/public")
    public Message sendMessage(@Payload Message message) {
        return chatService.saveMessage(message);
    }

    @MessageMapping("/chat.bot")
    @SendTo("/topic/public")
    public Message handleBotMessage(@Payload Message message) {
        return chatService.generateBotResponse(message.getContent(), message.getCourse());
    }

    @MessageMapping("/chat.join")
    @SendTo("/topic/public")
    public Message addUser(@Payload Message message, SimpMessageHeaderAccessor headerAccessor) {
        headerAccessor.getSessionAttributes().put("username", message.getSender().getUsername());
        return message;
    }
} 