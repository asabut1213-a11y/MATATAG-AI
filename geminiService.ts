
import { GoogleGenAI, Type } from "@google/genai";
import { LessonPlan, LessonDuration, InstructionalModel, AssessmentConfig } from "../types";

// Initialize the Google GenAI client
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateLessonPlan = async (inputs: {
  gradeLevel: string;
  subject: string;
  topic: string;
  quarter: string;
  week: string;
  day: string;
  duration: LessonDuration;
  instructionalModel: InstructionalModel;
  assessmentConfig: AssessmentConfig;
  additionalContext?: string;
}): Promise<LessonPlan> => {
  // Use gemini-3-pro-preview for complex reasoning and structured content generation
  const model = 'gemini-3-pro-preview';
  
  let procedureInstruction = '';
  
  if (inputs.instructionalModel === '5E Model') {
    procedureInstruction = `For III. TEACHING AND LEARNING PROCEDURE, follow the 5E Instructional Model:
       a. Engage: Activating prior knowledge and capturing interest.
       b. Explore: Hands-on inquiry and investigation.
       c. Explain: Conceptualization and explicitation of the new skill/topic.
       d. Elaborate: Deepening and applying understanding to new contexts.
       e. Evaluate: Assessment of learning within the procedure.`;
  } else if (inputs.instructionalModel === '4As Model') {
    procedureInstruction = `For III. TEACHING AND LEARNING PROCEDURE, follow the 4As Instructional Model:
       a. Activity: Interactive/hands-on activity to start the lesson.
       b. Analysis: Processing and analyzing the activity to draw out observations.
       c. Abstraction: Formulating generalizations, teaching the main concepts.
       d. Application: Providing exercises or real-life situations where learners apply the knowledge.`;
  } else {
    procedureInstruction = `For III. TEACHING AND LEARNING PROCEDURE, strictly follow these MATATAG components:
       A. Activating Prior Knowledge: Describe what learners do and what learners know. This activity must be a Short Review or a Feedback activity.
       B. Establishing Lesson Purpose: Focus on preparing the learners for what is to come and providing learners the necessary language that the teacher will use.
          Include specific content for: a. Lesson Purpose, and b. Unlocking Content Vocabulary.
       C. Developing and Deepening Understanding: Ensure learners develop and deepen understanding of the concept/skill.
          Provide content for: a. Explicitation, b. Worked Example, c. Lesson Activity.
       D. Making Generalization: Provide an opportunity for the learners to discuss the idea they have understood.
          Include content for: a. Learners’ Takeaways, and b. Reflection on Learning.`;
  }

  const assessmentInstruction = `For IV. EVALUATING LEARNING: FORMATIVE ASSESSMENT, generate exactly ${inputs.assessmentConfig.itemCount} items in a highly structured, professional QUIZ format. 
  The quiz must consist of: ${inputs.assessmentConfig.questionTypes.join(', ')}.

  VISUAL FORMATTING RULES:
  1. Start with a clear Title: "QUIZ: ${inputs.topic.toUpperCase()}".
  2. Spacing: Use a double newline between EVERY question block for clear separation.
  3. Multiple Choice: 
     - Question on one line.
     - Each option (a, b, c, d) MUST be on its own line, indented with three spaces.
  4. Short Answer: 
     - Question on one line.
     - Followed by "Answer: ___________________________________".
  5. Essay: 
     - Clear prompt/question.
     - Followed by at least 4 lines of underscores (______________________) to signify writing space.
  6. Answer Key: Include a distinct section at the very end labeled "--- ANSWER KEY ---" with numbered answers corresponding to the questions.
  7. Language: Use academic language appropriate for ${inputs.gradeLevel} and ${inputs.subject}.`;

  const prompt = `
    Generate a professional lesson plan strictly aligned with the DepEd MATATAG Curriculum.
    
    Parameters:
    - Grade Level: ${inputs.gradeLevel}
    - Subject: ${inputs.subject}
    - Topic: ${inputs.topic}
    - Quarter: ${inputs.quarter}
    - Week: ${inputs.week}
    - Day: ${inputs.day}
    - Duration: ${inputs.duration}
    - Instructional Model: ${inputs.instructionalModel}
    ${inputs.additionalContext ? `- Context: ${inputs.additionalContext}` : ''}

    Structure Requirement:
    I. CURRICULUM CONTENT, STANDARDS, AND LESSON COMPETENCIES
    A. Content Standard: key concepts and skills covered in the quarter.
    B. Performance Standards: evidence of performance expected by the end of the quarter.
    C. Learning Competencies and Objectives: unpacked target competencies for the quarter.
    D. Content: enumerate key ideas/skills, topics, and subtopics.
    E. Integration: connect the lesson within and across learning areas.

    II. LEARNING RESOURCES: list teaching and learning resources used.

    III. TEACHING AND LEARNING PROCEDURE
    ${procedureInstruction}

    IV. EVALUATING LEARNING: FORMATIVE ASSESSMENT AND TEACHER'S REFLECTION
    ${assessmentInstruction}
    B. Teacher's Reflection: Provide reflective placeholders for learner stats, strategies, difficulties, and innovation.

    EXTRA FEATURE:
    V. JADE'S CREATIVE SPARK: Provide a unique, high-engagement, and creative integration idea or localized activity designed specifically for this lesson by Jade N. Bucatcat. This should be a 'out-of-the-box' pedagogical strategy.
  `;

  // Call generateContent with both model name and prompt
  const response = await ai.models.generateContent({
    model,
    contents: prompt,
    config: {
      temperature: 0.7,
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          gradeLevel: { type: Type.STRING },
          subject: { type: Type.STRING },
          quarter: { type: Type.STRING },
          week: { type: Type.STRING },
          day: { type: Type.STRING },
          topic: { type: Type.STRING },
          duration: { type: Type.STRING },
          instructionalModel: { type: Type.STRING },
          assessmentConfig: {
            type: Type.OBJECT,
            properties: {
              itemCount: { type: Type.INTEGER },
              questionTypes: { type: Type.ARRAY, items: { type: Type.STRING } }
            }
          },
          curriculumContent: {
            type: Type.OBJECT,
            properties: {
              contentStandards: { type: Type.STRING },
              performanceStandards: { type: Type.STRING },
              learningCompetencies: { type: Type.ARRAY, items: { type: Type.STRING } },
              learningObjectives: { type: Type.ARRAY, items: { type: Type.STRING } },
              contentDetails: { type: Type.STRING },
              integration: { type: Type.STRING },
            },
            required: ["contentStandards", "performanceStandards", "learningCompetencies", "learningObjectives", "contentDetails", "integration"]
          },
          learningResources: {
            type: Type.OBJECT,
            properties: {
              references: { type: Type.ARRAY, items: { type: Type.STRING } },
              materials: { type: Type.ARRAY, items: { type: Type.STRING } },
            },
            required: ["references", "materials"]
          },
          procedures: {
            type: Type.OBJECT,
            properties: {
              activatingPriorKnowledge: { type: Type.STRING },
              establishingPurpose: {
                type: Type.OBJECT,
                properties: {
                  lessonPurpose: { type: Type.STRING },
                  vocabulary: { type: Type.ARRAY, items: { type: Type.STRING } },
                }
              },
              developingDeepening: {
                type: Type.OBJECT,
                properties: {
                  explicitation: { type: Type.STRING },
                  workedExample: { type: Type.STRING },
                  lessonActivity: { type: Type.STRING },
                }
              },
              makingGeneralization: {
                type: Type.OBJECT,
                properties: {
                  takeaways: { type: Type.STRING },
                  reflectionOnLearning: { type: Type.STRING },
                }
              },
              fiveE: {
                type: Type.OBJECT,
                properties: {
                  engage: { type: Type.STRING },
                  explore: { type: Type.STRING },
                  explain: { type: Type.STRING },
                  elaborate: { type: Type.STRING },
                  evaluate: { type: Type.STRING },
                }
              },
              fourAs: {
                type: Type.OBJECT,
                properties: {
                  activity: { type: Type.STRING },
                  analysis: { type: Type.STRING },
                  abstraction: { type: Type.STRING },
                  application: { type: Type.STRING },
                }
              }
            }
          },
          evaluatingLearning: {
            type: Type.OBJECT,
            properties: {
              assessment: { type: Type.STRING },
              teacherReflection: {
                type: Type.OBJECT,
                properties: {
                  learnerStats: { type: Type.STRING },
                  strategies: { type: Type.STRING },
                  difficulties: { type: Type.STRING },
                  innovation: { type: Type.STRING },
                },
                required: ["learnerStats", "strategies", "difficulties", "innovation"]
              }
            },
            required: ["assessment", "teacherReflection"]
          },
          jadeCreativeIdea: { type: Type.STRING }
        },
        required: ["gradeLevel", "subject", "topic", "duration", "instructionalModel", "curriculumContent", "learningResources", "procedures", "evaluatingLearning", "jadeCreativeIdea"]
      }
    }
  });

  // Extract text property directly from GenerateContentResponse
  const text = response.text;
  if (!text) throw new Error("No response from AI");
  return JSON.parse(text) as LessonPlan;
};
