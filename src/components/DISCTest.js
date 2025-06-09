import React, { useState } from 'react';
import { 
  Container, 
  Paper, 
  Typography, 
  Button, 
  Box,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  CircularProgress,
  useTheme,
  alpha,
  Fade,
  LinearProgress
} from '@mui/material';

const questions = [
  {
    id: 1,
    text: "When working in a team, I prefer to:",
    options: [
      { value: "D", text: "Take charge and make decisions quickly" },
      { value: "I", text: "Build relationships and create enthusiasm" },
      { value: "S", text: "Support others and maintain harmony" },
      { value: "C", text: "Analyze data and ensure accuracy" }
    ]
  },
  {
    id: 2,
    text: "In a challenging situation, I tend to:",
    options: [
      { value: "D", text: "Face it head-on and push for results" },
      { value: "I", text: "Look for creative solutions and involve others" },
      { value: "S", text: "Consider everyone's feelings and find a compromise" },
      { value: "C", text: "Gather all facts before making a decision" }
    ]
  },
  {
    id: 3,
    text: "When communicating, I usually:",
    options: [
      { value: "D", text: "Get straight to the point" },
      { value: "I", text: "Share stories and engage others" },
      { value: "S", text: "Listen carefully and show empathy" },
      { value: "C", text: "Provide detailed and accurate information" }
    ]
  },
  {
    id: 4,
    text: "My work style is best described as:",
    options: [
      { value: "D", text: "Fast-paced and results-oriented" },
      { value: "I", text: "Collaborative and innovative" },
      { value: "S", text: "Steady and supportive" },
      { value: "C", text: "Precise and systematic" }
    ]
  },
  {
    id: 5,
    text: "When making decisions, I typically:",
    options: [
      { value: "D", text: "Trust my instincts and act quickly" },
      { value: "I", text: "Consider how it will affect people" },
      { value: "S", text: "Seek input from others" },
      { value: "C", text: "Analyze all options thoroughly" }
    ]
  }
];

const discTypes = {
  D: {
    title: "Dominance",
    description: "You are direct, decisive, and results-oriented. You prefer to take charge and make quick decisions.",
    strengths: [
      "Natural leader who takes initiative",
      "Direct and straightforward communication",
      "Results-driven and goal-oriented",
      "Confident decision-maker",
      "Handles pressure well"
    ],
    opportunities: [
      "Practice active listening",
      "Consider others' perspectives more",
      "Be more patient with process",
      "Show more appreciation for others' contributions",
      "Balance assertiveness with diplomacy"
    ]
  },
  I: {
    title: "Influence",
    description: "You are enthusiastic, optimistic, and people-oriented. You excel at building relationships and creating excitement.",
    strengths: [
      "Excellent at building relationships",
      "Natural motivator and encourager",
      "Creative problem-solver",
      "Great at networking",
      "Positive and optimistic outlook"
    ],
    opportunities: [
      "Focus more on details and follow-through",
      "Be more direct in communication",
      "Balance enthusiasm with practicality",
      "Follow through on commitments",
      "Consider data and facts more carefully"
    ]
  },
  S: {
    title: "Steadiness",
    description: "You are patient, reliable, and team-oriented. You value harmony and prefer a steady, predictable environment.",
    strengths: [
      "Excellent team player",
      "Patient and supportive",
      "Reliable and consistent",
      "Good listener and mediator",
      "Maintains calm under pressure"
    ],
    opportunities: [
      "Take more initiative",
      "Express opinions more directly",
      "Embrace change more readily",
      "Set boundaries when needed",
      "Take on leadership roles"
    ]
  },
  C: {
    title: "Conscientiousness",
    description: "You are analytical, precise, and quality-oriented. You value accuracy and prefer to work with facts and data.",
    strengths: [
      "Excellent attention to detail",
      "Strong analytical skills",
      "High standards for quality",
      "Thorough and systematic approach",
      "Good at identifying potential problems"
    ],
    opportunities: [
      "Be more flexible with deadlines",
      "Share thoughts and ideas more readily",
      "Balance perfectionism with progress",
      "Consider the human element more",
      "Take more risks when appropriate"
    ]
  }
};

function DISCTest({ onBack }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const theme = useTheme();

  const handleAnswer = (value) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestion]: value
    }));
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      setShowResults(true);
    }
  };

  const handlePrevious = () => {
    setCurrentQuestion(prev => prev - 1);
  };

  const calculateResults = () => {
    const scores = { D: 0, I: 0, S: 0, C: 0 };
    Object.values(answers).forEach(answer => {
      scores[answer]++;
    });
    
    const maxScore = Math.max(...Object.values(scores));
    const dominantTypes = Object.entries(scores)
      .filter(([_, score]) => score === maxScore)
      .map(([type]) => type);
    
    return dominantTypes;
  };

  if (showResults) {
    const dominantTypes = calculateResults();
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Paper 
          elevation={3} 
          sx={{ 
            p: 4,
            background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.05)} 0%, ${alpha(theme.palette.secondary.main, 0.05)} 100%)`,
            borderRadius: 2
          }}
        >
          <Typography 
            variant="h4" 
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
            Your DISC Profile
          </Typography>
          
          {dominantTypes.map((type, index) => (
            <Box key={type} sx={{ mb: 4 }}>
              <Typography 
                variant="h5" 
                gutterBottom
                sx={{ 
                  color: theme.palette.primary.main,
                  fontWeight: 600
                }}
              >
                {discTypes[type].title}
              </Typography>
              <Typography variant="body1" paragraph>
                {discTypes[type].description}
              </Typography>
              
              <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
                Key Strengths
              </Typography>
              <Box component="ul" sx={{ pl: 2 }}>
                {discTypes[type].strengths.map((strength, i) => (
                  <Typography component="li" key={i} paragraph>
                    {strength}
                  </Typography>
                ))}
              </Box>
              
              <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
                Opportunities for Growth
              </Typography>
              <Box component="ul" sx={{ pl: 2 }}>
                {discTypes[type].opportunities.map((opportunity, i) => (
                  <Typography component="li" key={i} paragraph>
                    {opportunity}
                  </Typography>
                ))}
              </Box>
            </Box>
          ))}
          
          <Button 
            variant="contained" 
            onClick={onBack}
            sx={{ mt: 2 }}
          >
            Back to Home
          </Button>
        </Paper>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper 
        elevation={3} 
        sx={{ 
          p: 4,
          background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.05)} 0%, ${alpha(theme.palette.secondary.main, 0.05)} 100%)`,
          borderRadius: 2
        }}
      >
        <Typography 
          variant="h4" 
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
          DISC Assessment
        </Typography>
        
        <LinearProgress 
          variant="determinate" 
          value={(currentQuestion / questions.length) * 100} 
          sx={{ mb: 4, height: 8, borderRadius: 4 }}
        />
        
        <Typography variant="h6" gutterBottom>
          {questions[currentQuestion].text}
        </Typography>
        
        <FormControl component="fieldset" sx={{ width: '100%', mt: 2 }}>
          <RadioGroup
            value={answers[currentQuestion] || ''}
            onChange={(e) => handleAnswer(e.target.value)}
          >
            {questions[currentQuestion].options.map((option) => (
              <FormControlLabel
                key={option.value}
                value={option.value}
                control={<Radio />}
                label={option.text}
                sx={{
                  mb: 2,
                  p: 2,
                  borderRadius: 1,
                  border: '1px solid',
                  borderColor: 'divider',
                  '&:hover': {
                    bgcolor: 'action.hover'
                  }
                }}
              />
            ))}
          </RadioGroup>
        </FormControl>
        
        <Box sx={{ mt: 4, display: 'flex', justifyContent: 'space-between' }}>
          <Button
            variant="outlined"
            onClick={onBack}
            disabled={currentQuestion === 0}
          >
            Back
          </Button>
          <Button
            variant="contained"
            onClick={handleNext}
            disabled={!answers[currentQuestion]}
          >
            {currentQuestion === questions.length - 1 ? 'See Results' : 'Next'}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}

export default DISCTest; 