import { Routes, Route } from 'react-router-dom';
import { LandingScreen, HomeScreen, QuestionnaireScreen } from '../screens';

interface RouterProps {}

export const Router: React.FC<RouterProps> = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingScreen />} />
      <Route path="/home" element={<HomeScreen />} />
      <Route path="/questionnaire" element={<QuestionnaireScreen />} />
    </Routes>
  );
};
