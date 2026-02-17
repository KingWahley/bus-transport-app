import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

const SplitText = ({
  text = '',
  className = '',
  delay = 100,
  duration = 1,
  ease = 'easeOut',
  splitType = 'chars',
  from = { opacity: 0, y: 50 },
  to = { opacity: 1, y: 0 },
  threshold = 0.1,
  rootMargin = '-50px',
  textAlign = 'left',
  onLetterAnimationComplete,
  showCallback = false
}) => {
  const [inView, setInView] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(ref.current);
        }
      },
      { threshold, rootMargin }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  const words = text.split(' ');
  const letters = text.split('');

  // Variants for Framer Motion
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: delay / 1000,
      },
    },
  };

  const letterVariants = {
    hidden: from,
    visible: {
      ...to,
      transition: {
        duration,
        ease: ease === 'power3.out' ? [0.215, 0.61, 0.355, 1] : ease, // Approximation of power3.out
      },
    },
  };

  if (splitType === 'words') {
    return (
      <p ref={ref} className={className} style={{ textAlign }}>
        <motion.span
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
          style={{ display: 'inline-block' }}
        >
           {words.map((word, i) => (
             <motion.span key={i} variants={letterVariants} style={{ display: 'inline-block', marginRight: '0.25em' }}>
               {word}
             </motion.span>
           ))}
        </motion.span>
      </p>
    );
  }

  // Default to chars
  return (
    <p ref={ref} className={className} style={{ textAlign }}>
      <motion.span
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={containerVariants}
        style={{ display: 'inline-block' }}
      >
        {letters.map((letter, i) => (
          <motion.span
            key={i}
            variants={letterVariants}
            style={{ display: 'inline-block', whiteSpace: 'pre' }}
            onAnimationComplete={() => {
                if (showCallback && onLetterAnimationComplete && i === letters.length - 1) {
                    onLetterAnimationComplete();
                }
            }}
          >
            {letter}
          </motion.span>
        ))}
      </motion.span>
    </p>
  );
};

export default SplitText;