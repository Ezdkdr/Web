export type QuestionType = 'mcq' | 'text' | 'boolean';

export interface Question {
    id: string;
    text: string;
    type: QuestionType;
    options?: string[]; // For MCQ
    correctAnswer: string; // For boolean "True"/"False", for MCQ exact string, for text check keywords logic
    feedback?: string;
}

export interface ContentBlock {
    type: 'paragraph' | 'list' | 'heading' | 'subheading' | 'note' | 'widget';
    content: string | string[]; // string for paragraph/heading/widget-id, string[] for list
}

export interface Section {
    id: string;
    title: string;
    duration: string;
    content: ContentBlock[];
    knowledgeCheck?: Question[];
}

export interface TrainingModule {
    title: string;
    audience: string;
    estimatedDuration: string;
    purpose: string;
    sections: Section[];
}
