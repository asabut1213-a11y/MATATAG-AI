import { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType, Table, TableRow, TableCell, WidthType, BorderStyle } from "docx";
import { LessonPlan } from "../types";

export const exportToDocx = async (plan: LessonPlan) => {
  const children: any[] = [
    // Header
    new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [
        new TextRun({
          text: `DETAILED LESSON PLAN IN ${plan.subject.toUpperCase()}`,
          bold: true,
          size: 28,
          font: "Aptos"
        }),
      ],
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 400 },
      children: [
        new TextRun({
          text: "Official DepEd MATATAG Curriculum Alignment",
          size: 20,
          font: "Aptos"
        }),
      ],
    }),

    // Basic Info Table
    new Table({
      width: { size: 100, type: WidthType.PERCENTAGE },
      rows: [
        new TableRow({
          children: [
            new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "Grade Level:", bold: true, font: "Aptos" }), new TextRun({ text: ` ${plan.gradeLevel}`, font: "Aptos" })] })] }),
            new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "Quarter:", bold: true, font: "Aptos" }), new TextRun({ text: ` ${plan.quarter}`, font: "Aptos" })] })] }),
            new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "Week:", bold: true, font: "Aptos" }), new TextRun({ text: ` ${plan.week}`, font: "Aptos" })] })] }),
            new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "Day:", bold: true, font: "Aptos" }), new TextRun({ text: ` ${plan.day}`, font: "Aptos" })] })] }),
          ],
        }),
        new TableRow({
          children: [
            new TableCell({ 
              columnSpan: 2,
              children: [new Paragraph({ children: [new TextRun({ text: "Lesson Duration:", bold: true, font: "Aptos" }), new TextRun({ text: ` ${plan.duration}`, font: "Aptos" })] })] 
            }),
            new TableCell({ 
              columnSpan: 2,
              children: [new Paragraph({ children: [new TextRun({ text: "Instructional Model:", bold: true, font: "Aptos" }), new TextRun({ text: ` ${plan.instructionalModel}`, font: "Aptos" })] })] 
            }),
          ],
        }),
      ],
    }),

    new Paragraph({ spacing: { before: 400 } }),

    // Section I
    new Paragraph({
      heading: HeadingLevel.HEADING_3,
      shading: { fill: "000000" },
      children: [new TextRun({ text: "I. CURRICULUM CONTENT, STANDARDS, AND LESSON COMPETENCIES", bold: true, color: "FFFFFF", font: "Aptos" })],
    }),
    new Paragraph({ spacing: { before: 200 }, children: [new TextRun({ text: "A. Content Standard:", bold: true, font: "Aptos" })] }),
    new Paragraph({ children: [new TextRun({ text: plan.curriculumContent.contentStandards, italics: true, font: "Aptos" })] }),
    
    new Paragraph({ spacing: { before: 200 }, children: [new TextRun({ text: "B. Performance Standards:", bold: true, font: "Aptos" })] }),
    new Paragraph({ children: [new TextRun({ text: plan.curriculumContent.performanceStandards, italics: true, font: "Aptos" })] }),
    
    new Paragraph({ spacing: { before: 200 }, children: [new TextRun({ text: "C. Learning Competencies and Objectives:", bold: true, font: "Aptos" })] }),
    ...plan.curriculumContent.learningCompetencies.map(c => new Paragraph({ children: [new TextRun({ text: `• ${c}`, font: "Aptos" })] })),
    ...plan.curriculumContent.learningObjectives.map(o => new Paragraph({ children: [new TextRun({ text: `→ ${o}`, font: "Aptos" })] })),

    new Paragraph({ spacing: { before: 200 }, children: [new TextRun({ text: "D. Content:", bold: true, font: "Aptos" })] }),
    new Paragraph({ children: [new TextRun({ text: plan.curriculumContent.contentDetails, font: "Aptos" })] }),

    new Paragraph({ spacing: { before: 200 }, children: [new TextRun({ text: "E. Integration:", bold: true, font: "Aptos" })] }),
    new Paragraph({ children: [new TextRun({ text: plan.curriculumContent.integration, italics: true, font: "Aptos" })] }),

    // Section II
    new Paragraph({ spacing: { before: 400 } }),
    new Paragraph({
      heading: HeadingLevel.HEADING_3,
      shading: { fill: "000000" },
      children: [new TextRun({ text: "II. LEARNING RESOURCES", bold: true, color: "FFFFFF", font: "Aptos" })],
    }),
    new Paragraph({ spacing: { before: 100 }, children: [new TextRun({ text: "References:", bold: true, font: "Aptos" })] }),
    ...plan.learningResources.references.map((r, i) => new Paragraph({ children: [new TextRun({ text: `${i + 1}. ${r}`, font: "Aptos" })] })),
    new Paragraph({ spacing: { before: 100 }, children: [new TextRun({ text: "Materials:", bold: true, font: "Aptos" })] }),
    ...plan.learningResources.materials.map(m => new Paragraph({ children: [new TextRun({ text: `• ${m}`, font: "Aptos" })] })),

    // Section III
    new Paragraph({ spacing: { before: 400 } }),
    new Paragraph({
      heading: HeadingLevel.HEADING_3,
      shading: { fill: "000000" },
      children: [new TextRun({ text: "III. TEACHING AND LEARNING PROCEDURE", bold: true, color: "FFFFFF", font: "Aptos" })],
    }),
  ];

  if (plan.instructionalModel === 'MATATAG Standard') {
    children.push(
      new Paragraph({ spacing: { before: 200 }, children: [new TextRun({ text: "A. Activating Prior Knowledge", bold: true, font: "Aptos" })] }),
      new Paragraph({ children: [new TextRun({ text: plan.procedures.activatingPriorKnowledge || '', font: "Aptos" })] }),

      new Paragraph({ spacing: { before: 200 }, children: [new TextRun({ text: "B. Establishing Lesson Purpose", bold: true, font: "Aptos" })] }),
      new Paragraph({ children: [new TextRun({ text: "a. Lesson Purpose:", bold: true, size: 20, font: "Aptos" }), new TextRun({ text: ` ${plan.procedures.establishingPurpose?.lessonPurpose}`, font: "Aptos" })] }),
      new Paragraph({ children: [new TextRun({ text: "b. Unlocking Content Vocabulary:", bold: true, size: 20, font: "Aptos" }), new TextRun({ text: ` ${plan.procedures.establishingPurpose?.vocabulary.join(', ')}`, font: "Aptos" })] }),

      new Paragraph({ spacing: { before: 200 }, children: [new TextRun({ text: "C. Developing and Deepening Understanding", bold: true, font: "Aptos" })] }),
      new Paragraph({ children: [new TextRun({ text: "a. Explicitation:", bold: true, font: "Aptos" }), new TextRun({ text: ` ${plan.procedures.developingDeepening?.explicitation}`, font: "Aptos" })] }),
      new Paragraph({ children: [new TextRun({ text: "b. Worked Example:", bold: true, font: "Aptos" }), new TextRun({ text: ` ${plan.procedures.developingDeepening?.workedExample}`, font: "Aptos" })] }),
      new Paragraph({ children: [new TextRun({ text: "c. Lesson Activity:", bold: true, font: "Aptos" }), new TextRun({ text: ` ${plan.procedures.developingDeepening?.lessonActivity}`, font: "Aptos" })] }),

      new Paragraph({ spacing: { before: 200 }, children: [new TextRun({ text: "D. Making Generalization", bold: true, font: "Aptos" })] }),
      new Paragraph({ children: [new TextRun({ text: "a. Learners' Takeaways:", bold: true, font: "Aptos" }), new TextRun({ text: ` ${plan.procedures.makingGeneralization?.takeaways}`, font: "Aptos" })] }),
      new Paragraph({ children: [new TextRun({ text: "b. Reflection on Learning:", bold: true, font: "Aptos" }), new TextRun({ text: ` ${plan.procedures.makingGeneralization?.reflectionOnLearning}`, font: "Aptos" })] })
    );
  } else if (plan.instructionalModel === '5E Model') {
    ['Engage', 'Explore', 'Explain', 'Elaborate', 'Evaluate'].forEach(step => {
      children.push(
        new Paragraph({ spacing: { before: 200 }, children: [new TextRun({ text: `${step}:`, bold: true, font: "Aptos" })] }),
        new Paragraph({ children: [new TextRun({ text: (plan.procedures.fiveE as any)?.[step.toLowerCase()] || '', font: "Aptos" })] })
      );
    });
  } else if (plan.instructionalModel === '4As Model') {
    ['Activity', 'Analysis', 'Abstraction', 'Application'].forEach(step => {
      children.push(
        new Paragraph({ spacing: { before: 200 }, children: [new TextRun({ text: `${step}:`, bold: true, font: "Aptos" })] }),
        new Paragraph({ children: [new TextRun({ text: (plan.procedures.fourAs as any)?.[step.toLowerCase()] || '', font: "Aptos" })] })
      );
    });
  }

  // Use a final children.push for shared trailing sections, ensuring correct parenthesis closure
  children.push(
    new Paragraph({ spacing: { before: 400 } }),
    new Paragraph({
      heading: HeadingLevel.HEADING_3,
      shading: { fill: "000000" },
      children: [new TextRun({ text: "IV. EVALUATING LEARNING: FORMATIVE ASSESSMENT AND TEACHER'S REFLECTION", bold: true, color: "FFFFFF", font: "Aptos" })],
    }),
    new Paragraph({ spacing: { before: 200 }, children: [new TextRun({ text: `A. Evaluating Learning (${plan.assessmentConfig.itemCount} Items):`, bold: true, font: "Aptos" })] }),
    new Paragraph({ children: [new TextRun({ text: plan.evaluatingLearning.assessment, font: "Aptos" })] }),

    new Paragraph({ spacing: { before: 200 }, children: [new TextRun({ text: "B. Teacher's Reflection:", bold: true, font: "Aptos" })] }),
    ...Object.entries(plan.evaluatingLearning.teacherReflection).map(([key, val]) => (
      new Paragraph({ children: [new TextRun({ text: `${key.replace(/([A-Z])/g, ' $1')}:`, bold: true, font: "Aptos" }), new TextRun({ text: ` ${val}`, font: "Aptos" })] })
    )),

    new Paragraph({ spacing: { before: 400 } }),
    new Paragraph({
      heading: HeadingLevel.HEADING_3,
      shading: { fill: "1e3a8a" },
      children: [new TextRun({ text: "V. JADE'S CREATIVE SPARK", bold: true, color: "FFFFFF", font: "Aptos" })],
    }),
    new Paragraph({ spacing: { before: 200 }, children: [new TextRun({ text: "Integration Idea by Jade N. Bucatcat:", bold: true, font: "Aptos" })] }),
    new Paragraph({ children: [new TextRun({ text: plan.jadeCreativeIdea, italics: true, font: "Aptos" })] }),

    new Paragraph({ spacing: { before: 800 } }),
    new Table({
      width: { size: 100, type: WidthType.PERCENTAGE },
      borders: {
         top: { style: BorderStyle.NONE }, bottom: { style: BorderStyle.NONE },
         left: { style: BorderStyle.NONE }, right: { style: BorderStyle.NONE },
         insideHorizontal: { style: BorderStyle.NONE }, insideVertical: { style: BorderStyle.NONE },
      },
      rows: [
        new TableRow({
          children: [
            new TableCell({ children: [new Paragraph({ alignment: AlignmentType.CENTER, border: { top: { style: BorderStyle.SINGLE, size: 1 } }, children: [new TextRun({ text: "Prepared by:", bold: true, font: "Aptos" }), new TextRun({ text: "\nTeacher", font: "Aptos", size: 16 })] })] }),
            new TableCell({ children: [new Paragraph({ alignment: AlignmentType.CENTER, border: { top: { style: BorderStyle.SINGLE, size: 1 } }, children: [new TextRun({ text: "Checked by:", bold: true, font: "Aptos" }), new TextRun({ text: "\nMaster Teacher / Dept. Head", font: "Aptos", size: 16 })] })] }),
            new TableCell({ children: [new Paragraph({ alignment: AlignmentType.CENTER, border: { top: { style: BorderStyle.SINGLE, size: 1 } }, children: [new TextRun({ text: "Approved by:", bold: true, font: "Aptos" }), new TextRun({ text: "\nPrincipal", font: "Aptos", size: 16 })] })] }),
          ],
        }),
      ],
    }),

    new Paragraph({ spacing: { before: 600 } }),
    new Paragraph({
      alignment: AlignmentType.LEFT,
      children: [
        new TextRun({
          text: "DISCLAIMER: This lesson plan is generated by AI (MATATAG AI Intelligence) and is intended for professional review. It must be checked and validated by the educator for curriculum alignment and accuracy before implementation.",
          italics: true,
          size: 16,
          font: "Aptos",
          color: "666666"
        }),
      ],
    })
  );

  const doc = new Document({
    sections: [{
      properties: {},
      children: children,
    }],
  });

  const blob = await Packer.toBlob(doc);
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${plan.topic.replace(/\s+/g, '_')}_MATATAG_Lesson_Plan.docx`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};