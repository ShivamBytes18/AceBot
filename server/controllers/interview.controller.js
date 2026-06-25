import fs from "fs" 
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.mjs"
import { askAi } from "../services/openRouter.service.js";
import User from "../models/user.model.js"
import Interview  from "../models/interview.model.js"
import userId from "../models/interview.model.js"

export const analyzeResume = async (req, res) => {
    try {
        if(!req.file){
            return res.status(400).json({message:"Resume requried"});
        }
        const filepath = req.file.path

        const fileBuffer = await fs.promises.readFile(filepath)
        const uint8Array = new Uint8Array(fileBuffer)
        const pdf = await pdfjsLib.getDocument({data:uint8Array}).promise;
         let resumeText = " " ;
         for(let pageNum = 1; pageNum <=pdf.numPages;pageNum++) {
            const page = await pdf.getPage(pageNum)
            const content = await page.getTextContent();

            const pageText = content.items.map(item =>item.str).join(" ");
            resumeText += pageText + "\n" ;
         }

         resumeText = resumeText.replace(/\s+/g, " ").trim();
         
         const message = [
            {
                role : "system" ,
                // content : `
                // Extract structured data from resume.
                
                // Return strictly JSON:
                
                // {
                //   "role" : "string",
                //   "experience" : "string",
                //   "projects" : ["project1","project2"],
                //   "skills" :["skill1" , "skill2"]               
                //    }
                //   `
                content: `
                 Extract structured data from the resume.

                 Return ONLY valid JSON.

                 Do not use markdown.
                 Do not use \`\`\`json.
                 Do not add explanations.

                 {
                   "role": "string",
                   "experience": "string",
                   "projects": ["project1", "project2"],
                   "skills": ["skill1", "skill2"]
                 }
                 `
            },
            {
               role : "user",
               content:resumeText 
            }
         ];
       
        //  const aiResponse = await askAi(message);
        //  const parsed = JSON.parse(aiResponse);
                 const aiResponse = await askAi(message);

                 //console.log("AI RESPONSE:", aiResponse);

                 const jsonMatch = aiResponse.match(/\{[\s\S]*\}/);

                 if (!jsonMatch) {
                   throw new Error("No valid JSON found in AI response");
                 }
                 
                 const parsed = JSON.parse(jsonMatch[0]); 
        
        fs.unlinkSync(filepath)

        console.log("AI RESPONSE:");
console.log(aiResponse);

         res.json({
            role:parsed.role,
            experience : parsed.experience,
            projects: parsed.projects,
            skills:parsed.skills,
            resumeText
         });
    } catch (error) {
        console.log(error);
        if(req.file  && fs.existsSync(req.file.path)) {
            fs.unlinkSync(req.file.path);
        }

       return res.status(500).json({ message: error.message})
    }

};

export const generateQuestions = async (req , res) => {
    try {
        let {role , experience , mode , resumeText , projects , skills} = req.body
        role = role?.trim();
        experience = experience?.trim();
        mode=mode?.trim();
        
        if(!role || !experience || !mode) {
            return res.status(400).json({message : "Role , Experience and Mode are required."})
        }
        const user = await User.findById(req.userId)
        if(!user) {
            return res.status(404).json({
                message:"User not Found"
            });
        }
        if(user.credits < -50000) {
          return res.status(400).json({
                message:"Not Enough Credits Minimum 50 required"
            });
        }
        const projectText=Array.isArray(projects) && projects.length?
        projects.join(",") : "None";

        const skillsText=Array.isArray( skills) &&  skills.length?
         skills.join(",") : "None";

        const safeResume = resumeText?.trim() || "None" ;

        const userPrompt = `
        Role : ${role},
        Experience:${experience},
        InterviewMode: ${mode},
        Projects :${projectText},
        skills:${skillsText},
        Resume:${safeResume}
        ` ;

        if(!userPrompt){
            return res.status(400).json({
                message:"Prompt Content is Empty"
            });
        }

        const messages = [
            {
                role : "system",
                content:`
                You are a real human interview conducting a professional interview.
                
                Speak in simple , natural English as if you are directly talking to the
                candidate.

                Generate exactlly 5 interview questions.

                Strict Rules:
                - Each question must contain between 15 and 30 words.
                - Each question must be a single complete sentence.
                - Do Not number them.
                - Do Not add explanations.
                - Do Not add extra text before or after.
                - One question per line only.
                - Keep language simple and conversational.
                - Questions must feel practical and realistic.

                Difficulty progression:
                Question 1 -> easy
                Question 2 -> medium
                Question 3 -> medium
                Question 4 -> medium
                Question 5 -> hard

                Analyze the candidate's resume and identify the primary domain.

Possible domains:
- Software Development
- Data Analytics
- Data Science
- Machine Learning
- Cyber Security
- Cloud & DevOps
- Product Management
- UI/UX Design
- Other

Question Distribution:

Question 1:
Ask about the candidate's experience, internship, or background.

Question 2:
Ask about one most described or technically perfect project mentioned in the resume.

Question 3:
Must test a core concept from one of the candidate's strongest technical skills.

Examples:

Frontend:
- React → Hooks, Virtual DOM, State Management, Reconciliation
- Next.js → SSR, SSG, ISR, Routing, API Routes
- Angular → Dependency Injection, RxJS
- Vue → Reactivity System

Backend:
- Node.js → Event Loop, Streams, Async Programming
- Express.js → Middleware, Authentication, Routing,JSON,Tokens
- Django → ORM, Middleware
- Spring Boot → Dependency Injection, REST APIs

Databases:
- MongoDB → Aggregation, Indexing, Replication
- PostgreSQL → Joins, Indexes, Transactions, ACID Properties
- MySQL → Normalization, Query Optimization
- Redis → Caching, Pub/Sub

Programming Languages:
- JavaScript → Closures, Hoisting, Promises
- Python → OOP, Generators, Decorators
- Java → Collections, Multithreading, JVM
- C++ → Pointers, STL, Memory Management
- C → Pointers, Dynamic Memory Allocation

Cloud & DevOps:
- Docker → Containers, Images, Volumes
- Kubernetes → Pods, Deployments, Services
- AWS → EC2, S3, VPC, IAM
- Terraform → Infrastructure as Code
- Jenkins → CI/CD Pipelines

Data Analytics:
- SQL → Joins, Window Functions, Indexing, Normalization
- Excel → Pivot Tables, VLOOKUP/XLOOKUP, Data Cleaning
- Power BI → DAX, Data Modeling, Relationships
- Tableau → Dashboards, Visualizations, Calculated Fields
- Pandas → DataFrames, GroupBy, Merge, Missing Values
- NumPy → Arrays, Vectorization, Broadcasting

Machine Learning:
- Scikit-Learn → Classification, Regression, Pipelines
- Machine Learning → Overfitting, Underfitting, Bias-Variance Tradeoff
- Feature Engineering → Encoding, Scaling, Feature Selection
- Model Evaluation → Precision, Recall, F1 Score, ROC-AUC
- Deep Learning → CNNs, RNNs, Transformers
- NLP → Tokenization, Embeddings, Attention Mechanism
- LLMs → RAG, Fine-Tuning, Prompt Engineering, Vector Databases
- TensorFlow → Computational Graphs, Tensors
- PyTorch → Autograd, Tensors, Training Loops

AI & Generative AI:
- Prompt Engineering → Few-shot Prompting, Chain of Thought, System Prompts
- LLMs → Context Window, Tokens, Temperature, Hallucinations
- RAG → Retrieval, Embeddings, Vector Databases, Chunking
- LangChain → Chains, Agents, Memory
- LangGraph → State Management, Multi-Agent Workflows
- OpenAI API → Function Calling, Structured Outputs
- Vector Databases → Pinecone, ChromaDB, FAISS
- Embeddings → Semantic Search, Similarity Search
- Fine-Tuning → Dataset Preparation, Model Adaptation
- Transformers → Attention Mechanism, Encoder/Decoder
- NLP → Tokenization, Named Entity Recognition, Sentiment Analysis
- AI Evaluation → Accuracy, Relevance, Hallucination Detection
- Multi-Agent Systems → Agent Communication, Task Delegation

Cyber Security:
- Network Security → Firewalls, IDS/IPS
- Ethical Hacking → Reconnaissance, Vulnerability Assessment
- Web Security → XSS, CSRF, SQL Injection

The question should test understanding of an actual concept, not just project experience.

Question 4:
Ask an implementation or debugging question related to a project or technology used.

Question 5:
Ask an advanced real-world scenario or system design question.

Generate questions based on the identified domain,interviewMode,
projects, skills, tools, and experience.

Questions should focus on technologies actually present
in the resume.
   `
            },
            {
                role : "user",
                content:userPrompt
            }
        ];

      const aiResponse = await askAi(messages)

      if(!aiResponse || !aiResponse.trim()) {
        return res.status(500).json({
            message:"AI returned empty response."
        });
      }

      const questionsArray = aiResponse
      .split("\n")
      .map(q => q.trim())
      .filter(q => q.length > 0)
      .slice(0,5);

      if (questionsArray.length === 0) {
        return res.status(500).json({
            message:"AI failed to generate questions."
        });
      }

      user.credits -= 50;
      await user.save()

      const interview = await Interview .create({
        userId : user._id,
        role,
        experience,
        mode,
        resumeText : safeResume,
        questions : questionsArray.map((q,index) => ({
           question : q,
           difficulty : ["easy","medium","medium","medium","hard"][index],
           timeLimit:[60,60,90,90,120][index]
        }))
      })


      res.json({
        interviewId : interview._id,
        creditsLeft : user.credits,
        userName : user.name,
        questions: interview.questions
      });
    } catch (error) {
        return res.status(500).json({
             message : `failed to create interview  ${error}` 
        })
    }
}


export const submitAnswer = async (req , res) => {
    try {
        const {interviewId , questionIndex , answer , timetaken } = req.body
        const interview = await Interview.findById(interviewId)
        const question = interview.questions[questionIndex]

        if(!answer)
        {
            question.score = 0;
            question.feedback = "You did not submit an answer.";
            question.answer = "";

            await interview.save();
            
            return res.json({
                feedback : question.feedback
            });
        }

        if(timetaken > question.timeLimit) {
            question.score = 0;
            question.feedback = "Time limit exceeded . Answer not evaluated."
            question.answer = answer;

            await interview.save();

            return res.json({
                feedback : question.feedback
            })
        }

        const messages = [
            {
                role : "system",
                content:`
                
you are a professional human interviewer evaluating a candidate's
answer in a real interview.

Evaluate naturally and fairly , like a real person would.
  
Score the answer in these areas(0 to 10) :
            

1. Confidence – Does the answer sound clear, confident, and well-presented?
2. Communication – Is the language simple, clear, and easy to understand?
3. Correctness – Is the answer accurate, relevant, and complete?

Rules:
- Be realistic and unbiased.
- Do not give random high scores.
- If the answer is weak, score low.
- If the answer is strong and detailed, score high.
- Consider clarity, structure, and relevance.

Calculate:
finalScore = average of confidence, communication, and correctness (rounded to nearest whole number).

Feedback Rules:
- Write natural human feedback.
- 10 to 15 words only.
- Sound like real interview feedback.
- Can suggest improvement if needed.
- Do NOT repeat the question.
- Do NOT explain scoring.
- Keep tone professional and honest.

Return ONLY valid JSON in this format:

{
  "confidence": number,
  "communication": number,
  "correctness": number,
  "finalScore": number,
  "feedback": "short human feedback"
}
`
      }
      ,
      {
        role: "user",
        content: `
Question: ${question.question}
Answer: ${answer}
`
      }
    ];



    const aiResponse = await askAi(messages)
     const parsed = JSON.parse(aiResponse)

     question.answer = answer;
     question.confidence = parsed.confidence;
     question.communication = parsed.communication;
     question.correctness = parsed.correctness;
     question.score = parsed.finalScore;
     question.feedback = parsed.feedback;

     await interview.save();

     return res.status(200).json({ feedback : parsed.feedback })
    } catch (error) {
        
        return res.status(500).json({
           message : `failed to submit answer  ${error}` 
        })
    }
}

export const finishInterview = async (req ,  res) => {
    try {
        const {interviewId} = req.body
        const interview = await Interview.findById(interviewId)
        if(!interview) {
            return res.status(400).json({
                message :"failed to finish Interview"
            })
        }
     const totalQuestions = interview.questions.length;

     let totalScore = 0;
     let totalConfidence = 0;
     let totalCommunication = 0;
     let totalCorrectness = 0;

     interview.questions.forEach((q) => {
      totalScore += q.score || 0;
      totalConfidence += q.confidence || 0;
      totalCommunication += q.communication || 0;
      totalCorrectness += q.correctness || 0      
     });
      const finalScore = totalQuestions ? totalScore/totalQuestions : 0;
      const avgConfidence = totalQuestions ? totalConfidence/totalQuestions : 0;
      const avgCommunication = totalQuestions ? totalCommunication/totalQuestions : 0;
      const avgCorrectness = totalQuestions ? totalCorrectness/totalQuestions : 0;

      interview.finalScore = finalScore;
      interview.status = "completed"
      
      await interview.save();
      return res.status(200).json({
        finalScore : Number(finalScore.toFixed(1)),
        confidence : Number(avgConfidence.toFixed(1)),
        communication : Number(avgCommunication.toFixed(1)),
        correctness : Number(avgCorrectness.toFixed(1)),
        questionWiseScore : interview.questions.map((q)=>({
            question : q.question,
            score : q.score || 0,
            feedback : q.feedback || 0,
            confidence : q.confidence || 0 ,
            communication : q.communication || 0 ,
            correctness : q.correctness || 0
        }))
      })

    } catch (error) {
        return res.status(500).json({
            message : `failed to finish interview ${error}`
        })
    }
}

export const getMyInterview = async (req , res) => {
    try {
        const interview = await Interview.find({userId : req.userId})
        .sort({ createdAt : -1})
        .select("role experience mode finalScore status createdAt")
         return res.status(200).json(interview)     
    } catch (error) {
     return res.status(500).json({message : `Failed to find currentUser
        Interview ${error}`})   
    }
}

export const getInterviewReport = async (req,res) => {
    try {
        const interview = await Interview.findById(req.params.id)

        if(!interview) {
            return res.status(404).json({ message : "Interview not found"})
        }
        
        const totalQuestions = interview.questions.length;

     
     let totalConfidence = 0;
     let totalCommunication = 0;
     let totalCorrectness = 0;

     interview.questions.forEach((q) => {
      
      totalConfidence += q.confidence || 0;
      totalCommunication += q.communication || 0;
      totalCorrectness += q.correctness || 0      
     });

      const avgConfidence = totalQuestions ? totalConfidence/totalQuestions : 0;
      const avgCommunication = totalQuestions ? totalCommunication/totalQuestions : 0;
      const avgCorrectness = totalQuestions ? totalCorrectness/totalQuestions : 0;


      return res.status(200).json({
        //finalScore : finalScore.toFixed(1),
        finalScore: Number(interview.finalScore.toFixed(1)),
        confidence : Number(avgConfidence.toFixed(1)),
        communication : Number(avgCommunication.toFixed(1)),
        correctness : Number(avgCorrectness.toFixed(1)),
        questionWiseScore : interview.questions

      })
    } catch (error) {
        return res.status(500).json({
            message : `Failed to Find currentUser Interview ${error}`
        })
    }
    
}