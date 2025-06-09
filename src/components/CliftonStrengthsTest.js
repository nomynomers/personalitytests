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
  Grid,
  Chip
} from '@mui/material';

const questions = [
  {
    id: 1,
    text: "I am energized by helping others achieve their goals",
    strength: "Developer"
  },
  {
    id: 2,
    text: "I naturally see patterns and connections between ideas",
    strength: "Strategic"
  },
  {
    id: 3,
    text: "I am good at bringing people together and building relationships",
    strength: "Relator"
  },
  {
    id: 4,
    text: "I enjoy taking charge and making decisions",
    strength: "Command"
  },
  {
    id: 5,
    text: "I am skilled at finding the right words to express ideas",
    strength: "Communication"
  },
  {
    id: 6,
    text: "I am naturally curious and love to learn",
    strength: "Learner"
  },
  {
    id: 7,
    text: "I am good at understanding others' feelings and perspectives",
    strength: "Empathy"
  },
  {
    id: 8,
    text: "I enjoy solving complex problems",
    strength: "Analytical"
  },
  {
    id: 9,
    text: "I am good at organizing and planning",
    strength: "Arranger"
  },
  {
    id: 10,
    text: "I am naturally optimistic and see possibilities",
    strength: "Positivity"
  },
  {
    id: 11,
    text: "I am good at adapting to change",
    strength: "Adaptability"
  },
  {
    id: 12,
    text: "I enjoy taking risks and trying new things",
    strength: "Activator"
  }
];

const strengths = {
  Developer: {
    description: "You see the potential in others and enjoy helping them grow and develop.",
    talents: [
      "Identifying potential in others",
      "Providing constructive feedback",
      "Creating growth opportunities",
      "Celebrating progress",
      "Building confidence in others"
    ],
    careerPaths: [
      "Mentor or Coach",
      "Teacher or Trainer",
      "Human Resources",
      "Leadership Development",
      "Career Counselor"
    ],
    workEnvironment: "Collaborative, growth-oriented, supportive"
  },
  Strategic: {
    description: "You create alternative ways to proceed and can quickly spot relevant patterns and issues.",
    talents: [
      "Pattern recognition",
      "Scenario planning",
      "Problem-solving",
      "Decision-making",
      "Long-term thinking"
    ],
    careerPaths: [
      "Strategic Planner",
      "Business Analyst",
      "Project Manager",
      "Consultant",
      "Entrepreneur"
    ],
    workEnvironment: "Analytical, forward-thinking, problem-solving"
  },
  Relator: {
    description: "You enjoy close relationships with others and find deep satisfaction in working hard with friends to achieve a goal.",
    talents: [
      "Building relationships",
      "Team collaboration",
      "Trust building",
      "Networking",
      "Conflict resolution"
    ],
    careerPaths: [
      "Relationship Manager",
      "Team Leader",
      "Sales Professional",
      "Customer Success Manager",
      "Community Manager"
    ],
    workEnvironment: "Collaborative, relationship-focused, team-oriented"
  },
  Command: {
    description: "You take charge and make decisions. You have presence and can take control of a situation.",
    talents: [
      "Decision-making",
      "Leadership",
      "Taking initiative",
      "Handling pressure",
      "Direct communication"
    ],
    careerPaths: [
      "Executive",
      "Project Manager",
      "Team Leader",
      "Entrepreneur",
      "Military Officer"
    ],
    workEnvironment: "Leadership opportunities, decision-making, high-stakes"
  },
  Communication: {
    description: "You find it easy to put your thoughts into words and are a good conversationalist and presenter.",
    talents: [
      "Public speaking",
      "Storytelling",
      "Written communication",
      "Presentation skills",
      "Influencing others"
    ],
    careerPaths: [
      "Public Relations",
      "Marketing",
      "Journalist",
      "Speaker",
      "Content Creator"
    ],
    workEnvironment: "Communication-focused, presentation opportunities, creative"
  },
  Learner: {
    description: "You have a great desire to learn and want to continuously improve.",
    talents: [
      "Continuous learning",
      "Knowledge acquisition",
      "Skill development",
      "Research",
      "Teaching others"
    ],
    careerPaths: [
      "Researcher",
      "Academic",
      "Training Specialist",
      "Content Developer",
      "Knowledge Manager"
    ],
    workEnvironment: "Learning opportunities, research-oriented, growth-focused"
  },
  Empathy: {
    description: "You can sense the feelings of other people by imagining themselves in others' lives or situations.",
    talents: [
      "Understanding others",
      "Emotional intelligence",
      "Active listening",
      "Conflict resolution",
      "Supporting others"
    ],
    careerPaths: [
      "Counselor",
      "Social Worker",
      "Healthcare Professional",
      "Customer Service",
      "Human Resources"
    ],
    workEnvironment: "People-oriented, supportive, emotionally intelligent"
  },
  Analytical: {
    description: "You search for reasons and causes and have the ability to think about all the factors that might affect a situation.",
    talents: [
      "Data analysis",
      "Problem-solving",
      "Critical thinking",
      "Research",
      "Decision-making"
    ],
    careerPaths: [
      "Data Analyst",
      "Research Scientist",
      "Business Analyst",
      "Financial Analyst",
      "Quality Assurance"
    ],
    workEnvironment: "Analytical, data-driven, research-oriented"
  },
  Arranger: {
    description: "You can organize and figure out how all the pieces and resources can be arranged for maximum productivity.",
    talents: [
      "Organization",
      "Resource management",
      "Process improvement",
      "Project planning",
      "Team coordination"
    ],
    careerPaths: [
      "Project Manager",
      "Operations Manager",
      "Event Planner",
      "Logistics Manager",
      "Office Manager"
    ],
    workEnvironment: "Organized, process-oriented, planning-focused"
  },
  Positivity: {
    description: "You are generous with praise, quick to smile, and always on the lookout for the positive in the situation.",
    talents: [
      "Motivating others",
      "Creating enthusiasm",
      "Building morale",
      "Finding opportunities",
      "Maintaining optimism"
    ],
    careerPaths: [
      "Motivational Speaker",
      "Team Leader",
      "Sales Professional",
      "Customer Success",
      "Human Resources"
    ],
    workEnvironment: "Positive, energetic, people-oriented"
  },
  Adaptability: {
    description: "You prefer to go with the flow and tend to be 'now' people who take things as they come.",
    talents: [
      "Handling change",
      "Flexibility",
      "Quick thinking",
      "Problem-solving",
      "Stress management"
    ],
    careerPaths: [
      "Consultant",
      "Project Manager",
      "Emergency Services",
      "Travel Industry",
      "Startup Employee"
    ],
    workEnvironment: "Dynamic, changing, flexible"
  },
  Activator: {
    description: "You can make things happen by turning thoughts into action and often feel impatient for action.",
    talents: [
      "Taking initiative",
      "Implementation",
      "Risk-taking",
      "Decision-making",
      "Getting results"
    ],
    careerPaths: [
      "Entrepreneur",
      "Project Manager",
      "Sales Professional",
      "Startup Founder",
      "Change Manager"
    ],
    workEnvironment: "Action-oriented, results-driven, entrepreneurial"
  }
};

function CliftonStrengthsTest({ onBack }) {
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
    const scores = {};
    Object.entries(answers).forEach(([questionId, answer]) => {
      const question = questions.find(q => q.id === parseInt(questionId));
      if (question && answer === 'true') {
        scores[question.strength] = (scores[question.strength] || 0) + 1;
      }
    });
    
    // Sort strengths by score
    const sortedStrengths = Object.entries(scores)
      .sort(([,a], [,b]) => b - a)
      .map(([strength]) => strength);
    
    return {
      scores,
      topStrengths: sortedStrengths.slice(0, 5)
    };
  };

  if (showResults) {
    const { scores, topStrengths } = calculateResults();
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
            Your Top 5 CliftonStrengths
          </Typography>

          <Box sx={{ mb: 4, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            {topStrengths.map((strength, index) => (
              <Chip
                key={strength}
                label={`${index + 1}. ${strength}`}
                color="primary"
                sx={{ 
                  fontSize: '1.1rem',
                  py: 2,
                  px: 1
                }}
              />
            ))}
          </Box>
          
          {topStrengths.map((strength, index) => (
            <Box key={strength} sx={{ mb: 4 }}>
              <Typography 
                variant="h5" 
                gutterBottom
                sx={{ 
                  color: theme.palette.primary.main,
                  fontWeight: 600
                }}
              >
                {index + 1}. {strength}
              </Typography>
              <Typography variant="body1" paragraph>
                {strengths[strength].description}
              </Typography>
              
              <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                  <Typography variant="h6" gutterBottom>
                    Natural Talents
                  </Typography>
                  <Box component="ul" sx={{ pl: 2 }}>
                    {strengths[strength].talents.map((talent, i) => (
                      <Typography component="li" key={i} paragraph>
                        {talent}
                      </Typography>
                    ))}
                  </Box>
                </Grid>
                
                <Grid item xs={12} md={4}>
                  <Typography variant="h6" gutterBottom>
                    Career Paths
                  </Typography>
                  <Box component="ul" sx={{ pl: 2 }}>
                    {strengths[strength].careerPaths.map((career, i) => (
                      <Typography component="li" key={i} paragraph>
                        {career}
                      </Typography>
                    ))}
                  </Box>
                </Grid>
                
                <Grid item xs={12} md={4}>
                  <Typography variant="h6" gutterBottom>
                    Ideal Work Environment
                  </Typography>
                  <Typography variant="body1">
                    {strengths[strength].workEnvironment}
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
          CliftonStrengths Assessment
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

export default CliftonStrengthsTest; 