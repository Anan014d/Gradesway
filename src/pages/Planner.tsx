import { FormData, LessonPlanForm } from "@/components/LessonPlanForm";
import { LessonPlanPreview } from "@/components/LessonPlanPreview";
import { Skeleton } from "@/components/ui/skeleton";
import { chatSession } from "@/utils/AIModel";
import { useEffect, useState } from "react";
import { Switch } from "@/components/ui/switch";

export const Planner = () => {
  // Init with stored generated content in local storage
  const [generatedContent, setGeneratedContent] = useState(() => {
    const savedContent = localStorage.getItem("generatedLessonPlan");
    return savedContent || "";
  });
  const [loading, setLoading] = useState(false);

  const [darkMode, setDarkMode] = useState(() =>
    JSON.parse(localStorage.getItem("darkMode") || "false")
  );

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  useEffect(() => {
    if (generatedContent)
      localStorage.setItem("generatedLessonPlan", generatedContent);
  }, [generatedContent]);

  const generateAILessonPlan = async (formData: FormData) => {
    setLoading(true);

    const prompt = `Generate a detailed and well-structured lesson plan for the topic: ${formData.topic}\n
        (Grade: ${formData.gradeLevel}).
        \n- Ensure the sections include:
        \n  Subject: ${formData.topic}
        \n  Grade Level: ${formData.gradeLevel}
        \n  Main Concept: ${formData.mainConcept}
        \n  Subtopics: ${formData.subtopics}
        \n  Materials Needed: ${formData.materials}
        \n  Learning Objectives: ${formData.objectives}
        \n  Lesson Outline: ${formData.outline}\n- Include:
        \n  1. Detailed Lesson Content
        \n  2. Suggested Classroom Activities
        \n  3. Assessment Questions`;

    try {
      const result = await chatSession.sendMessage(prompt);
      const airesponse = result.response.text();
      console.log(airesponse);
      setGeneratedContent(airesponse);
    } catch (error) {
      console.error("Failed to generate lesson plan", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="shadow-lg p-6 rounded-lg">
      <div className="grid grid-cols-1 gap-8">
        {/* Dark Mode Toggle */}
        <div className="flex justify-end items-center">
          <span
            className={`mr-2 transition-colors ${
              darkMode ? "text-black" : "text-gray-900"
            }`}
          >
            {darkMode ? "Light Mode" : "Dark Mode"}
          </span>
          <Switch
            checked={darkMode}
            onCheckedChange={() => setDarkMode(!darkMode)}
            className={`cursor-pointer transition-all duration-300 rounded-full
              ${
                darkMode
                  ? "bg-white border-2 border-black"
                  : "bg-black border border-black"
              }`}
          />
        </div>

        {/* Lesson Plan Form */}
        <LessonPlanForm
          onSubmitFormData={(formData) => generateAILessonPlan(formData)}
        />

        {/* Loading Skeleton */}
        {loading ? (
          <div className="space-y-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
            <Skeleton className="h-4 w-4/5" />
          </div>
        ) : (
          <LessonPlanPreview generatedContent={generatedContent} />
        )}
      </div>
    </div>
  );
};
