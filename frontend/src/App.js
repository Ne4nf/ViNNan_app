import React, { useState, useEffect } from 'react';
import {
  Box,
  CssBaseline,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  useTheme,
  useMediaQuery,
  ThemeProvider,
  createTheme,
  Alert,
  Snackbar,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Brightness4 as DarkModeIcon,
  Brightness7 as LightModeIcon,
} from '@mui/icons-material';
import ChatInterface from './components/ChatInterface';
import Sidebar from './components/Sidebar';
import chatService from './services/chatService';
import { v4 as uuidv4 } from 'uuid';

const DRAWER_WIDTH = 280;

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    // Load theme preference from localStorage
    const savedTheme = localStorage.getItem('vimedical_dark_mode');
    return savedTheme ? JSON.parse(savedTheme) : false;
  });
  const [currentSessionId, setCurrentSessionId] = useState(null);
  const [chatSessions, setChatSessions] = useState([]);
  const [error, setError] = useState(null);
  const [isOnline, setIsOnline] = useState(true);

  // Save theme preference to localStorage
  useEffect(() => {
    localStorage.setItem('vimedical_dark_mode', JSON.stringify(darkMode));
    // Apply theme to body
    document.body.setAttribute('data-theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: {
        main: '#1E88E5',
        light: '#64B5F6',
        dark: '#1565C0',
      },
      secondary: {
        main: '#FF7043',
        light: '#FFAB91',
        dark: '#E64A19',
      },
      background: {
        default: darkMode ? '#0a0a0a' : '#f5f5f5',
        paper: darkMode ? '#1a1a1a' : '#ffffff',
      },
      text: {
        primary: darkMode ? '#ffffff' : '#000000',
        secondary: darkMode ? '#b0b0b0' : '#666666',
      },
    },
    typography: {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      h6: {
        fontWeight: 600,
      },
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            scrollbarWidth: 'thin',
            '&::-webkit-scrollbar': {
              width: '8px',
            },
            '&::-webkit-scrollbar-track': {
              background: darkMode ? '#2b2b2b' : '#f1f1f1',
            },
            '&::-webkit-scrollbar-thumb': {
              background: darkMode ? '#555' : '#888',
              borderRadius: '4px',
            },
            '&::-webkit-scrollbar-thumb:hover': {
              background: darkMode ? '#777' : '#666',
            },
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: 'none',
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundColor: darkMode ? '#1a1a1a' : '#1E88E5',
          },
        },
      },
    },
  });

  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    // Check backend health on startup
    checkBackendHealth();
  }, []);

  const checkBackendHealth = async () => {
    try {
      await chatService.healthCheck();
      setIsOnline(true);
    } catch (error) {
      setIsOnline(false);
      setError('Không thể kết nối với server. Vui lòng kiểm tra lại.');
    }
  };

  const handleToggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleToggleTheme = () => {
    setDarkMode(!darkMode);
  };

  const handleNewChat = () => {
    const newSessionId = uuidv4();
    setCurrentSessionId(newSessionId);
    setChatSessions(prev => [
      {
        id: newSessionId,
        title: `Phiên ${chatSessions.length + 1}`,
        lastMessage: 'Bắt đầu trò chuyện...',
        createdAt: new Date(),
      },
      ...prev,
    ]);
    if (isMobile) {
      setSidebarOpen(false);
    }
  };

  const handleSessionSelect = (sessionId) => {
    setCurrentSessionId(sessionId);
    if (isMobile) {
      setSidebarOpen(false);
    }
  };

  const handleSessionCreate = (sessionId) => {
    setCurrentSessionId(sessionId);
    if (!chatSessions.find(s => s.id === sessionId)) {
      setChatSessions(prev => [
        {
          id: sessionId,
          title: `Phiên ${chatSessions.length + 1}`,
          lastMessage: 'Bắt đầu trò chuyện...',
          createdAt: new Date(),
        },
        ...prev,
      ]);
    }
  };

  const handleCloseError = () => {
    setError(null);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', height: '100vh' }}>
        {/* App Bar */}
        <AppBar
          position="fixed"
          sx={{
            zIndex: theme.zIndex.drawer + 1,
            ...(sidebarOpen && !isMobile && {
              ml: `${DRAWER_WIDTH}px`,
              width: `calc(100% - ${DRAWER_WIDTH}px)`,
            }),
          }}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleToggleSidebar}
              edge="start"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
              ViMedical - Trợ lý Y Tế Thông minh
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              {!isOnline && (
                <Alert
                  severity="warning"
                  sx={{ mr: 2, py: 0 }}
                  variant="filled"
                  size="small"
                >
                  Offline
                </Alert>
              )}
              <IconButton color="inherit" onClick={handleToggleTheme}>
                {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>

        {/* Sidebar */}
        <Sidebar
          open={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          onNewChat={handleNewChat}
          chatSessions={chatSessions}
          currentSessionId={currentSessionId}
          onSessionSelect={handleSessionSelect}
          darkMode={darkMode}
          onToggleDarkMode={handleToggleTheme}
        />

        {/* Main Content */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'column',
            height: '100vh',
            ...(sidebarOpen && !isMobile && {
              ml: `${DRAWER_WIDTH}px`,
              width: `calc(100% - ${DRAWER_WIDTH}px)`,
            }),
          }}
        >
          <Toolbar /> {/* Spacer for AppBar */}
          <ChatInterface
            sessionId={currentSessionId}
            onSessionCreate={handleSessionCreate}
          />
        </Box>

        {/* Error Snackbar */}
        <Snackbar
          open={!!error}
          autoHideDuration={6000}
          onClose={handleCloseError}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert
            onClose={handleCloseError}
            severity="error"
            sx={{ width: '100%' }}
          >
            {error}
          </Alert>
        </Snackbar>
      </Box>
    </ThemeProvider>
  );
}

export default App;
