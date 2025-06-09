import React, { useState } from 'react';
import { 
  Container, 
  Paper, 
  Typography, 
  Button, 
  Box,
  Grid,
  Card,
  CardContent,
  CardActions,
  useTheme,
  alpha
} from '@mui/material';
import MBTITest from './components/MBTITest';
import DISCTest from './components/DISCTest';
import RIASECTest from './components/RIASECTest';
import CliftonStrengthsTest from './components/CliftonStrengthsTest';

function App() {
  const [activeTest, setActiveTest] = useState(null);
  const theme = useTheme();

  const tests = [
    {
      id: 'mbti',
      title: 'MBTI Personality Test',
      description: 'Discover your personality type based on the Myers-Briggs Type Indicator',
      duration: '5-10 minutes',
      color: '#2196f3'
    },
    {
      id: 'disc',
      title: 'DISC Assessment',
      description: 'Understand your behavioral style and how you interact with others at work',
      duration: '5-10 minutes',
      color: '#4caf50'
    },
    {
      id: 'riasec',
      title: 'RIASEC Career Test',
      description: 'Discover your career interests and find suitable career paths based on the Holland Code',
      duration: '5-10 minutes',
      color: '#9c27b0'
    },
    {
      id: 'clifton',
      title: 'CliftonStrengths',
      description: 'Identify your top 5 natural talents and discover how to leverage them in your career',
      duration: '5-10 minutes',
      color: '#ff9800'
    }
  ];

  if (activeTest === 'mbti') {
    return <MBTITest onBack={() => setActiveTest(null)} />;
  }

  if (activeTest === 'disc') {
    return <DISCTest onBack={() => setActiveTest(null)} />;
  }

  if (activeTest === 'riasec') {
    return <RIASECTest onBack={() => setActiveTest(null)} />;
  }

  if (activeTest === 'clifton') {
    return <CliftonStrengthsTest onBack={() => setActiveTest(null)} />;
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.1)} 0%, ${alpha(theme.palette.secondary.main, 0.1)} 100%)`,
        py: 4
      }}
    >
      <Container maxWidth="md">
        <Paper 
          elevation={3} 
          sx={{ 
            p: 4, 
            textAlign: 'center', 
            mb: 4,
            background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.05)} 0%, ${alpha(theme.palette.secondary.main, 0.05)} 100%)`,
            borderRadius: 2
          }}
        >
          <Typography 
            variant="h3" 
            gutterBottom
            sx={{
              fontWeight: 700,
              background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
              backgroundClip: 'text',
              textFillColor: 'transparent',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            Personality Tests
          </Typography>
          <Typography 
            variant="h6" 
            color="text.secondary" 
            paragraph
            sx={{ maxWidth: '600px', mx: 'auto' }}
          >
            Discover more about yourself through our collection of personality tests
          </Typography>
        </Paper>

        <Grid container spacing={3}>
          {tests.map((test) => (
            <Grid item xs={12} md={6} key={test.id}>
              <Card 
                sx={{ 
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: 6
                  }
                }}
              >
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography 
                    variant="h5" 
                    gutterBottom
                    sx={{ 
                      fontWeight: 600,
                      color: test.color
                    }}
                  >
                    {test.title}
                  </Typography>
                  <Typography 
                    variant="body1" 
                    color="text.secondary" 
                    paragraph
                  >
                    {test.description}
                  </Typography>
                  <Typography 
                    variant="body2" 
                    color="text.secondary"
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1
                    }}
                  >
                    <Box
                      component="span"
                      sx={{
                        width: 8,
                        height: 8,
                        borderRadius: '50%',
                        bgcolor: test.color,
                        display: 'inline-block'
                      }}
                    />
                    Duration: {test.duration}
                  </Typography>
                </CardContent>
                <CardActions sx={{ p: 2, pt: 0 }}>
                  <Button 
                    variant="contained" 
                    fullWidth 
                    onClick={() => setActiveTest(test.id)}
                    sx={{
                      py: 1.5,
                      background: `linear-gradient(135deg, ${test.color} 0%, ${alpha(test.color, 0.8)} 100%)`,
                      '&:hover': {
                        background: `linear-gradient(135deg, ${alpha(test.color, 0.9)} 0%, ${alpha(test.color, 0.7)} 100%)`
                      }
                    }}
                  >
                    Start Test
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

export default App; 