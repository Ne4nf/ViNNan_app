import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Chip,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
} from '@mui/material';
import {
  LocalHospital as MedicalIcon,
  Info as InfoIcon,
  Warning as WarningIcon,
  CheckCircle as CheckIcon,
} from '@mui/icons-material';

const AboutDialog = ({ open, onClose }) => {
  const features = [
    {
      icon: <MedicalIcon color="primary" />,
      title: 'Chuẩn đoán thông minh',
      description: 'Hỗ trợ chuẩn đoán dựa trên triệu chứng bằng AI',
    },
    {
      icon: <InfoIcon color="primary" />,
      title: 'Truy xuất thông tin y tế',
      description: 'Tìm kiếm thông tin chi tiết về các bệnh',
    },
    {
      icon: <CheckIcon color="primary" />,
      title: 'Hỗ trợ tiếng Việt',
      description: 'Giao tiếp hoàn toàn bằng tiếng Việt',
    },
  ];

  const technologies = [
    'React', 'Material-UI', 'FastAPI', 'LangChain', 
    'OpenAI', 'Qdrant', 'Python', 'JavaScript'
  ];

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: { borderRadius: 3 }
      }}
    >
      <DialogTitle sx={{ pb: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <MedicalIcon sx={{ mr: 1, color: 'primary.main' }} />
          <Typography variant="h5" component="div" sx={{ fontWeight: 'bold' }}>
            ViMedical
          </Typography>
        </Box>
        <Typography variant="subtitle1" color="text.secondary">
          Trợ lý Y Tế Thông minh - Phiên bản 1.0
        </Typography>
      </DialogTitle>

      <DialogContent>
        <Box sx={{ mb: 3 }}>
          <Typography variant="body1" paragraph>
            ViMedical là một hệ thống trợ lý y tế thông minh sử dụng công nghệ AI tiên tiến 
            để hỗ trợ chuẩn đoán bệnh và truy xuất thông tin y tế bằng tiếng Việt.
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <WarningIcon sx={{ mr: 1, color: 'warning.main' }} />
            <Typography variant="body2" color="warning.main" sx={{ fontWeight: 'medium' }}>
              Lưu ý: Thông tin chỉ mang tính chất tham khảo, không thay thế ý kiến bác sĩ
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ my: 2 }} />

        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
            Tính năng chính
          </Typography>
          <List>
            {features.map((feature, index) => (
              <ListItem key={index} sx={{ py: 1 }}>
                <ListItemIcon>
                  {feature.icon}
                </ListItemIcon>
                <ListItemText
                  primary={feature.title}
                  secondary={feature.description}
                />
              </ListItem>
            ))}
          </List>
        </Box>

        <Divider sx={{ my: 2 }} />

        <Box>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
            Công nghệ sử dụng
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {technologies.map((tech, index) => (
              <Chip
                key={index}
                label={tech}
                variant="outlined"
                size="small"
                color="primary"
              />
            ))}
          </Box>
        </Box>

        <Box sx={{ mt: 3, p: 2, bgcolor: 'grey.50', borderRadius: 2 }}>
          <Typography variant="body2" color="text.secondary">
            Phát triển bởi đội ngũ ViMedical Team<br />
            © 2025 All rights reserved
          </Typography>
        </Box>
      </DialogContent>

      <DialogActions sx={{ p: 2 }}>
        <Button onClick={onClose} variant="contained" color="primary">
          Đóng
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AboutDialog;
