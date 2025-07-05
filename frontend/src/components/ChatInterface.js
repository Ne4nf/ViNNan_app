import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  Paper,
  TextField,
  IconButton,
  Typography,
  Avatar,
  Chip,
  Alert,
  CircularProgress,
  Divider,
  useTheme,
} from '@mui/material';
import {
  Send as SendIcon,
  LocalHospital as MedicalIcon,
  Person as PersonIcon,
  Warning as WarningIcon,
} from '@mui/icons-material';
import { formatDistanceToNow } from 'date-fns';
import { vi } from 'date-fns/locale';
import ReactMarkdown from 'react-markdown';
import chatService from '../services/chatService';

const ChatInterface = ({ sessionId, onSessionCreate }) => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [symptoms, setSymptoms] = useState('');
  const messagesEndRef = useRef(null);
  const theme = useTheme();

  useEffect(() => {
    // Initialize with welcome message
    const welcomeMessage = {
      role: 'assistant',
      content: 'Xin chào! Tôi là ViNNan - Chatbot y tế tự động, hỗ trợ chuẩn đoán bệnh và truy xuất thông tin y tế. Bạn có thể nêu triệu chứng hoặc tên bệnh để tôi giúp bạn một cách chi tiết và chính xác nhất. Hãy bắt đầu nào!',
      timestamp: new Date().toLocaleTimeString('vi-VN'),
      possible_diseases: [],
    };
    setMessages([welcomeMessage]);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      role: 'user',
      content: inputMessage,
      timestamp: new Date().toLocaleTimeString('vi-VN'),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);
    setError(null);

    try {
      const response = await chatService.sendMessage(
        inputMessage,
        sessionId,
        symptoms
      );

      const assistantMessage = {
        role: 'assistant',
        content: response.response,
        timestamp: response.timestamp,
        possible_diseases: response.possible_diseases || [],
        ask_confirmation: response.ask_confirmation,
      };

      setMessages(prev => [...prev, assistantMessage]);
      setSymptoms(response.symptoms || '');

      // If this is the first message and we don't have a session ID, create one
      if (!sessionId && onSessionCreate) {
        const sessionResponse = await chatService.createNewSession();
        onSessionCreate(sessionResponse.session_id);
      }
    } catch (error) {
      setError('Đã xảy ra lỗi khi gửi tin nhắn. Vui lòng thử lại.');
      console.error('Error sending message:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSendMessage();
    }
  };

  const MessageBubble = ({ message, isUser }) => {
    const bgColor = isUser ? theme.palette.primary.main : theme.palette.background.paper;
    const textColor = isUser ? 'white' : theme.palette.text.primary;
    const avatar = isUser ? <PersonIcon /> : <MedicalIcon />;
    const avatarBg = isUser ? theme.palette.primary.main : theme.palette.secondary.main;

    return (
      <Box
        sx={{
          display: 'flex',
          alignItems: 'flex-start',
          mb: 2,
          flexDirection: isUser ? 'row-reverse' : 'row',
        }}
      >
        <Avatar sx={{ bgcolor: avatarBg, mr: isUser ? 0 : 1, ml: isUser ? 1 : 0 }}>
          {avatar}
        </Avatar>
        <Box
          sx={{
            maxWidth: '70%',
            p: 2,
            borderRadius: 2,
            bgcolor: bgColor,
            color: textColor,
            wordBreak: 'break-word',
            border: !isUser ? `1px solid ${theme.palette.divider}` : 'none',
            boxShadow: theme.shadows[1],
          }}
        >
          <Box sx={{ color: textColor }}>
            <ReactMarkdown>{message.content}</ReactMarkdown>
          </Box>
          
          {/* Display possible diseases */}
          {message.possible_diseases && message.possible_diseases.length > 0 && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="body2" sx={{ mb: 1, fontWeight: 'bold', color: textColor }}>
                🩺 Các bệnh có thể liên quan:
              </Typography>
              {message.possible_diseases.map((disease, index) => (
                <Chip
                  key={index}
                  label={`${index + 1}. ${disease}`}
                  size="small"
                  sx={{ 
                    mr: 1, 
                    mb: 1,
                    bgcolor: theme.palette.secondary.light,
                    color: theme.palette.secondary.contrastText,
                    '&:hover': {
                      bgcolor: theme.palette.secondary.main,
                    }
                  }}
                />
              ))}
            </Box>
          )}

          {/* Timestamp */}
          <Typography
            variant="caption"
            sx={{
              display: 'block',
              mt: 1,
              opacity: 0.7,
              fontSize: '0.75rem',
              color: textColor,
            }}
          >
            {message.timestamp}
          </Typography>
        </Box>
      </Box>
    );
  };

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <Paper
        elevation={1}
        sx={{
          p: 2,
          borderRadius: 0,
          background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
          color: 'white',
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
          💊 ViNNan - Trợ lý Y Tế Thông minh
        </Typography>
        <Typography variant="body2" sx={{ opacity: 0.9 }}>
          Hỏi đáp y tế bằng Tiếng Việt, chuẩn đoán và truy xuất nhanh chóng, chính xác
        </Typography>
      </Paper>

      {/* Messages Area */}
      <Box
        sx={{
          flex: 1,
          overflow: 'auto',
          p: 2,
          bgcolor: theme.palette.background.default,
        }}
      >
        {error && (
          <Alert
            severity="error"
            sx={{ mb: 2 }}
            icon={<WarningIcon />}
            onClose={() => setError(null)}
          >
            {error}
          </Alert>
        )}

        {messages.map((message, index) => (
          <MessageBubble
            key={index}
            message={message}
            isUser={message.role === 'user'}
          />
        ))}

        {isLoading && (
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Avatar sx={{ bgcolor: theme.palette.secondary.main, mr: 1 }}>
              <MedicalIcon />
            </Avatar>
            <Box
              sx={{
                p: 2,
                borderRadius: 2,
                bgcolor: theme.palette.background.paper,
                color: theme.palette.text.primary,
                display: 'flex',
                alignItems: 'center',
                border: `1px solid ${theme.palette.divider}`,
              }}
            >
              <CircularProgress size={20} sx={{ mr: 1 }} />
              <Typography variant="body2">🤖 Đang xử lý...</Typography>
            </Box>
          </Box>
        )}

        <div ref={messagesEndRef} />
      </Box>

      <Divider />

      {/* Input Area */}
      <Box sx={{ p: 2, bgcolor: theme.palette.background.paper }}>
        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
          <TextField
            fullWidth
            multiline
            maxRows={4}
            placeholder="Nhập câu hỏi của bạn bằng tiếng Việt..."
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={isLoading}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 3,
              },
            }}
          />
          <IconButton
            color="primary"
            onClick={handleSendMessage}
            disabled={!inputMessage.trim() || isLoading}
            sx={{
              ml: 1,
              p: 1.5,
              bgcolor: theme.palette.primary.main,
              color: 'white',
              '&:hover': {
                bgcolor: theme.palette.primary.dark,
              },
              '&:disabled': {
                bgcolor: theme.palette.action.disabled,
              },
            }}
          >
            <SendIcon />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

export default ChatInterface;
