import { Subject } from "./types"

export const mockSubject: Subject = {
  id: "physics-2bac",
  name: "Physics",
  level: "2 Bac",
  topics: [
    {
      id: "fluid-mechanics",
      name: "Fluid Mechanics",
      description: "Analyze the behavior of fluids at rest and in motion",
      status: "published",
      subjectId: "physics-2bac",
      order: 0,
      chapters: [
        {
          id: "fluid-statics-1",
          name: "Fluid Statics part 1",
          description: "Introduction to fluid statics",
          status: "published",
          topicId: "fluid-mechanics",
          order: 0,
          videos: [
            {
              id: "video-1",
              name: "Introduction to Fluids",
              duration: 600,
              status: "published",
              url: "#",
              chapterId: "fluid-statics-1",
              order: 0,
            },
            {
              id: "video-2",
              name: "Pressure and Depth",
              duration: 480,
              status: "draft",
              url: "#",
              chapterId: "fluid-statics-1",
              order: 1,
            },
          ],
        },
        {
          id: "fluid-statics-2",
          name: "Fluid Statics part 2",
          description: "Advanced fluid statics",
          status: "draft",
          topicId: "fluid-mechanics",
          order: 1,
          videos: [],
        },
      ],
    },
    {
      id: "quantum-physics",
      name: "Quantum Physics",
      description: "Delve into the principles of quantum mechanics",
      status: "published",
      subjectId: "physics-2bac",
      order: 1,
      chapters: [],
    },
    {
      id: "thermodynamics",
      name: "Thermodynamics",
      description: "Understand the laws of heat, energy, and work",
      status: "draft",
      subjectId: "physics-2bac",
      order: 2,
      chapters: [],
    },
  ],
}