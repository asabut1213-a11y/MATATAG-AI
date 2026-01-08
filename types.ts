
export type LessonDuration = '45 Minutes' | '1 Hour';
export type InstructionalModel = 'MATATAG Standard' | '5E Model' | '4As Model';
export type QuestionType = 'Multiple Choice' | 'Short Answer' | 'Essay';

export interface AssessmentConfig {
  itemCount: number;
  questionTypes: QuestionType[];
}

export interface LessonPlan {
  gradeLevel: string;
  subject: string;
  quarter: string;
  week: string;
  day: string;
  topic: string;
  duration: LessonDuration;
  instructionalModel: InstructionalModel;
  assessmentConfig: AssessmentConfig;
  curriculumContent: {
    contentStandards: string;
    performanceStandards: string;
    learningCompetencies: string[];
    learningObjectives: string[];
    contentDetails: string;
    integration: string;
  };
  learningResources: {
    references: string[];
    materials: string[];
  };
  procedures: {
    activatingPriorKnowledge?: string;
    establishingPurpose?: {
      lessonPurpose: string;
      vocabulary: string[];
    };
    developingDeepening?: {
      explicitation: string;
      workedExample: string;
      lessonActivity: string;
    };
    makingGeneralization?: {
      takeaways: string;
      reflectionOnLearning: string;
    };
    fiveE?: {
      engage: string;
      explore: string;
      explain: string;
      elaborate: string;
      evaluate: string;
    };
    fourAs?: {
      activity: string;
      analysis: string;
      abstraction: string;
      application: string;
    };
  };
  evaluatingLearning: {
    assessment: string;
    teacherReflection: {
      learnerStats: string;
      strategies: string;
      difficulties: string;
      innovation: string;
    };
  };
  jadeCreativeIdea: string;
}

export type GradeLevel = 
  | 'Kindergarten' 
  | 'Grade 1' | 'Grade 2' | 'Grade 3' 
  | 'Grade 4' | 'Grade 5' | 'Grade 6' 
  | 'Grade 7' | 'Grade 8' | 'Grade 9' | 'Grade 10';

export const SUBJECTS = [
  'English',
  'Mathematics',
  'Science',
  'Filipino',
  'Araling Panlipunan',
  'Edukasyon sa Pagpapakatao (EsP)',
  'MAPEH (Music, Arts, PE, Health)',
  'EPP / TLE',
  'Makabansa',
  'Reading and Literacy'
];

export const QUARTERS = ['1st Quarter', '2nd Quarter', '3rd Quarter', '4th Quarter'];
