import fs from "fs" 
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.mjs"
import { askAi } from "../services/openRouter.service.js";
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