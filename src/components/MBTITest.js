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
    question: "In a team meeting, you prefer to:",
    options: [
      { text: "Actively participate and share your ideas with the group", type: "E" },
      { text: "Listen carefully and share your thoughts one-on-one later", type: "I" }
    ]
  },
  {
    id: 2,
    question: "When solving work problems, you tend to:",
    options: [
      { text: "Focus on concrete facts and proven methods", type: "S" },
      { text: "Consider innovative approaches and future possibilities", type: "N" }
    ]
  },
  {
    id: 3,
    question: "In your work environment, you value:",
    options: [
      { text: "Clear procedures and established ways of doing things", type: "S" },
      { text: "Flexibility and new ways of approaching tasks", type: "N" }
    ]
  },
  {
    id: 4,
    question: "When making decisions at work, you primarily rely on:",
    options: [
      { text: "Logical analysis and objective criteria", type: "T" },
      { text: "How it will affect people and team harmony", type: "F" }
    ]
  },
  {
    id: 5,
    question: "When giving feedback to colleagues, you tend to:",
    options: [
      { text: "Focus on facts and what needs to be improved", type: "T" },
      { text: "Consider their feelings and maintain positive relationships", type: "F" }
    ]
  },
  {
    id: 6,
    question: "In your work schedule, you prefer:",
    options: [
      { text: "Having a structured plan with clear deadlines", type: "J" },
      { text: "Keeping options open and adapting as needed", type: "P" }
    ]
  },
  {
    id: 7,
    question: "When working on projects, you:",
    options: [
      { text: "Like to have clear goals and finish tasks early", type: "J" },
      { text: "Keep exploring options and make final decisions later", type: "P" }
    ]
  }
];

function MBTITest({ onBack }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [loading, setLoading] = useState(false);
  const theme = useTheme();

  const handleAnswer = (type) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestion]: type
    }));
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      setLoading(true);
      setTimeout(() => {
        setShowResults(true);
        setLoading(false);
      }, 1000);
    }
  };

  const calculateType = () => {
    const counts = {
      E: 0, I: 0,
      S: 0, N: 0,
      T: 0, F: 0,
      J: 0, P: 0
    };

    Object.values(answers).forEach(type => {
      counts[type]++;
    });

    return [
      counts.E > counts.I ? 'E' : 'I',
      counts.S > counts.N ? 'S' : 'N',
      counts.T > counts.F ? 'T' : 'F',
      counts.J > counts.P ? 'J' : 'P'
    ].join('');
  };

  const getTypeDescription = (type) => {
    const typeInfo = {
      'ISTJ': {
        title: 'The Organizer',
        description: 'Practical, responsible, and detail-oriented professional who excels in structured environments.',
        strengths: [
          'Excellent at creating and maintaining organized systems',
          'Highly reliable and follows through on commitments',
          'Strong attention to detail and quality control',
          'Efficient at managing resources and timelines',
          'Skilled at implementing established procedures'
        ],
        improvements: [
          'Be more open to new approaches and innovations',
          'Develop flexibility when plans need to change',
          'Practice expressing appreciation for team members',
          'Consider the human impact of decisions',
          'Work on delegating tasks to others'
        ]
      },
      'ISFJ': {
        title: 'The Supporter',
        description: 'Caring, loyal, and thorough professional who creates harmony in the workplace.',
        strengths: [
          'Exceptional at maintaining team harmony',
          'Strong attention to detail and quality',
          'Reliable and consistent in meeting deadlines',
          'Excellent at supporting team members',
          'Skilled at following through on commitments'
        ],
        improvements: [
          'Learn to say no when workload is too heavy',
          'Develop confidence in sharing own ideas',
          'Practice taking initiative in leadership roles',
          'Work on handling conflict directly',
          'Develop comfort with change and uncertainty'
        ]
      },
      'INFJ': {
        title: 'The Advisor',
        description: 'Insightful, creative, and idealistic professional who brings vision to team dynamics.',
        strengths: [
          'Excellent at understanding team dynamics',
          'Strong strategic thinking and planning',
          'Skilled at motivating and inspiring others',
          'Creative problem-solving abilities',
          'Deep understanding of organizational needs'
        ],
        improvements: [
          'Develop more practical implementation skills',
          'Practice being more direct in communication',
          'Work on handling criticism more objectively',
          'Learn to balance idealism with practicality',
          'Develop comfort with routine tasks'
        ]
      },
      'INTJ': {
        title: 'The Strategist',
        description: 'Strategic, independent, and innovative professional who excels at long-term planning.',
        strengths: [
          'Exceptional strategic thinking',
          'Strong analytical and problem-solving skills',
          'Independent and self-motivated',
          'Excellent at long-term planning',
          'Skilled at implementing efficient systems'
        ],
        improvements: [
          'Develop better team collaboration skills',
          'Practice more patience with others',
          'Work on expressing appreciation',
          'Learn to be more flexible with plans',
          'Develop better communication of complex ideas'
        ]
      },
      'ISTP': {
        title: 'The Troubleshooter',
        description: 'Practical, analytical, and spontaneous professional who excels at solving immediate problems.',
        strengths: [
          'Excellent at solving technical problems',
          'Strong hands-on problem-solving skills',
          'Adaptable to changing situations',
          'Skilled at working under pressure',
          'Good at finding practical solutions'
        ],
        improvements: [
          'Develop better long-term planning skills',
          'Work on following through with commitments',
          'Practice more structured communication',
          'Learn to share knowledge with others',
          'Develop better team collaboration'
        ]
      },
      'ISFP': {
        title: 'The Artist',
        description: 'Artistic, sensitive, and peaceful professional who brings creativity to the workplace.',
        strengths: [
          'Strong creative problem-solving',
          'Excellent at maintaining harmony',
          'Skilled at practical implementation',
          'Good at understanding others\' needs',
          'Adaptable to changing situations'
        ],
        improvements: [
          'Develop better planning and organization',
          'Work on taking initiative in leadership',
          'Practice more structured communication',
          'Learn to handle conflict directly',
          'Develop better time management'
        ]
      },
      'INFP': {
        title: 'The Idealist',
        description: 'Idealistic, creative, and compassionate professional who fosters meaningful work environments.',
        strengths: [
          'Strong creative thinking',
          'Excellent at understanding others',
          'Skilled at maintaining team harmony',
          'Good at finding meaningful solutions',
          'Adaptable to different perspectives'
        ],
        improvements: [
          'Develop better practical implementation',
          'Work on handling criticism objectively',
          'Practice more structured organization',
          'Learn to balance idealism with reality',
          'Develop better time management'
        ]
      },
      'INTP': {
        title: 'The Architect',
        description: 'Logical, innovative, and theoretical professional who excels at analyzing complex problems.',
        strengths: [
          'Exceptional analytical thinking',
          'Strong problem-solving abilities',
          'Skilled at finding innovative solutions',
          'Good at understanding complex systems',
          'Independent and self-motivated'
        ],
        improvements: [
          'Develop better team collaboration',
          'Work on following through with projects',
          'Practice more structured communication',
          'Learn to balance theory with practice',
          'Develop better time management'
        ]
      },
      'ESTP': {
        title: 'The Dynamo',
        description: 'Energetic, practical, and spontaneous professional who thrives in fast-paced environments.',
        strengths: [
          'Excellent at handling crises',
          'Strong practical problem-solving',
          'Skilled at quick decision-making',
          'Good at adapting to change',
          'Energetic and action-oriented'
        ],
        improvements: [
          'Develop better long-term planning',
          'Work on following through with details',
          'Practice more structured organization',
          'Learn to consider long-term consequences',
          'Develop better team collaboration'
        ]
      },
      'ESFP': {
        title: 'The Performer',
        description: 'Spontaneous, enthusiastic, and friendly professional who creates positive work environments.',
        strengths: [
          'Excellent at team motivation',
          'Strong interpersonal skills',
          'Skilled at creating positive atmosphere',
          'Good at practical problem-solving',
          'Adaptable to changing situations'
        ],
        improvements: [
          'Develop better planning skills',
          'Work on following through with details',
          'Practice more structured organization',
          'Learn to handle conflict directly',
          'Develop better time management'
        ]
      },
      'ENFP': {
        title: 'The Innovator',
        description: 'Enthusiastic, creative, and sociable professional who brings energy to projects.',
        strengths: [
          'Excellent at generating new ideas',
          'Strong team motivation skills',
          'Skilled at understanding others',
          'Good at creative problem-solving',
          'Adaptable to changing situations'
        ],
        improvements: [
          'Develop better follow-through',
          'Work on practical implementation',
          'Practice more structured organization',
          'Learn to focus on one project at a time',
          'Develop better time management'
        ]
      },
      'ENTP': {
        title: 'The Visionary',
        description: 'Innovative, curious, and adaptable professional who excels at brainstorming solutions.',
        strengths: [
          'Exceptional at generating ideas',
          'Strong problem-solving abilities',
          'Skilled at seeing possibilities',
          'Good at adapting to change',
          'Excellent at strategic thinking'
        ],
        improvements: [
          'Develop better follow-through',
          'Work on practical implementation',
          'Practice more structured organization',
          'Learn to focus on one project at a time',
          'Develop better team collaboration'
        ]
      },
      'ESTJ': {
        title: 'The Supervisor',
        description: 'Organized, practical, and efficient professional who ensures projects are completed on time.',
        strengths: [
          'Excellent at project management',
          'Strong organizational skills',
          'Skilled at implementing systems',
          'Good at meeting deadlines',
          'Efficient at resource management'
        ],
        improvements: [
          'Develop better flexibility',
          'Work on understanding others\' perspectives',
          'Practice more patience with team members',
          'Learn to be more open to new ideas',
          'Develop better conflict resolution'
        ]
      },
      'ESFJ': {
        title: 'The Facilitator',
        description: 'Caring, social, and traditional professional who creates supportive work environments.',
        strengths: [
          'Excellent at team building',
          'Strong organizational skills',
          'Skilled at maintaining harmony',
          'Good at following procedures',
          'Efficient at managing relationships'
        ],
        improvements: [
          'Develop better conflict handling',
          'Work on saying no when needed',
          'Practice more independent decision-making',
          'Learn to handle change better',
          'Develop better time management'
        ]
      },
      'ENFJ': {
        title: 'The Mentor',
        description: 'Charismatic, idealistic, and organized professional who inspires teams toward goals.',
        strengths: [
          'Excellent at team leadership',
          'Strong communication skills',
          'Skilled at motivating others',
          'Good at strategic planning',
          'Efficient at maintaining harmony'
        ],
        improvements: [
          'Develop better practical implementation',
          'Work on handling criticism',
          'Practice more independent decision-making',
          'Learn to balance others\' needs with own',
          'Develop better conflict resolution'
        ]
      },
      'ENTJ': {
        title: 'The Director',
        description: 'Strategic, confident, and decisive professional who leads teams effectively.',
        strengths: [
          'Excellent at strategic planning',
          'Strong leadership abilities',
          'Skilled at decision-making',
          'Good at implementing systems',
          'Efficient at achieving goals'
        ],
        improvements: [
          'Develop better team collaboration',
          'Work on understanding others\' perspectives',
          'Practice more patience with team members',
          'Learn to be more flexible with plans',
          'Develop better conflict resolution'
        ]
      }
    };

    const info = typeInfo[type] || {
      title: 'Unknown Type',
      description: 'Unable to determine personality type.',
      strengths: [],
      improvements: []
    };

    return (
      <Box>
        <Typography variant="h5" gutterBottom>
          {info.title}
        </Typography>
        <Typography variant="body1" paragraph>
          {info.description}
        </Typography>
        
        <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
          Key Strengths at Work:
        </Typography>
        <ul>
          {info.strengths.map((strength, index) => (
            <li key={index}>
              <Typography variant="body1">
                {strength}
              </Typography>
            </li>
          ))}
        </ul>

        <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
          Opportunities for Growth:
        </Typography>
        <ul>
          {info.improvements.map((improvement, index) => (
            <li key={index}>
              <Typography variant="body1">
                {improvement}
              </Typography>
            </li>
          ))}
        </ul>
      </Box>
    );
  };

  if (loading) {
    return (
      <Container maxWidth="sm" sx={{ mt: 4, textAlign: 'center' }}>
        <Fade in={true}>
          <Box>
            <CircularProgress size={60} />
            <Typography variant="h6" sx={{ mt: 2 }}>
              Calculating your personality type...
            </Typography>
          </Box>
        </Fade>
      </Container>
    );
  }

  if (showResults) {
    const type = calculateType();
    const info = getTypeDescription(type);
    return (
      <Box
        sx={{
          minHeight: '100vh',
          background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.1)} 0%, ${alpha(theme.palette.secondary.main, 0.1)} 100%)`,
          py: 4
        }}
      >
        <Container maxWidth="md">
          <Fade in={true}>
            <Paper 
              elevation={3} 
              sx={{ 
                p: 4, 
                textAlign: 'center',
                background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.05)} 0%, ${alpha(theme.palette.secondary.main, 0.05)} 100%)`,
                borderRadius: 2
              }}
            >
              {info}
              <Box sx={{ mt: 4, display: 'flex', gap: 2, justifyContent: 'center' }}>
                <Button 
                  variant="contained" 
                  onClick={() => {
                    setCurrentQuestion(0);
                    setAnswers({});
                    setShowResults(false);
                  }}
                  sx={{
                    py: 1.5,
                    px: 4,
                    background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${alpha(theme.palette.primary.main, 0.8)} 100%)`,
                    '&:hover': {
                      background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.9)} 0%, ${alpha(theme.palette.primary.main, 0.7)} 100%)`
                    }
                  }}
                >
                  Take Test Again
                </Button>
                <Button 
                  variant="outlined" 
                  onClick={onBack}
                  sx={{ py: 1.5, px: 4 }}
                >
                  Back to Home
                </Button>
              </Box>
            </Paper>
          </Fade>
        </Container>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.1)} 0%, ${alpha(theme.palette.secondary.main, 0.1)} 100%)`,
        py: 4
      }}
    >
      <Container maxWidth="sm">
        <Fade in={true}>
          <Paper 
            elevation={3} 
            sx={{ 
              p: 4,
              background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.05)} 0%, ${alpha(theme.palette.secondary.main, 0.05)} 100%)`,
              borderRadius: 2
            }}
          >
            <Box sx={{ mb: 3 }}>
              <LinearProgress 
                variant="determinate" 
                value={(currentQuestion / questions.length) * 100} 
                sx={{ 
                  height: 8, 
                  borderRadius: 4,
                  mb: 2,
                  backgroundColor: alpha(theme.palette.primary.main, 0.1),
                  '& .MuiLinearProgress-bar': {
                    background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${alpha(theme.palette.primary.main, 0.8)} 100%)`
                  }
                }}
              />
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h6" color="text.secondary">
                  Question {currentQuestion + 1} of {questions.length}
                </Typography>
                <Button 
                  variant="outlined" 
                  onClick={onBack}
                  size="small"
                >
                  Back to Home
                </Button>
              </Box>
            </Box>

            <Typography 
              variant="h5" 
              gutterBottom
              sx={{ 
                fontWeight: 600,
                mb: 3
              }}
            >
              {questions[currentQuestion].question}
            </Typography>

            <FormControl component="fieldset" sx={{ width: '100%' }}>
              <RadioGroup>
                {questions[currentQuestion].options.map((option, index) => (
                  <FormControlLabel
                    key={index}
                    value={option.type}
                    control={
                      <Radio 
                        sx={{
                          '&.Mui-checked': {
                            color: theme.palette.primary.main
                          }
                        }}
                      />
                    }
                    label={
                      <Typography variant="body1">
                        {option.text}
                      </Typography>
                    }
                    onChange={() => handleAnswer(option.type)}
                    checked={answers[currentQuestion] === option.type}
                    sx={{
                      p: 2,
                      m: 1,
                      border: '1px solid',
                      borderColor: answers[currentQuestion] === option.type 
                        ? theme.palette.primary.main 
                        : 'divider',
                      borderRadius: 1,
                      transition: 'all 0.2s',
                      '&:hover': {
                        borderColor: theme.palette.primary.main,
                        backgroundColor: alpha(theme.palette.primary.main, 0.04)
                      }
                    }}
                  />
                ))}
              </RadioGroup>
            </FormControl>

            <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
              <Button
                variant="contained"
                onClick={handleNext}
                disabled={!answers[currentQuestion]}
                sx={{
                  py: 1.5,
                  px: 4,
                  background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${alpha(theme.palette.primary.main, 0.8)} 100%)`,
                  '&:hover': {
                    background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.9)} 0%, ${alpha(theme.palette.primary.main, 0.7)} 100%)`
                  }
                }}
              >
                {currentQuestion === questions.length - 1 ? 'See Results' : 'Next'}
              </Button>
            </Box>
          </Paper>
        </Fade>
      </Container>
    </Box>
  );
}

export default MBTITest; 