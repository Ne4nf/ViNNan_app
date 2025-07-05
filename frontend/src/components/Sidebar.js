import React, { useState } from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  Typography,
  Box,
  Divider,
  IconButton,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  Chat as ChatIcon,
  Add as AddIcon,
  History as HistoryIcon,
  Settings as SettingsIcon,
  Info as InfoIcon,
  Menu as MenuIcon,
  Close as CloseIcon,
} from '@mui/icons-material';
import AboutDialog from './AboutDialog';
import SettingsDialog from './SettingsDialog';

const DRAWER_WIDTH = 280;

const Sidebar = ({ 
  open, 
  onClose, 
  onNewChat, 
  chatSessions = [], 
  currentSessionId,
  onSessionSelect,
  darkMode,
  onToggleDarkMode 
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [aboutOpen, setAboutOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  const menuItems = [
    { text: 'Trò chuyện mới', icon: <AddIcon />, action: onNewChat },
    { text: 'Lịch sử', icon: <HistoryIcon />, action: () => {} },
    { text: 'Cài đặt', icon: <SettingsIcon />, action: () => setSettingsOpen(true) },
    { text: 'Thông tin', icon: <InfoIcon />, action: () => setAboutOpen(true) },
  ];

  const drawerContent = (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <Box
        sx={{
          p: 2,
          background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
          color: 'white',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            ViMedical
          </Typography>
          {isMobile && (
            <IconButton onClick={onClose} sx={{ color: 'white' }}>
              <CloseIcon />
            </IconButton>
          )}
        </Box>
        <Typography variant="body2" sx={{ opacity: 0.9, mt: 0.5 }}>
          Trợ lý Y Tế Thông minh
        </Typography>
      </Box>

      {/* Menu Items */}
      <List sx={{ px: 1, py: 2 }}>
        {menuItems.map((item, index) => (
          <ListItem key={index} disablePadding sx={{ mb: 1 }}>
            <ListItemButton
              onClick={item.action}
              sx={{
                borderRadius: 2,
                '&:hover': {
                  bgcolor: theme.palette.action.hover,
                },
              }}
            >
              <ListItemIcon sx={{ color: theme.palette.primary.main }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText 
                primary={item.text}
                primaryTypographyProps={{
                  fontSize: '0.9rem',
                  fontWeight: 500,
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <Divider sx={{ mx: 2 }} />

      {/* Chat Sessions */}
      <Box sx={{ flex: 1, overflow: 'auto' }}>
        <Typography
          variant="subtitle2"
          sx={{
            px: 2,
            py: 1,
            color: theme.palette.text.secondary,
            fontWeight: 'bold',
          }}
        >
          Phiên trò chuyện
        </Typography>
        <List sx={{ px: 1 }}>
          {chatSessions.length === 0 ? (
            <ListItem>
              <ListItemText
                primary="Chưa có phiên trò chuyện nào"
                primaryTypographyProps={{
                  fontSize: '0.8rem',
                  color: theme.palette.text.secondary,
                  fontStyle: 'italic',
                }}
              />
            </ListItem>
          ) : (
            chatSessions.map((session) => (
              <ListItem key={session.id} disablePadding sx={{ mb: 0.5 }}>
                <ListItemButton
                  onClick={() => onSessionSelect(session.id)}
                  selected={currentSessionId === session.id}
                  sx={{
                    borderRadius: 2,
                    '&:hover': {
                      bgcolor: theme.palette.action.hover,
                    },
                    '&.Mui-selected': {
                      bgcolor: theme.palette.primary.light,
                      color: theme.palette.primary.contrastText,
                      '&:hover': {
                        bgcolor: theme.palette.primary.main,
                      },
                    },
                  }}
                >
                  <ListItemIcon sx={{ 
                    color: currentSessionId === session.id ? 'inherit' : theme.palette.action.active 
                  }}>
                    <ChatIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary={session.title || `Phiên ${session.id.slice(0, 8)}`}
                    secondary={session.lastMessage}
                    primaryTypographyProps={{
                      fontSize: '0.85rem',
                      fontWeight: 500,
                    }}
                    secondaryTypographyProps={{
                      fontSize: '0.75rem',
                      noWrap: true,
                    }}
                  />
                </ListItemButton>
              </ListItem>
            ))
          )}
        </List>
      </Box>

      {/* Footer */}
      <Box
        sx={{
          p: 2,
          borderTop: `1px solid ${theme.palette.divider}`,
          bgcolor: theme.palette.background.default,
        }}
      >
        <Typography
          variant="caption"
          sx={{
            color: theme.palette.text.secondary,
            textAlign: 'center',
            display: 'block',
          }}
        >
          © 2025 ViMedical v1.0
        </Typography>
      </Box>
    </Box>
  );

  return (
    <>
      <Drawer
        variant={isMobile ? 'temporary' : 'persistent'}
        open={open}
        onClose={onClose}
        sx={{
          width: DRAWER_WIDTH,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: DRAWER_WIDTH,
            boxSizing: 'border-box',
            borderRight: `1px solid ${theme.palette.divider}`,
          },
        }}
      >
        {drawerContent}
      </Drawer>

      <AboutDialog
        open={aboutOpen}
        onClose={() => setAboutOpen(false)}
      />

      <SettingsDialog
        open={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        darkMode={darkMode}
        onToggleDarkMode={onToggleDarkMode}
      />
    </>
  );
};

export default Sidebar;
