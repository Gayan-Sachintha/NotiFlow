import React from 'react';
import MonkBoxItemProfile from '../../../components/AdminBoxItemProfile2/AdminBoxItemProfile2';
import './MonkFeactures.css';
import { motion } from 'framer-motion';

export default function MonkFeatures() {
   const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <motion.div
      className='container-fluid text-center monkFeatures-background'
      initial="hidden"
      animate="visible"
      variants={{
        visible: {
          transition: {
            staggerChildren: 0.1,
          },
        },
      }}
    >
      <div className='row'>
        <div className='col-12 mt-4'>
          <div className='row'>
            {["Dayaka Sabawa", "Donor Chat", "Change Donor Date", "Donor's Requests"].map((title, index) => (
              <div className='col-12 col-md-4' key={title}>
                <motion.div variants={itemVariants}>
                  <MonkBoxItemProfile title={title} />
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
