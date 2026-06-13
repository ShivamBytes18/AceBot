import React from 'react'
import { useState } from 'react'
import Navbar from '../components/Navbar.jsx'
import { useSelector } from 'react-redux'
import { motion } from "motion/react"
import {
 BsRobot,
 BsMic,
 BsClock,
 BsBarChart,
 BsFileEarmarkText,
} from "react-icons/bs";
import { HiSparkles } from 'react-icons/hi';
import AuthModel from '../components/AuthModel'
import { useNavigate } from 'react-router-dom'

function Home() {
  const {userData} = useSelector((state)=>state.user)
  const [showAuth ,setShowAuth] = useState(false);
  const navigate = useNavigate()
  return (
    <div className='min-h-screen bg-[#f3f3f3] flex flex-col'>
      <Navbar/>
      <div className='flex-1 px-6 py-10'>
      <div className='flex justify-center mb-2'>
        <div className='bg-gray-200 text-gray-600 text-sm px-4 py-2 
        rounded-full flex items-center gap-2'>
           <HiSparkles size={16} className="bg-green-50 text-green-600"/>
           AI Powered Smart Interview PlatForm
        </div>   
      </div>
        <div className='text-center mb-28'>
          <motion.h1
          initial={{opacity:0 , y:30}}
          animate={{opacity:1 , y:0}}
          transition={{duration:0.6}}
           className='text-4xl md:text-6xl font-semibold
          leading-tight max-w-4xl mx-auto '>
            Practice interview With
            <span className='relative inline-block'>
              <span className=' text-green-500
              px-5 py-1  '>
                AI Intelligence
              </span>
            </span>
          </motion.h1>
          <motion.p
          initial={{ opacity:0}}
          animate={{ opacity :1}}
          transition={{duration:0.1}}
           className='text-black mt-4 sm:mt-6 max-w-xs 
           sm:max-w-lg md:max-w-2xl mx-auto text-sm 
           sm:text-base md:text-lg rounded-full bg-gray-200 px-4 py-2 sm:px-6 sm:py-3'>
            Role-based mock interviews with smart follow-ups,
            adaptive difficulty and real-time performance
            evaluation.
          </motion.p>
          <div className='flex flex-wrap justify-center gap-4 mt-6'>
            <motion.button   
            onClick={()=>{
              if(!userData){
                setShowAuth(true)
                return;
              }
              navigate("/interview")
            }}  
              whileHover={{opacity:0.9 , scale:1.03}}
              whileTap={{opacity:1 , scale:0.98}}
              className='bg-black text-white px-10 py-3
              rounded-full hover:opacity-90 transition shadow-md'
              >
              Start Interview
            </motion.button>

             <motion.button   
            onClick={()=>{
              if(!userData){
                setShowAuth(true)
                return;
              }
              navigate("/history")
            }}  
              whileHover={{opacity:0.9 , scale:1.03}}
              whileTap={{opacity:1 , scale:0.98}}
              className='border border-gray-300 px-10 py-3
              rounded-full hover:bg-gray-600 transition'
              >
              Interview History
            </motion.button>

          </div>
        </div>
    
    <div className='flex flex-col md:flex-row justify-center
    items-center gap-10 mb-28'>
      {
        [
          {
            icon:<BsRobot size={24}/>,
            step:"STEP 1",
            title:"Role & Experience Selection",
            desc:"AI adjusts difficulty based on selected job role"
          },
          {
            icon:<BsMic size={24}/>,
            step:"STEP 2",
            title:"Smart Voice Interview",
            desc:"Dynamic Follow-up Questions Based on Your Answers"
          },
          {
            icon:<BsClock size={24}/>,
            step:"STEP 3",
            title:"Timer Based Simulation",
            desc:"Real Time Interview pressure with time tracking"
          }
        ].map((item,index)=>(
           <motion.div key={index}
           initial={{ opacity:0 , y:60 }}
           whileInView={{ opacity:1 , y:0}}
           transition={{ duration:0.6 + index *0.2}}
           whileHover={{ rotate:0 , scale:1.06 }}
           className={`
           relative bg-white rounded-3xl border-2 border-green-100
           hover:border-green-500 p-10 w-80 max-w-[90%] shadow-md
           hover:shadow-2xl
           transition-all duration-300
           ${index === 0 ? "rotate-[-4deg]": ""}
           ${index === 1 ? "rotate-[-3deg] md:-mt-6 shadow-xl": ""}
           ${index === 2 ? "rotate-[-3deg]": ""}
           `}>
            <div className='absolute -top-8 left-1/2 -translate-x-1/2
            bg-white border-green-500 text-green-600
            w-16 h-16 rounded-2xl flex items-center
            justify-center shadow-lg'>
        {item.icon}  </div>   
           </motion.div>  
        ))
      }
    </div>

      </div>
        {showAuth && <AuthModel onClose={()=> setShowAuth(false)}/>}
    
    </div>
  )
}

export default Home