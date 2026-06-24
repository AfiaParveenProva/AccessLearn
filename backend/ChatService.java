package com.education.service;

import java.util.List;

import com.education.model.Course;
import com.education.model.Message;
import com.education.model.User;

public interface ChatService {
    Message saveMessage(Message message);
    List<Message> getCourseMessages(Course course);
    Message generateBotResponse(String userMessage, Course course);
    void sendMessageToUser(User user, String message);
    void broadcastMessage(Course course, Message message);
} 