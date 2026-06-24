package com.education.service.impl;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.regex.Pattern;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.education.model.Course;
import com.education.model.Message;
import com.education.model.MessageType;
import com.education.model.User;
import com.education.repository.MessageRepository;
import com.education.service.ChatService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ChatServiceImpl implements ChatService {
    private final MessageRepository messageRepository;
    private final Map<String, Map<String, Object>> conversationContext = new HashMap<>();
    private final Map<String, List<String>> userHistory = new HashMap<>();
    
    // Common patterns for better matching
    private static final Pattern GREETING_PATTERN = Pattern.compile("(hi|hello|hey|good\\s*(morning|afternoon|evening))", Pattern.CASE_INSENSITIVE);
    private static final Pattern THANKS_PATTERN = Pattern.compile("(thank|thanks|appreciate)", Pattern.CASE_INSENSITIVE);
    private static final Pattern ENROLL_PATTERN = Pattern.compile("(enroll|register|sign\\s*up|join|apply)", Pattern.CASE_INSENSITIVE);
    private static final Pattern PRICE_PATTERN = Pattern.compile("(fee|cost|price|payment|how\\s*much)", Pattern.CASE_INSENSITIVE);
    private static final Pattern SCHEDULE_PATTERN = Pattern.compile("(schedule|time|when|day|session)", Pattern.CASE_INSENSITIVE);
    private static final Pattern LEVEL_PATTERN = Pattern.compile("(level|difficulty|beginner|intermediate|advanced)", Pattern.CASE_INSENSITIVE);
    private static final Pattern DESCRIPTION_PATTERN = Pattern.compile("(description|about|what|tell\\s*me|explain)", Pattern.CASE_INSENSITIVE);
    private static final Pattern HELP_PATTERN = Pattern.compile("(help|support|assist|guide)", Pattern.CASE_INSENSITIVE);
    private static final Pattern CONTACT_PATTERN = Pattern.compile("(contact|email|phone|reach|support)", Pattern.CASE_INSENSITIVE);
    private static final Pattern MATERIALS_PATTERN = Pattern.compile("(material|book|resource|study|learn)", Pattern.CASE_INSENSITIVE);
    private static final Pattern CERTIFICATE_PATTERN = Pattern.compile("(certificate|diploma|qualification|accredit)", Pattern.CASE_INSENSITIVE);

    @Override
    @Transactional
    public Message saveMessage(Message message) {
        // Update user history
        String userId = message.getSender() != null ? message.getSender().getUsername() : "anonymous";
        userHistory.computeIfAbsent(userId, k -> new ArrayList<>()).add(message.getContent());
        
        return messageRepository.save(message);
    }

    @Override
    public List<Message> getCourseMessages(Course course) {
        return messageRepository.findByCourseOrderByCreatedAtDesc(course);
    }

    @Override
    @Transactional
    public Message generateBotResponse(String userMessage, Course course) {
        String response = generateResponse(userMessage, course);
        Message botMessage = new Message();
        botMessage.setContent(response);
        botMessage.setCourse(course);
        botMessage.setType(MessageType.BOT);
        return saveMessage(botMessage);
    }

    @Override
    public void sendMessageToUser(User user, String message) {
        // Implementation for sending direct messages to users
    }

    @Override
    public void broadcastMessage(Course course, Message message) {
        // Implementation for broadcasting messages to all users in a course
    }

    private String generateResponse(String userMessage, Course course) {
        userMessage = userMessage.toLowerCase();
        String userId = "anonymous"; // In a real app, this would be the actual user ID
        
        // Update conversation context
        Map<String, Object> context = conversationContext.computeIfAbsent(userId, k -> new HashMap<>());
        context.put("lastMessage", userMessage);
        context.put("lastMessageTime", LocalDateTime.now());
        context.put("courseId", course.getId());
        
        // Check for greetings
        if (GREETING_PATTERN.matcher(userMessage).find()) {
            return generateGreeting(course);
        }
        
        // Check for thanks
        if (THANKS_PATTERN.matcher(userMessage).find()) {
            return "You're welcome! Is there anything else I can help you with regarding " + course.getTitle() + "?";
        }
        
        // Check for enrollment questions
        if (ENROLL_PATTERN.matcher(userMessage).find()) {
            return generateEnrollmentResponse(course);
        }
        
        // Check for price/fee questions
        if (PRICE_PATTERN.matcher(userMessage).find()) {
            return generatePriceResponse(course);
        }
        
        // Check for schedule questions
        if (SCHEDULE_PATTERN.matcher(userMessage).find()) {
            return generateScheduleResponse(course);
        }
        
        // Check for level/difficulty questions
        if (LEVEL_PATTERN.matcher(userMessage).find()) {
            return generateLevelResponse(course);
        }
        
        // Check for description/about questions
        if (DESCRIPTION_PATTERN.matcher(userMessage).find()) {
            return generateDescriptionResponse(course);
        }
        
        // Check for help questions
        if (HELP_PATTERN.matcher(userMessage).find()) {
            return generateHelpResponse(course);
        }
        
        // Check for contact questions
        if (CONTACT_PATTERN.matcher(userMessage).find()) {
            return generateContactResponse();
        }
        
        // Check for materials/resources questions
        if (MATERIALS_PATTERN.matcher(userMessage).find()) {
            return generateMaterialsResponse(course);
        }
        
        // Check for certificate questions
        if (CERTIFICATE_PATTERN.matcher(userMessage).find()) {
            return generateCertificateResponse(course);
        }
        
        // Check user history for context
        List<String> history = userHistory.get(userId);
        if (history != null && !history.isEmpty()) {
            String lastUserMessage = history.get(history.size() - 1);
            if (lastUserMessage.contains("fee") && userMessage.contains("discount")) {
                return "We offer a 10% discount for early enrollment and a 15% discount for students. Would you like to know more about our discount programs?";
            }
        }
        
        // Default response with course-specific suggestions
        return generateDefaultResponse(course);
    }
    
    private String generateGreeting(Course course) {
        int hour = LocalDateTime.now().getHour();
        String greeting;
        
        if (hour < 12) {
            greeting = "Good morning";
        } else if (hour < 18) {
            greeting = "Good afternoon";
        } else {
            greeting = "Good evening";
        }
        
        return greeting + "! I'm your course assistant for " + course.getTitle() + 
               ". How can I help you today? You can ask me about course details, enrollment, schedules, or fees.";
    }
    
    private String generateEnrollmentResponse(Course course) {
        LocalDateTime now = LocalDateTime.now();
        LocalDateTime startDate = course.getStartDate();
        
        if (startDate != null && startDate.isAfter(now)) {
            long daysUntilStart = java.time.Duration.between(now, startDate).toDays();
            return "You can enroll in " + course.getTitle() + " right now! The course starts in " + daysUntilStart + 
                   " days. The enrollment fee is £" + course.getCourseFee() + 
                   ". Would you like me to guide you through the enrollment process?";
        } else {
            return "You can enroll in " + course.getTitle() + " at any time. The course is currently in progress, " +
                   "but you can join and access all materials. The enrollment fee is £" + course.getCourseFee() + 
                   ". Would you like information about our next session?";
        }
    }
    
    private String generatePriceResponse(Course course) {
        return "The fee for " + course.getTitle() + " is £" + course.getCourseFee() + 
               ". This includes all course materials, access to our online platform, and support from instructors. " +
               "We also offer payment plans and discounts for early enrollment. Would you like to know more about our payment options?";
    }
    
    private String generateScheduleResponse(Course course) {
        if (course.getSchedule() != null && !course.getSchedule().isEmpty()) {
            return course.getTitle() + " classes are scheduled for " + course.getSchedule() + 
                   ". Each session is 2 hours long. You can also access recorded sessions if you miss a class. " +
                   "Would you like to know about the specific topics covered in each session?";
        } else {
            return "The schedule for " + course.getTitle() + " is flexible. You can access the course materials " +
                   "at any time and complete the assignments at your own pace. There are weekly live sessions " +
                   "with instructors for questions and discussions. Would you like to know more about the course structure?";
        }
    }
    
    private String generateLevelResponse(Course course) {
        if (course.getLevel() != null && !course.getLevel().isEmpty()) {
            return course.getTitle() + " is a " + course.getLevel() + " level course. " +
                   "It's designed for " + getLevelDescription(course.getLevel()) + 
                   ". Would you like to know about the prerequisites or what you'll learn in this course?";
        } else {
            return "The difficulty level of " + course.getTitle() + " varies based on your background. " +
                   "We recommend having basic knowledge in the subject area. The course includes both " +
                   "theoretical concepts and practical applications. Would you like to know more about the course content?";
        }
    }
    
    private String getLevelDescription(String level) {
        switch (level.toLowerCase()) {
            case "beginner":
                return "students with no prior experience in the subject";
            case "intermediate":
                return "students with some background knowledge who want to deepen their understanding";
            case "advanced":
                return "experienced students looking to master advanced concepts";
            default:
                return "students with varying levels of experience";
        }
    }
    
    private String generateDescriptionResponse(Course course) {
        if (course.getDescription() != null && !course.getDescription().isEmpty()) {
            return course.getDescription() + 
                   "\n\nThis course is designed to help you " + getCourseObjective(course.getTitle()) + 
                   ". Would you like to know about the specific topics covered or the learning outcomes?";
        } else {
            return course.getTitle() + " is a comprehensive course designed to " + getCourseObjective(course.getTitle()) + 
                   ". The course covers essential concepts and practical applications. " +
                   "Would you like to know more about the course structure or the skills you'll gain?";
        }
    }
    
    private String getCourseObjective(String courseTitle) {
        if (courseTitle.toLowerCase().contains("web")) {
            return "develop modern web applications using the latest technologies";
        } else if (courseTitle.toLowerCase().contains("data")) {
            return "analyze data and build machine learning models";
        } else if (courseTitle.toLowerCase().contains("marketing")) {
            return "create effective digital marketing strategies";
        } else {
            return "master the subject matter and apply it in real-world scenarios";
        }
    }
    
    private String generateHelpResponse(Course course) {
        return "I can help you with information about " + course.getTitle() + ", including:\n" +
               "- Course details and description\n" +
               "- Enrollment process and fees\n" +
               "- Schedule and session times\n" +
               "- Course materials and resources\n" +
               "- Prerequisites and difficulty level\n" +
               "- Certification and outcomes\n\n" +
               "What specific information would you like to know?";
    }
    
    private String generateContactResponse() {
        return "You can reach our support team through:\n" +
               "- Email: support@educationplatform.com\n" +
               "- Phone: +44 123 456 7890\n" +
               "- Live chat: Available 9 AM - 5 PM GMT\n\n" +
               "For urgent matters, please call our helpline. How else can I assist you today?";
    }
    
    private String generateMaterialsResponse(Course course) {
        return "The course materials for " + course.getTitle() + " include:\n" +
               "- Comprehensive study guides and textbooks\n" +
               "- Video lectures and tutorials\n" +
               "- Practice exercises and assignments\n" +
               "- Access to our online learning platform\n" +
               "- Supplementary resources and reading materials\n\n" +
               "All materials are available online and can be accessed at any time. Would you like to know more about the course structure?";
    }
    
    private String generateCertificateResponse(Course course) {
        return "Upon successful completion of " + course.getTitle() + ", you will receive:\n" +
               "- A verified certificate from our institution\n" +
               "- Recognition of your skills and knowledge\n" +
               "- Access to our alumni network\n" +
               "- Opportunities for further education\n\n" +
               "The certificate is issued electronically and can be shared on professional platforms. Would you like to know about the assessment criteria?";
    }
    
    private String generateDefaultResponse(Course course) {
        return "I'm not sure I understood your question about " + course.getTitle() + 
               ". You can ask me about:\n" +
               "- Course details and description\n" +
               "- Enrollment process and fees\n" +
               "- Schedule and session times\n" +
               "- Course materials and resources\n" +
               "- Prerequisites and difficulty level\n\n" +
               "Or you can rephrase your question, and I'll do my best to help you.";
    }
} 