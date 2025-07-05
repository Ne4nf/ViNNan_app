import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Switch,
  Divider,
  Slider,
  TextField,
} from '@mui/material';
import {
  Settings as SettingsIcon,
  Palette as PaletteIcon,
  VolumeUp as VolumeIcon,
  Language as LanguageIcon,
} from '@mui/icons-material';

const SettingsDialog = ({ open, onClose, darkMode, onToggleDarkMode }) => {
  const [language, setLanguage] = useState('vi');
  const [fontSize, setFontSize] = useState(14);
  const [autoSave, setAutoSave] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [maxMessages, setMaxMessages] = useState(100);

  const handleSave = () => {
    // Save settings to localStorage
    const settings = {
      language,
      fontSize,
      autoSave,
      soundEnabled,
      maxMessages,
      darkMode,
    };
    localStorage.setItem('vimedical_settings', JSON.stringify(settings));
    onClose();
  };

  const handleReset = () => {
    setLanguage('vi');
    setFontSize(14);
    setAutoSave(true);
    setSoundEnabled(false);
    setMaxMessages(100);
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: { borderRadius: 3 }
      }}
    >
      <DialogTitle>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <SettingsIcon sx={{ mr: 1, color: 'primary.main' }} />
          <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
            Cài đặt
          </Typography>
        </Box>
      </DialogTitle>

      <DialogContent>
        {/* Theme Settings */}
        <Box sx={{ mb: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <PaletteIcon sx={{ mr: 1, color: 'primary.main' }} />
            <Typography variant="subtitle1" sx={{ fontWeight: 'medium' }}>
              Giao diện
            </Typography>
          </Box>
          <FormControl component="fieldset">
            <FormLabel component="legend">Chế độ hiển thị</FormLabel>
            <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
              <Typography variant="body2">Sáng</Typography>
              <Switch
                checked={darkMode}
                onChange={onToggleDarkMode}
                color="primary"
                sx={{ mx: 1 }}
              />
              <Typography variant="body2">Tối</Typography>
            </Box>
          </FormControl>
        </Box>

        <Divider sx={{ my: 2 }} />

        {/* Language Settings */}
        <Box sx={{ mb: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <LanguageIcon sx={{ mr: 1, color: 'primary.main' }} />
            <Typography variant="subtitle1" sx={{ fontWeight: 'medium' }}>
              Ngôn ngữ
            </Typography>
          </Box>
          <FormControl component="fieldset">
            <RadioGroup
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              row
            >
              <FormControlLabel
                value="vi"
                control={<Radio />}
                label="Tiếng Việt"
              />
              <FormControlLabel
                value="en"
                control={<Radio />}
                label="English"
                disabled
              />
            </RadioGroup>
          </FormControl>
        </Box>

        <Divider sx={{ my: 2 }} />

        {/* Font Size */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 'medium', mb: 2 }}>
            Kích thước chữ
          </Typography>
          <Slider
            value={fontSize}
            onChange={(e, value) => setFontSize(value)}
            min={12}
            max={20}
            step={1}
            marks
            valueLabelDisplay="auto"
            sx={{ mt: 1 }}
          />
          <Typography variant="body2" color="text.secondary">
            Xem trước: <span style={{ fontSize: `${fontSize}px` }}>
              Đây là văn bản mẫu
            </span>
          </Typography>
        </Box>

        <Divider sx={{ my: 2 }} />

        {/* Other Settings */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 'medium', mb: 2 }}>
            Tùy chọn khác
          </Typography>
          
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <VolumeIcon sx={{ mr: 1, color: 'primary.main' }} />
            <Typography variant="body2" sx={{ flexGrow: 1 }}>
              Âm thanh thông báo
            </Typography>
            <Switch
              checked={soundEnabled}
              onChange={(e) => setSoundEnabled(e.target.checked)}
              color="primary"
            />
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Typography variant="body2" sx={{ flexGrow: 1 }}>
              Tự động lưu cuộc trò chuyện
            </Typography>
            <Switch
              checked={autoSave}
              onChange={(e) => setAutoSave(e.target.checked)}
              color="primary"
            />
          </Box>

          <TextField
            label="Số tin nhắn tối đa"
            type="number"
            value={maxMessages}
            onChange={(e) => setMaxMessages(parseInt(e.target.value))}
            inputProps={{ min: 50, max: 500 }}
            size="small"
            sx={{ mt: 1 }}
          />
        </Box>
      </DialogContent>

      <DialogActions sx={{ p: 2 }}>
        <Button onClick={handleReset} color="secondary">
          Đặt lại
        </Button>
        <Button onClick={onClose} color="inherit">
          Hủy
        </Button>
        <Button onClick={handleSave} variant="contained" color="primary">
          Lưu
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SettingsDialog;
