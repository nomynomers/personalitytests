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
  LinearProgress,
  useTheme,
  alpha,
  Grid
} from '@mui/material';

const questions = [
  {
    id: 1,
    text: "I enjoy working with tools and machines",
    type: "R"
  },
  {
    id: 2,
    text: "I like to solve complex problems",
    type: "I"
  },
  {
    id: 3,
    text: "I enjoy creating art or music",
    type: "A"
  },
  {
    id: 4,
    text: "I like helping others learn and grow",
    type: "S"
  },
  {
    id: 5,
    text: "I enjoy persuading others to see my point of view",
    type: "E"
  },
  {
    id: 6,
    text: "I prefer following a set routine",
    type: "C"
  },
  {
    id: 7,
    text: "I like working outdoors",
    type: "R"
  },
  {
    id: 8,
    text: "I enjoy reading scientific articles",
    type: "I"
  },
  {
    id: 9,
    text: "I like expressing myself creatively",
    type: "A"
  },
  {
    id: 10,
    text: "I enjoy working with people",
    type: "S"
  },
  {
    id: 11,
    text: "I like taking on leadership roles",
    type: "E"
  },
  {
    id: 12,
    text: "I enjoy organizing and maintaining records",
    type: "C"
  }
];

const riasecTypes = {
  R: {
    title: "Realistic",
    description: "You are practical, physical, and hands-on. You enjoy working with things, machines, tools, and nature.",
    characteristics: [
      "Practical and mechanical",
      "Good with hands and tools",
      "Prefers concrete tasks",
      "Enjoys outdoor work",
      "Values physical strength and coordination"
    ],
    careers: [
      "Engineer",
      "Architect",
      "Construction Manager",
      "Mechanic",
      "Farmer",
      "Electrician",
      "Carpenter",
      "Surveyor"
    ],
    workEnvironment: "Structured, clear guidelines, physical work, outdoor settings"
  },
  I: {
    title: "Investigative",
    description: "You are analytical, intellectual, and scientific. You enjoy working with ideas and solving complex problems.",
    characteristics: [
      "Analytical and logical",
      "Enjoys research and investigation",
      "Prefers working independently",
      "Values knowledge and understanding",
      "Good at solving complex problems"
    ],
    careers: [
      "Scientist",
      "Researcher",
      "Data Analyst",
      "Software Developer",
      "Mathematician",
      "Doctor",
      "Psychologist",
      "Engineer"
    ],
    workEnvironment: "Research-oriented, analytical, independent work, intellectual challenges"
  },
  A: {
    title: "Artistic",
    description: "You are creative, original, and independent. You enjoy working with ideas and creating new things.",
    characteristics: [
      "Creative and imaginative",
      "Expressive and original",
      "Prefers unstructured work",
      "Values self-expression",
      "Enjoys creating and designing"
    ],
    careers: [
      "Graphic Designer",
      "Musician",
      "Writer",
      "Architect",
      "Interior Designer",
      "Fashion Designer",
      "Photographer",
      "Art Director"
    ],
    workEnvironment: "Creative, flexible, expressive, non-traditional"
  },
  S: {
    title: "Social",
    description: "You are helpful, cooperative, and supportive. You enjoy working with people and helping others.",
    characteristics: [
      "Empathetic and understanding",
      "Good at teaching and helping others",
      "Enjoys working in teams",
      "Values relationships",
      "Strong communication skills"
    ],
    careers: [
      "Teacher",
      "Counselor",
      "Social Worker",
      "Nurse",
      "Human Resources",
      "Therapist",
      "Coach",
      "Customer Service"
    ],
    workEnvironment: "People-oriented, collaborative, supportive, interactive"
  },
  E: {
    title: "Enterprising",
    description: "You are persuasive, leadership-oriented, and energetic. You enjoy working with people and influencing others.",
    characteristics: [
      "Persuasive and confident",
      "Leadership abilities",
      "Enjoys taking risks",
      "Values achievement and recognition",
      "Good at motivating others"
    ],
    careers: [
      "Business Manager",
      "Sales Representative",
      "Entrepreneur",
      "Marketing Manager",
      "Lawyer",
      "Real Estate Agent",
      "Public Relations",
      "Executive"
    ],
    workEnvironment: "Dynamic, results-oriented, leadership opportunities, competitive"
  },
  C: {
    title: "Conventional",
    description: "You are organized, detail-oriented, and systematic. You enjoy working with data and following procedures.",
    characteristics: [
      "Organized and systematic",
      "Detail-oriented",
      "Prefers structured work",
      "Values order and accuracy",
      "Good at following procedures"
    ],
    careers: [
      "Accountant",
      "Administrative Manager",
      "Financial Analyst",
      "Quality Control",
      "Data Entry",
      "Banking",
      "Insurance",
      "Office Manager"
    ],
    workEnvironment: "Structured, organized, clear procedures, systematic"
  }
};

function RIASECTest({ onBack }) {
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
    const scores = { R: 0, I: 0, A: 0, S: 0, E: 0, C: 0 };
    Object.entries(answers).forEach(([questionId, answer]) => {
      const question = questions.find(q => q.id === parseInt(questionId));
      if (question && answer === 'true') {
        scores[question.type]++;
      }
    });
    
    // Sort types by score
    const sortedTypes = Object.entries(scores)
      .sort(([,a], [,b]) => b - a)
      .map(([type]) => type);
    
    return {
      scores,
      topTypes: sortedTypes.slice(0, 3)
    };
  };

  if (showResults) {
    const { scores, topTypes } = calculateResults();
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
            Your Holland Code: {topTypes.join('')}
          </Typography>

          <Typography variant="body1" paragraph sx={{ mb: 4 }}>
            Your top three interest areas are shown below. These represent your primary career interests
            and the types of work environments where you might thrive.
          </Typography>
          
          {topTypes.map((type, index) => (
            <Box key={type} sx={{ mb: 4 }}>
              <Typography 
                variant="h5" 
                gutterBottom
                sx={{ 
                  color: theme.palette.primary.main,
                  fontWeight: 600
                }}
              >
                {index + 1}. {riasecTypes[type].title}
              </Typography>
              <Typography variant="body1" paragraph>
                {riasecTypes[type].description}
              </Typography>
              
              <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                  <Typography variant="h6" gutterBottom>
                    Characteristics
                  </Typography>
                  <Box component="ul" sx={{ pl: 2 }}>
                    {riasecTypes[type].characteristics.map((char, i) => (
                      <Typography component="li" key={i} paragraph>
                        {char}
                      </Typography>
                    ))}
                  </Box>
                </Grid>
                
                <Grid item xs={12} md={4}>
                  <Typography variant="h6" gutterBottom>
                    Career Options
                  </Typography>
                  <Box component="ul" sx={{ pl: 2 }}>
                    {riasecTypes[type].careers.map((career, i) => (
                      <Typography component="li" key={i} paragraph>
                        {career}
                      </Typography>
                    ))}
                  </Box>
                </Grid>
                
                <Grid item xs={12} md={4}>
                  <Typography variant="h6" gutterBottom>
                    Work Environment
                  </Typography>
                  <Typography variant="body1">
                    {riasecTypes[type].workEnvironment}
                  </Typography>
                </Grid>
              </Grid>
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
          RIASEC Career Interest Test
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
            <FormControlLabel
              value="true"
              control={<Radio />}
              label="Yes, this describes me"
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
            <FormControlLabel
              value="false"
              control={<Radio />}
              label="No, this doesn't describe me"
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

export default RIASECTest; 