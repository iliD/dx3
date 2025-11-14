'use client';

import { useState, useEffect, memo } from 'react';

const welcomeTranslations = [
  'Welcome',      // English
  'Bienvenue',    // French
  'Willkommen',   // German
  'Benvenuto',    // Italian
  'Bienvenido',   // Spanish
  'Bem-vindo',    // Portuguese
  'Welkom',       // Dutch
  'Välkommen',    // Swedish
  'Velkommen',    // Danish/Norwegian
  'Tervetuloa',   // Finnish
  'Witamy',       // Polish
  'Vítejte',      // Czech
  'Üdvözöljük',   // Hungarian
  'Bine ați venit', // Romanian
  'Добре дошли',  // Bulgarian
  'Dobrodošli',   // Croatian/Serbian
  'Καλώς ήρθατε', // Greek
  'Hoş geldiniz', // Turkish
];

const AnimatedWelcome = memo(function AnimatedWelcome() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % welcomeTranslations.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {welcomeTranslations[currentIndex]} to
    </>
  );
});

export default AnimatedWelcome;
